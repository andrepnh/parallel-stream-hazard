package com.github.andrepnh.pstream.hazard.stress.test.scenarios

import com.github.andrepnh.pstream.hazard.stress.test.LoadTest
import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder

class SlowishOperationParallelVersion extends LoadTest {
  lazy val steps: ScenarioBuilder = scenario("Slowish operation (parallel)")
    .exec(parallelSlowOperation)
}
