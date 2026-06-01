# 📋 Todo App

A full-stack Todo Management Application built using **Spring Boot**, **Spring Security**, **JWT Authentication**, **MySQL**, and **React.js**.

## 🚀 Features

### Authentication
- User Login
- JWT Token Authentication
- Spring Security Integration
- Protected APIs

### Task Management
- Create Task
- View Tasks
- Edit Task
- Delete Task
- Mark Task as Completed
- Search Tasks
- Dark Mode Support

### Frontend
- React.js
- Axios API Integration
- Responsive UI
- JWT Token Storage

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL Database
- REST APIs

---

## 🛠 Tech Stack

### Frontend
- React.js
- Bootstrap
- Axios
- React Router

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT

### Database
- MySQL

---

## 📂 Project Structure

```text
todo-app
│
├── src/                    # Spring Boot Backend
├── pom.xml
├── mvnw
├── .mvn
│
├── todo-frontend/          # React Frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### Clone Repository

```bash
git clone https://github.com/AnkurVermaOfficial/todo-app.git
```

### Configure Database

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todo_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

### Run Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## ⚙️ Frontend Setup

Navigate to frontend folder:

```bash
cd todo-frontend
```

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## 🔐 API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /auth/signup |
| POST | /auth/login |

### Tasks

| Method | Endpoint |
|----------|----------|
| GET | /api/tasks |
| POST | /api/tasks |
| PUT | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |

---

## 📸 Screenshots

Add screenshots of:
- Login Page
- Dashboard
- Dark Mode
- Task Management

---

## 🎯 Future Enhancements

- User Registration UI
- Task Priority Levels
- Due Dates
- Pagination
- Email Notifications
- Cloud Deployment

---

## 👨‍💻 Author

**Ankur Verma**

GitHub:
https://github.com/AnkurVermaOfficial

LinkedIn:
https://www.linkedin.com/in/ankur-verma

---
⭐ If you like this project, consider giving it a star.
