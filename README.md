# 🔐 MERN Authentication System

A full-stack authentication system built with the MERN stack featuring secure JWT authentication, role-based access control (RBAC), and protected routes.

---

## 🚀 Features

### 👤 Authentication
- User registration & login
- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- Secure logout

---

### 🧠 Role-Based Access Control (RBAC)
- User roles: `user` / `admin`
- Role-based middleware protection
- Route access control:
  - `/profile` → authenticated users
  - `/dashboard` → admin only

---

### 🛡 Security
- Password encryption (bcrypt)
- JWT verification middleware
- Protected backend routes
- Secure cookie handling

---

### 🎯 Frontend (React)
- React Hook Form validation
- Protected routes system
- Authentication guards
- Admin & user route separation

---

### ⚙ Backend (Node + Express)
- MVC architecture
- Centralized middleware system
- MongoDB (Mongoose)
- JWT authentication
- Cookie-based session handling

---

### 👤 User & Admin Features
- User profile page (`/profile`)
- Admin dashboard
  - User management
  - Admin overview
- REST APIs:
  - `/api/user/profile`
  - `/api/admin`

---

## 🧱 Tech Stack

**Frontend:** React, Axios, React Router DOM  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas, Mongoose  
**Auth:** JWT, bcrypt, cookies  

---

## 🔐 Auth Flow

User registers → Password hashed → Stored in DB → Login → JWT generated → Stored in cookie → Middleware validates requests → Role-based access applied

---

## 📌 Project Status
✔ Authentication system complete  
✔ RBAC implemented  
✔ Protected routes working  
✔ Admin dashboard ready  

---

## 👨‍💻 Author
Built for full-stack learning and MERN development practice.