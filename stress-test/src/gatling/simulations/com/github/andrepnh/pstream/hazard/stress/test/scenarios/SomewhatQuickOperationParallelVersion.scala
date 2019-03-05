package com.github.andrepnh.pstream.hazard.stress.test.scenarios

import com.github.andrepnh.pstream.hazard.stress.test.LoadTest
import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder

class SomewhatQuickOperationParallelVersion extends LoadTest {
  lazy val steps: ScenarioBuilder = scenario("Somewhat quick operation (parallel)")
    .exec(parallelQuickOperation)
}
