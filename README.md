Parallel streams have a huge potential to ruin performance of web applications, yet they keep creeping up in codebases. I believe the problem is the matter doesn't get as much attention as it should, so I set this up hoping that it helps to spread the word about the hazards of parallel streams.

## Contents

1. [Summary](#summary)
1. [Benchmarks](#benchmarks)
    1. [Quick operation running in parallel](#quick-operation-running-in-parallel)
    1. [Slow operation running sequentially vs parallel](#slow-operation-running-sequentially-vs-parallel)
    1. [Mixed operations running sequentially vs parallel](#mixed-operations-running-sequentially-vs-parallel)
1. [More thread abuse](#more-thread-abuse)
1. [Running Locally](#running-locally)

## Summary

In a nutshell, the main problem is that all parallel streams are backed by a single small thread pool [(n_cores - 1)](https://hg.openjdk.java.net/jdk-updates/jdk11u/file/80d25f7feef9/src/java.base/share/classes/java/util/concurrent/ForkJoinPool.java#l2359), while web applications are backed by pools that can be as large as n_cores * 8, IIRC (and depending on the web server used). Calling `Stream.parallel()` in web applications can introduce bottlenecks if: a) we do it too often and b) we perform slow computation or blocking IO inside the stream.

The second case is specially worse because one bad apple will spoil the bunch. Once you have a few slow tasks consuming threads they'll harm all others, no matter how fast they're.

If you're not convinced here's one of the benchmarks you'll find in this repo:

| Scenario | Response time (ms), 95th percentile | Response time (ms), 99th percentile |
| - | - | - |
| Slow operation, sequential | 313 | 315 |
| Slow operation, parallel | 9587 | 18988 |

But then one could say it might be ok for some application, because they're not doing CPU/IO intensive work inside the stream. Ok, but how do we ensure that remains true in the future? Over the years applications change, workloads change, people working on the code change. What's fast today may not be tomorrow and in a world of distributed systems some downstream code could easily introduce an IO call.

Making sure we're not using `Stream.parallel()` is quite simple, just a quick search on the code base and you can check if you're parallel-free. You can even setup a static code analysis rule to automate that! On the other hand, the maintenance overhead associated with proper usage just doesn't pay off in my opinion, specially since there's plenty alternatives out there to parallelize work in web applications.

If you want to know more about the benchmarks just scroll down. For more bad practices on web applications [click here](##more-thread-abuse), and to run the benchmarks on your own you can go to the [Running Locally](#running-locally) section.
 
## Benchmarks

All tests are performed against a single Spring Boot app with default configurations. This application has a single endpoint:
 
  GET http<span></span>://localhost:8080/?parallel=[true|false]&targetMillis=[some integer]
 
`parallel` controls whether parallel streams will be used or not and defaults to false. `targetMillis` is used to determine how much data the application is going to process using streams. It's specified as time because if you use sequential streams `targetMillis` should be close to the actual time taken to process the data.

The load tests simulate two operations: a somewhat quick operation (`targetMillis=50`) and a slower operation (`targetMillis=200`, the default value). Each operation is performed using sequential or parallel streams according to the scenario we simulate. All scenarios exercise the same load: we increase the number of API users by one every second until we reach the max (n_cores * 8). Each simulation will run for roughly 1 minute.

If you want to take a closer look, I've included the reports I got when testing on my machine under `sample-results`.

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

This scenario is closer to what we'd see in a real application with extensive use of parallel streams. Each simulated API client will trigger the quick operation immediately followed by the slow one. This will show us the impact slow tasks will have on quick ones since on the parallel version the long running tasks will hog threads, causing task queueing. As such we'll focus on the results for the quick operation only, but we'll include the results from the first test (a parallel quick operation, but running isolated).

| Scenario | Min | 50th pct | 75th pct | 95th pct | 99th pct |
| - | - | - | - | - | - |
| [Quick operation (isolated; parallel)](#quick-operation-running-in-parallel) | 18 | 18 | 31 | 31 | 32 | 34 | 483 |
| Quick operation (sequential mixed ops) | 65 | 78 | 78 | 79 | 80 |
| Quick operation (parallel mixed ops) | 26 | 78 | 494 | 6937 | 26990 |

If we look at the 99th percentile we have a performance degradation by three orders of magnitude! In a real web application we could run into this sort of scenario if `Stream.parallel()` was used for just one IO or CPU intensive task.

## More thread abuse

There are other bad practices for parallelism on web applications worth mentioning, even if they're not related to parallel streams:

* Anything that uses `ForkJoinPool`, no matter the pool size
* Defining thread pools at component level
* Writing your own thread pool instead of using the ones provided by frameworks

### ForkJoinPool

The first problem is a suggestion I've seen around to use parallel streams with larger pools:

```java
// WARNING: this is bad
var pool = new ForkJoinPool(Runtime.getRuntime().availableProcessors() * 4);
pool.submit(() -> {
  ioCall().stream()
      .parallel()
      ...
});
```

The main problem is that you don't want a pool to be instantiated every time you're going to use a parallel stream. Creating threads is quite expensive, you should create the pool once and then reuse it (the same applies to `ExecutorService`, by the way).

But anything that uses `ForkJoinPool` (including [`Executors.newWorkStealingPool`](https://hg.openjdk.java.net/jdk-updates/jdk11u/file/80d25f7feef9/src/java.base/share/classes/java/util/concurrent/Executors.java#l113)) should be avoided. If you read the javadoc for [`ForkJoinPool`](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/concurrent/ForkJoinPool.html) you'll notice that it's not designed for tasks that perform blocking IO.

When `ForkJoinPool` notices some task is waiting for another it might create or reactivate a thread so that unblocked tasks can keep processing. In other words, the number of active tasks will approximate the paralellism level that you define. The big problem is `ForkJoinPool` cannot do that if the tasks perform blocking IO. From the pool's perspective they'll still appear as active and it won't create/resume threads for other tasks to use.

### Defining thread pools at component level

I believe this usually goes like this: someone notices a slow component, see that the work can be parallelized, uses a `ForkJoinPool` (or just a plain `ExecutorService`) at class level, do some tests in non-prod environments, notice performance improves and finally moves it to prod. Next time there's another slow component, the same thing happens. After a while there'll be 2, 3+ unmonitored and largely unaccounted thread pools inside the application. The bigger problem, however, is that the performance improvements seen during tests might come with a slowdown to overall application performance. Spawning more threads does not magically create extra cores to work on them, but it'll increase contention, context switching and cache misses.

When it comes to parallelism, you want the smallest amount of _active_ threads that push overall CPU usage across all cores to something around 70%.

### Maintaining your own thread pool

Why would I bother writing, maintaining and tunning my own thread pool if pretty much every framework already comes with one? Spring has the pool used for `@Async`, EJB has the pool used by `@Asynchronous`, RxJava and Reactor both have their schedulers, async IO libraries also come with their thread pools.

And these pools already come configured with sensible defaults for the workload they're intended to (e.g. RxJava has separate pools for IO and computation intensive work). Instead of having yet another thread pool on your runtime, just use the existing ones and tune them when needed.

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
