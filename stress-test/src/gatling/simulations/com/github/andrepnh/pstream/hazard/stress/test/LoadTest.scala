package com.github.andrepnh.pstream.hazard.stress.test

import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder
import io.gatling.http.Predef._
import io.gatling.http.request.builder.{Http, HttpRequestBuilder}

import scala.concurrent.duration._

trait LoadTest extends Simulation {
  private val maxUsers = Runtime.getRuntime.availableProcessors() * 8

  val sequentialQuickOperation: HttpRequestBuilder = http("Somewhat quick operation (sequential)")
    .get("http://localhost:8080/?targetMillis=50")
  val parallelQuickOperation: HttpRequestBuilder = http("Somewhat quick operation (parallel)")
    .get("http://localhost:8080/?parallel=true&targetMillis=50")

  val sequentialSlowOperation: HttpRequestBuilder = http("Slowish operation (sequential)")
    .get("http://localhost:8080")
  val parallelSlowOperation: HttpRequestBuilder = http("Slowish operation (parallel)")
    .get("http://localhost:8080/?parallel=true")

  def steps: ScenarioBuilder

  setUp(
    steps.inject(
      rampUsersPerSec(1) to maxUsers during (1 minutes)
    )
  )
}
