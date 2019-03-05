package com.github.andrepnh.pstream.hazard.webapp;

import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import javax.validation.constraints.Min;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {

  private final int batchSize = 1000;

  private final int individualBatchDelayMs = 10;

  @GetMapping
  public int aggregate(
      @RequestParam(required = false) boolean parallel,
      @RequestParam(required = false, defaultValue = "200") @Min(10) int targetMillis) {
    // We're going to split "processing" in batches and sleep after each one of them. Had to do this
    // instead of sleeping after each element in order to to avoid small, frequent sleeps (once we
    // get to a few nanoseconds the sleep time becomes too unreliable).
    int batches = targetMillis / individualBatchDelayMs;
    Stream<IntStream> dataSet = IntStream.range(0, batches)
        .mapToObj(i -> IntStream.range(0, batchSize));
    if (parallel) {
      dataSet = dataSet.parallel();
    }
    IntStream batchResults = dataSet
        .mapToInt(batch -> {
          try {
            TimeUnit.MILLISECONDS.sleep(individualBatchDelayMs);
          } catch (InterruptedException e) {
            throw new IllegalStateException(e);
          }
          return batch.max().getAsInt();
        });
    return batchResults.max().getAsInt();
  }
}
