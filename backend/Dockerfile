# # Use an official OpenJDK 21 image as the base image
# FROM maven:3.8.4-openjdk-17 AS build
#
# # Set the working directory inside the container
# WORKDIR /app
#
# #Copy the pom.xml and install dependencies
# COPY pom.xml .
# RUN mvn dependency:go-offline
#
# #Copy the source code and build the application
# COPY src ./src
# RUN mvn clean package -DskipTests
#
# #Use an official OpenJDK image to run the application
# FROM openjdk:21-jdk-slim
#
# # Set the working directory
# WORKDIR /app
#
# # Copy the built JAR file from the build stage
# COPY --from=build /app/target/usersmanagementsystem-0.0.1-SNAPSHOT.jar app.jar
#
# # Expose the port your Spring Boot app runs on (1010)
# EXPOSE 1010
#
# # Command to run the application
# ENTRYPOINT ["java", "-jar", "/app.jar"]

# Use OpenJDK 21 image as the base image
FROM openjdk:21-jdk-slim AS build

# Install Maven manually (if needed)
RUN apt-get update && apt-get install -y maven

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use OpenJDK 21 to run the application
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/usersmanagementsystem-0.0.1-SNAPSHOT.jar /app/usersmanagementsystem-0.0.1-SNAPSHOT.jar


# Expose the port your Spring Boot app runs on (1010)
EXPOSE 1010

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/usersmanagementsystem-0.0.1-SNAPSHOT.jar"]
