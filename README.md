# Concert-tickets


## Introduction

The application is built using Next.js for the frontend and NestJS for the backend, providing a modern and scalable architecture. It features responsive design, ensuring an optimal viewing experience across various devices, and includes functionalities such as CRUD operations for concert management and server-side error handling for enhanced reliability. 

The aim of this application is to provide users with a platform to browse and reserve concert tickets, while also allowing administrators to manage concert details and user reservations.

In this README, you'll find detailed instructions on setting up and running the application locally, an overview of the architecture, information about dependencies used, and guidance on running unit tests.

## Setup/Installation

### Prerequisites

Before running the application, you must have the following prerequisites installed:
<ul>
  <li>Docker (if using MongoDB via Docker)</li>
  <li>Node.js and npm (Node.js package manager)</li>
</ul>

### MongoDB Setup

If you're using MongoDB as the database, follow these steps to set up MongoDB using Docker:

```sh
docker run -d -p 27017:27017 --name concert-bookingdb mongo
  ```

This command will download the latest MongoDB image and run it as a Docker container named concert-bookingdb. The MongoDB server will be accessible on port 27017.

### Frontend and Backend Setup

#### 1. Clone the Repository:
  ```sh
  git clone https://github.com/TurboJessadakorn/Concert-tickets.git
  cd Concert-tickets
  ```

#### 2. Set up Environment Variables:

Navigate to the frontend and backend directories and create a .env file in each.
Copy the example .env file provided and adjust the configurations as needed.

#### 3. Install Dependencies:
  #### Frontend
  Navigate to the frontend directory and install dependencies:
    
    cd frontend
    npm install
    
  #### Backend
  Navigate to the back directory and install dependencies:
   
    cd backend
    npm install
    
### Running the Application

After completing the setup steps, you can run the application locally:

#### 1. Start the Backend Server:

```sh
cd backend
npm run start
```

#### 2. Start the Frontend Server:

```sh
cd frontend
npm run dev
```

The application should now be running locally. Access it by navigating to http://localhost:3000 in your web browser.


## Architecture Overview
Overview of the project's architecture.

## Unit Tests
Instructions for running unit tests.

## Dependencies
List of dependencies used in the project.

