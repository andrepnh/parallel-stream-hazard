Parallel streams have a huge potential to ruin performance of web applications, but over the years I noticed them creeping up in codebases for no good reason. I guess the problem is the matter didn't get as much attention as it should, that people are fascinated by concurrency and performance and that calling `.parallel()` is just way too easy. So I set this up hoping that it helps spreading the word about the hazards of parallel streams.

## Contents

1. [Summary](#summary)
1. [Benchmarks](#benchmarks)
    1. [Quick operation running in parallel](#quick-operation-running-in-parallel)
    1. [Slow operation running sequentially vs parallel](#slow-operation-running-sequentially-vs-parallel)
    1. [Mixed operations running sequentially vs parallel](#mixed-operations-running-sequentially-vs-parallel)
1. [Mitigations and alternatives](#mitigations-and-alternatives)
1. [Running Locally](#running-locally)

## Summary

The problem is all parallel streams are backed by a single small thread pool [(n_cores - 1)](https://hg.openjdk.java.net/jdk-updates/jdk11u/file/80d25f7feef9/src/java.base/share/classes/java/util/concurrent/ForkJoinPool.java#l2359), while web applications are backed by pools that can be as large as n_cores * 8, IIRC (and depending on the web server used). Calling `Stream.parallel()` in web applications can introduce bottlenecks if: a) we do it too often and, b), we perform slow computation or blocking IO inside the stream.

The second case is specially worse because one bad apple will spoil the bunch. Once you have a few slow tasks consuming threads they'll harm all others, no matter how fast they're.

If you're not convinced here's one of the benchmarks you'll find in this repo:

| Scenario | Response time (ms), 95th percentile | Response time (ms), 99th percentile |
| - | - | - |
| Slow operation, sequential | 313 | 315 |
| Slow operation, parallel | 9587 | 18988 |

But then one could say it might be ok for some application, because they're not doing CPU/IO intensive work inside the stream. Ok, but how do we ensure that remains true in the future? Over the years applications change, workloads change, people working on the code change. What's fast today may not be tomorrow and in a distributed-systems world some downstream code could easily introduce an IO call.

Making sure we're not using `Stream.parallel()` is quite simple, just a quick search on the code base and you can check if you're parallel-free. You can even setup a static code analysis rule to automate that! On the other hand, the maintenance overhead associated with proper usage just doesn't pay off in my opinion, specially since there's plenty alternatives out there to parallelize work in web applications.

If you want to know more about the benchmarks just scroll down. For mitigations and alternatives [click here](#mitigations-and-alternatives), and to run the benchmarks on your own you can go to the [Running Locally](#running-locally) section.
 
## Benchmarks

All tests are performed against a single Spring Boot app with default configurations. This application has a single endpoint:
 
  GET http<span></span>://localhost:8080/?parallel=[true|false]&targetMillis=[some integer]
 
`parallel` controls whether parallel streams will be used or not and defaults to false. `targetMillis` is used to determine how much data the application is going to process using streams. It's specified as time because if you use sequential streams `targetMillis` should be close to the actual time taken to process the data.

The load tests simulate two operations: a somewhat quick operation (`targetMillis=50`) and a slower operation (`targetMillis=200`, the default value). Each operation is performed using sequential or parallel streams according to the scenario we simulate. All scenarios exercise the same load: we increase the number of API users by one every second until we reach the max (n_cores * 8). Each simulation will run for roughly 1 minute.

#### Quick operation running in parallel

The first scenario is here to show that, when running isolated, parallel stream does give better performance (at least for the kind of work we're doing). As mentioned before the sequential version should take 50+ milliseconds, but the parallel version is slightly better on my machine.

| Scenario | Min | 50th pct | 75th pct | 95th pct | 99th pct |
| - | - | - | - | - | - |
| Quick operation (isolated; parallel) | 18 | 18 | 31 | 31 | 32 | 34 | 483 |

And herein lies the danger, there's an apparent performance improvement that we probably wouldn't see in a real application. But before we go into a scenario closer to what could happen there, let's first compare what happens when we use `Stream.parallel()` on a slow operation.

#### Slow operation running sequentially vs parallel

The table below shows the results of running a slow operation using sequential streams vs. parallel ones:

| Scenario | Min | 50th pct | 75th pct | 95th pct | 99th pct |
| - | - | - | - | - | - |
| Slow operation (sequential) | 303 | 312 | 312 | 313 | 315 |
| Slow operation (parallel) | 72 | 453 | 3757 | 9587 | 18988 |

Even if we set aside the absurd tail latency, just the median for the parallel version was 100ms slower on my machine! The table shows another danger, if we tested this by firing just a few requests we'd think performance has increased drastically (notice how the minimum response time is 72ms).

#### Mixed operations running sequentially vs parallel

This scenario is closer to what we'd see in a real application with extensive use of parallel streams. Each simulated API client will perform the quick operation immediately followed by the slow one. This will show us the impact slow tasks will have on quick ones, since in the parallel version long running tasks will hog threads, causing task queueing. As such we'll focus on the results for the quick operation only, but we'll include the results from the first test (a parallel quick operation, but running isolated).

| Scenario | Min | 50th pct | 75th pct | 95th pct | 99th pct |
| - | - | - | - | - | - |
| [Quick operation (isolated; parallel)](#quick-operation-running-in-parallel) | 18 | 18 | 31 | 31 | 32 | 34 | 483 |
| Quick operation (sequential mixed ops) | 65 | 78 | 78 | 79 | 80 |
| Quick operation (parallel mixed ops) | 26 | 78 | 494 | 6937 | 26990 |

If we look at the 99th percentile we have a performance degradation by three orders of magnitude! In a real web application we could run into this sort of scenario if `Stream.parallel()` was used for just one IO or CPU intensive task.

## Mitigations and alternatives

A suggestion I've seen around is to create your own ForkJoinPool and have it be used for parallel streams, something like this:

```
// WARNING: this is bad
var pool = new ForkJoinPool(Runtime.getRuntime().availableProcessors() * 4);
pool.submit(() -> {
  ioCall().stream()
      .parallel()
      ...
});
```

First thing you have to be careful is that you don't want a pool to be instantiated every time you're going to use a parallel stream. Creating threads is quite expensive, you should create the pool once and then reuse it.

But this leads to next problem, one that I find much more common. I believe it usually goes like this: someone notices a slow component, see that the work can be parallelized, uses a ForkJoinPool (or just a plain ExecutorService) at class level, do some tests in non-prod environments, notice performance improves and finally moves it to prod. Next time there's another slow component the same thing happens. After a while there'll be 2, 3+ unmonitored and largely unaccounted thread pools inside the application. The bigger problem, however, is that the performance improvements seen during tests might come with a slowdown to overall application performance. Spawning more threads does not magically create extra cores to work on them, but it'll increase contention, context switching and cache misses.

When it comes to parallelism, you want the smallest amount of threads that push overall CPU usage across all cores to something around 70%. Active threads, you don't want threads blocked waiting for tasks.

If you insist on using `Stream.parallel()`, in the long run I believe changing the common pool size with the system property [java.util.concurrent.ForkJoinPool.common.parallelism](https://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/util/concurrent/ForkJoinPool.java#l3305) is better than creating multiple ones. Fair warning, that's not something I've tested because I just don't use `ForkJoinPool` in web applications. It does do a lot of extra work to provide good task scheduling, but that [won't work with blocking calls](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html). So in the interest of keeping the amount of threads small, and not having to write my own pools, I stick to whatever ones reactive frameworks or async IO libraries provide.

## Running Locally

To run both the web application and the load tests you'll need Java 8+. For reliable results you should close all other applications.

First start the web application:
```
$ cd webapp
$ ./gradlew bootRun
```

And then on another terminal do:
```
$ cd stress-test
$ ./gradlew gatlingRun
```

After the tests complete (which should take a while) the results will be available under `stress-test\build\reports\gatling`.
