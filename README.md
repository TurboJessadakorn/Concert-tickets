# Concert-tickets
<br />

## Introduction

The application is built using Next.js for the frontend and NestJS for the backend, providing a modern and scalable architecture. It features responsive design, ensuring an optimal viewing experience across various devices, and includes functionalities such as CRUD operations for concert management and server-side error handling for enhanced reliability. 

The aim of this application is to provide users with a platform to browse and reserve concert tickets, while also allowing administrators to manage concert details and user reservations.

In this README, you'll find detailed instructions on setting up and running the application locally, an overview of the architecture, information about dependencies used, and guidance on running unit tests.
<br />
<br />


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
<br />
<br />



## Backend Architecture Overview

The backend of the Concert Ticket Booking Application is developed using NestJS, following a modular architecture approach. The architecture is organized into modules, guards, and filters to ensure scalability, maintainability, and security.

### Modules

#### Concert Module
The Concert module is responsible for handling concert-related functionalities. It includes the following components:
  <ul>
    <li><b>Controller:</b> Handles incoming HTTP requests related to concerts, such as retrieving concert information, creating new concerts, updating existing concerts, and deleting concerts.</li>
    <li><b>Service:</b> Implements logic for concert-related operations, interacting with the database or other external services as necessary.</li>
    <li><b>Entity:</b> Represents the data model for concerts, defining the structure and properties of concert objects.</li>
  </ul>
  
#### Reserve Module
The Reserve module handles reservation-related functionalities, allowing users to reserve tickets for concerts. It consists of the following components:
<ul>
    <li><b>Controller:</b> Manages HTTP requests related to reservations, including retrieving reservation information, creating new reservations, and canceling existing reservations.</li>
    <li><b>Service:</b> Implements reservation logic, such as validating reservation requests and updating reservation status.</li>
    <li><b>Entity:</b> Defines the data model for reservations, specifying attributes such as user ID, concert ID, and reservation status.</li>
</ul>

### Guards
The Guards folder contains guards that are used to protect routes and endpoints based on user roles. Two types of guards are implemented:
<ul>
    <li><b>User Guard</b></li>
    <li><b>Admin Guar</b></li>
</ul>

### Filters
The Filters folder houses exception filters, which are used to handle and customize error responses in the application. These filters capture exceptions thrown during request processing, providing meaningful error messages to clients and logging detailed information for developers.
<br />
<br />



## Frontend Architecture Overview

The frontend of the Concert Ticket Booking Application is built using Next.js. The architecture follows a component-based approach and is organized into three main folders: pages, components, and styles.

### Pages
The Pages folder contains the top-level components corresponding to different routes in the application. It consists of the following files:
  <ul>
    <li><b>_app.tsx:</b> This file serves as the entry point of the application and is used to customize the Next.js App component. It stores the isAdmin state, allowing the application to differentiate between admin and regular users.</li>
    <li><b>index.tsx:</b> The landing page of the website, displaying all concerts available for reservation. For users, this page provides functionality to reserve or cancel tickets. Admin users have additional options to create or delete concerts and view website statistics.</li>
    <li><b>history.tsx:</b> This page is accessible to admin users and displays the reservation history of all users, providing insights into past concert bookings.</li>
  </ul>
  
### Components
The Components folder contains reusable UI components used throughout the application. These components encapsulate specific functionality and styling, promoting code reusability and maintainability. Some key components include: Sidebar, ConcertCard, ConcertCreate, etc.

### Styles
The Styles folder contains CSS files or CSS-in-JS solutions used to style components and pages.
<br />
<br />

## Unit Tests
The Concert Ticket Booking Application includes comprehensive unit tests to ensure the correctness and reliability of the backend services implemented in NestJS. These tests are created using Jest.



### Test Coverage
#### Concert Service
The unit tests for the Concert service cover critical functionalities, including:
<ul>
    <li><b>Creating a Concert</b></li>
    <li><b>Deleting a Concert</b></li>
    <li><b>Updating a Concert</b></li>
  </ul>

#### Reserve Service
The unit tests for the Reserve service cover critical functionalities, including:
<ul>
    <li><b>Reserving a seat</b></li>
    <li><b>Canceling a reservation</b></li>
    <li><b>Reserving status check</b></li>
</ul>
     
    

     

