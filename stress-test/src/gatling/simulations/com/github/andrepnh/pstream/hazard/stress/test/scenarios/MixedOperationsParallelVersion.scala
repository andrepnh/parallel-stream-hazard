package com.github.andrepnh.pstream.hazard.stress.test.scenarios

import com.github.andrepnh.pstream.hazard.stress.test.LoadTest
import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder

class MixedOperationsParallelVersion extends LoadTest {
  lazy val steps: ScenarioBuilder = scenario("One quick and one slow operation (parallel)")
    .exec(parallelQuickOperation)
    .exec(parallelSlowOperation)
}
