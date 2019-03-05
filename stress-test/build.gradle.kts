plugins {
  	id("com.github.lkishalmi.gatling") version "3.0.2"
	scala
}

sourceSets {
    main {
        withConvention(ScalaSourceSet::class) {
            scala {
                setSrcDirs(listOf("src/gatling/simulations"))
            }
        }
        resources {
            srcDir("src/gatling/resources")
        }
    }
}

gatling {
    val files = fileTree("src/gatling/simulations") {
        include("**/scenarios/*.scala")
    }
    val sources = project.projectDir.absoluteFile
            .resolveSibling("stress-test/src/gatling/simulations")
    val classes = files
            .map { file -> file.toRelativeString(sources) }
            .map { file -> file.replace(File.separator, ".").substring(0, file.indexOf(".scala")) }
    toolVersion = "3.0.3"
    scalaVersion = "2.12.8"
    simulations = classes
}

group = "com.github.andrepnh.pstream.hazard"
version = "0.0.1-SNAPSHOT"

repositories {
	mavenCentral()
}

dependencies {
	compile("org.scala-lang:scala-library:2.12.8")
	compile("io.gatling:gatling-core:3.0.3")
	compile("io.gatling.highcharts:gatling-charts-highcharts:3.0.3")
}