# 🔐 MERN Authentication System

A full-stack authentication system built using the MERN stack with secure JWT-based authentication, bcrypt password hashing, and HTTP-only cookies.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- Password hashing using bcrypt
- JWT authentication
- HTTP-only cookies for security
- Logout functionality

### 🛡 Security
- Password encryption (bcrypt)
- JWT token verification middleware
- Protected backend routes
- Secure cookie-based authentication

### 🎯 Frontend (React)
- React Hook Form (real-time validation)
- Regex-based validation
- Confirm password validation
- Input error highlighting (red/green UI)
- Protected routes (ready for extension)

### ⚙ Backend (Node + Express)
- MVC architecture (Controller / Service / Routes)
- Centralized middleware system
- MongoDB with Mongoose
- JWT-based auth system
- Cookie parser integration

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Hook Form
- Axios
- React Router DOM
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- cookie-parser

---

## 📁 Project Structure
mern-auth/
│
├── client/ # React frontend
├── server/ # Express backend
├── .READme.md
├── .gitignore


---

## 🔐 Authentication Flow
User registers
↓
Password hashed (bcrypt)
↓
Stored in MongoDB
↓
User logs in
↓
JWT generated
↓
Stored in HTTP-only cookie
↓
Middleware verifies token on protected routes