plugins {
	java
	application
	id("org.springframework.boot") version("2.1.3.RELEASE")
}

apply(plugin = "io.spring.dependency-management")

group = "com.github.andrepnh.pstream.hazard"
version = "0.0.1-SNAPSHOT"

configure<JavaPluginConvention> {
	sourceCompatibility = JavaVersion.VERSION_1_8
	targetCompatibility  = JavaVersion.VERSION_1_8
}

configure<ApplicationPluginConvention> {
    mainClassName = "com.github.andrepnh.pstream.hazard.webapp.WebappApplication"
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
}