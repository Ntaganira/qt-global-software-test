# User and Task Management Project using Spring Boot

This GitHub repository contains a User, Task Management project, and project managment implemented using Spring Boot v3. 
The project focuses on the user (sign up, sign in as well as user-profile) and tasks and project (create project) associated with those users (Assignees). This README provides an overview of the project, setup instructions, and usage guidelines.

## Features

1. User Management:
   - User registration with basic information.
   - Basic authentication using username and password.
   - Role-based authorization USER-ROLE as default for all users.

2. Task Management:
   - View, create, update, and delete tasks.
   - Assign tasks to specific users(Assignees) and projects.
   - Mark tasks as completed.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- Java Development Kit (JDK) 8 or later
- Apache Maven
- Git
- IDE of your choice (NetBeans, IntelliJ IDEA , VsCode, ...).

## Setup Instructions


1. **Configure the Database:**

   You can configure the database settings in the `src/main/resources/application.properties` file if needed.

2. **Run the Application:**

   ```bash
   mvn spring-boot:run
   ```

   The application will start at `http://localhost:8080/login`.

3. **Access the Application:**

   - Open a web browser and navigate to `http://localhost:8080/register` to access the application.

4. **Access the API documentation:**

   - Once you have logged into the system on the tab under the user profile picture click documentation it will take you to the APIs documentation of this project.


## Project Structure
```
 ├── mvnw
 ├── mvnw.cmd
 ├── pom.xml
 └── src
    └── main
        ├── java
        │   └── rw
        │       └── qt
        │           ├── > configurations
        │           ├── > controller
        │           ├── > dtos
        │           ├── > entity
        │	          ├── Project.java
        │		  ├── Tasks.java
        │		  └── User.java
        │           ├── >repository
        │           ├── >security
        │           ├── >service
        │           └── QttaskmanagmentApplication.java
        └── resources
            ├── application.properties
            ├── UI
            │	├── index.html
            │	├── login.html
            │	└── register.html
            └── application.properties
```
## Usage

1. **User Registration:**

   - Navigate to the registration page and create a new user account.
   - Use the registered credentials to log in.

2. **User Login:**

   - Use your registered username and password to log in.
