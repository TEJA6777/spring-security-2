# Primetrade – Backend Developer Internship Assignment

## 🚀 Overview
This project implements a secure and scalable REST API using Spring Boot with JWT authentication and role-based access control.  
A basic React frontend is included to demonstrate and interact with the backend APIs.

---

## 🛠 Tech Stack

### Backend
- Java 25
- Spring Boot
- Spring Security
- JWT Authentication
- JPA (Hibernate)
- MySQL
- Postman (API Testing)

📁 The Postman collection is included in the repository:  
`postman/Primetrade_API.postman_collection.json`

### Frontend
- React (Vite)
- JavaScript
- Fetch API
- JWT-based authentication

---

## 🔐 Features Implemented

### Authentication
- User Registration
- User Login
- Password hashing using BCrypt
- JWT token generation and validation

### Role-Based Access Control
- **USER**
  - View products
- **ADMIN**
  - Create products
  - Update products
  - Delete products
  - View products

### Product Module
- Create Product (ADMIN only)
- Update Product (ADMIN only)
- Delete Product (ADMIN only)
- View Products (USER & ADMIN)

### Security
- Stateless JWT authentication
- Role-based authorization using Spring Security
- Input validation
- Secure password storage with BCrypt

---

## ▶️ Running the Project

### Backend
```bash
cd backend
mvn spring-boot:run
Backend runs on:
👉 http://localhost:8080

---
cd frontend
npm install
npm run dev
Frontend runs on:
👉 http://localhost:5173

🧪 API Testing

All APIs were tested using Postman.

✔ Authentication APIs (Register / Login)
✔ Role-based access control
✔ Product CRUD operations
✔ JWT-protected endpoints

The Postman collection is available in the repository.


📈 Scalability Notes
- Stateless JWT authentication enables horizontal scaling
- Modular project structure allows easy feature expansion
- Can integrate Redis for caching
- Docker-ready for containerization
- Can be split into microservices if required

---

👨‍💻 Author
Kodati Sai Teja
Backend Developer Intern – Applicant