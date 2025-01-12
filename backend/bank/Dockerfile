# Dockerfile for Java Spring Boot backend
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy JAR file
COPY target/application-0.0.1-SNAPSHOT.jar app.jar

# Expose the port and start the Spring Boot app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
