## PlanIt Task Scheduler

## About Project

Dynamic user task manager web application which allows users to schedule, track and manage their daily, weekly and monthly tasks in a easy and user-friendly interface.
[explore application](https://plan-it-task-scheduler.vercel.app/)

## Prerequisites

The client runs using npm and the api uses nuget packages. Api packages are already present in the
repository therefore no installation is required. However, some packages might be out-of-date and will need some update

To run the project follow the instructions below

## Install Node packages

You need NodeJS to run the command below. [Download NodeJS](https://nodejs.org/en/)

```bash
npm install 
```

## Run Client project

```bash
npm run dev
```

## Run Server [API]

1. Open Visual Studio
2. Open The Package manager console
3. Change connection string to your localhost server
4. Apply migrations to your database using the command below.

```bash
update-database 
```

This will create all necessary database tables using the initial migrations in the project.

5. Now build and run the solution. Your server should be up and running
            
## Technologies utilised

<div id="badges">
  <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="50px" height="50px"/>
  <img src="https://www.dropbox.com/s/i83q23mj6li239j/download%20%281%29.png?raw=1" width="50px" height="50px"/>
  <img src="https://www.dropbox.com/s/wo7otvjrdobsqp6/download.png?raw=1" width="50px" height="50px"/>
  <img src="https://www.dropbox.com/s/zghpe3q6cvdswy7/microsoft-sql-server-logo-svgrepo-com.png?raw=1" width="50px" height="50px"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7gmv65nxUV9rPmaJRuu4GL77Czoqvh9Qv0g&usqp=CAU" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/121405384-444d7300-c95d-11eb-959f-913020d3bf90.png" width="50px" height="50px"/>
  <img src="https://user-images.githubusercontent.com/25181517/121405754-b4f48f80-c95d-11eb-8893-fc325bde617f.png" width="50px" height="50px"/>
  <img src="https://skillicons.dev/icons?i=heroku" />
  <img src="https://skillicons.dev/icons?i=vercel" />
</div>

## Features

### Login 

Users can log onto the system using this login form

![Screenshot](screenshots/login.png)

### Sign up

Users can create an account using this form

![Screenshot](screenshots/signup.png)

### Dashboard

The dashboard offers a lot of different features ranging from charts to task scheduling forms. 

![Screenshot](screenshots/dashboard_1.png)

![Screenshot](screenshots/dashboard_2.png)

### Actions

#### Add new task

![Screenshot](screenshots/new.png)

#### Update task

![Screenshot](screenshots/update.png)

#### Mark task as completed
![Screenshot](screenshots/mark.png)

#### View task details
![Screenshot](screenshots/task_detail.png)

### Task

users can schedule new task, update, view task details, delete, filter and search for task using on this page. 
The actions can be seen on the screenshots above

![Screenshot](screenshots/tasks.png)

### Calender

Probably the most significant page on the web application. Enables users to keep track of the 
task they added and provide details of the task added on specific dates. Users can also 
navigate a "Gannt-like" page where they can keep track of their daily task.

![Screenshot](screenshots/calender.png)

![Screenshot](screenshots/calender_detail.png)

### Daily Task - Gannt

Interesting Gannt-like UI showing daily scheduled task.

![Screenshot](screenshots/daily.png)

### Profile 

Displays user info and offers user authentication credential update and account deletion features.

![Screenshot](screenshots/profile.png)

## License 

This project is licensed under [`MIT`](LICENSE)

## Version 
1.0.0

### Site

[Explore application](https://plan-it-task-scheduler.vercel.app/)

