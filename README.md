# Candidate Management System

A Candidate Management System developed as part of a .NET Developer Internship assignment.

## Technologies Used

### Frontend

- React
- Vite
- Material UI

### Backend

- ASP.NET Core Web API
- C#
- ADO.NET
- SQL Server

## Features

- View candidate list
- View candidate details
- Search candidates by name
- Filter candidates by skills
- Filter candidates by experience
- Filter candidates by status
- Add a new candidate
- Edit candidate information
- Delete a candidate

## Project Structure

```text
CandidateManagementSystem
│
├── Frontend
│   ├── src
│   │   ├── Components
│   │   ├── Services
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
│
└── Backend
    ├── Controllers
    ├── Models
    ├── Program.cs
    └── CandidateManagementAPI.csproj
```
How to Run
Backend
Open the backend project in Visual Studio.
Make sure SQL Server is available and the database is configured.
Run the ASP.NET Core Web API project.

The API runs locally at:

https://localhost:7141
Frontend
Open a terminal in the frontend folder.
Install the required dependencies:
npm install
Start the React application:
npm run dev

The frontend runs locally using Vite.

API

The frontend communicates with the ASP.NET Core Web API through:

https://localhost:7141/api/Candidates
Database

The application uses SQL Server for storing candidate information.

Author

Minakshi


