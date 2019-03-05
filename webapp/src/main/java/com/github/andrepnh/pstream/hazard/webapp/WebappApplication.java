package com.github.andrepnh.pstream.hazard.webapp;

import java.util.concurrent.ForkJoinPool;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WebappApplication {

  public static void main(String[] args) throws InterruptedException {
    // Forcing common pool initialization
    System.out.println(ForkJoinPool.commonPool());
    SpringApplication.run(WebappApplication.class, args);
  }
}
