# 🔐 MERN Authentication System

A production-inspired authentication and authorization system built with the **MERN Stack**. The project focuses on implementing modern authentication practices, secure session management, role-based authorization, and multiple layers of security commonly used in real-world web applications.

---

# ✨ Highlights

* Secure JWT Authentication
* Email Verification (OTP)
* Forgot & Reset Password
* Google OAuth Login
* GitHub OAuth Login
* Role-Based Access Control (RBAC)
* Refresh Token Authentication
* HTTP-Only Cookie Authentication
* Route Protection
* Account Lockout Protection
* Login Rate Limiting
* Helmet Security Headers
* Suspicious Login Detection Email
* React Hook Form Validation
* Modular MVC Backend Architecture

---

# 🚀 Features

## Authentication

* User Registration
* Email Verification via OTP
* OTP Resend with Countdown Timer
* Secure Login
* Secure Logout
* Forgot Password
* Password Reset
* Refresh Token Authentication

---

## OAuth Authentication

* Google Sign-In
* GitHub Sign-In
* Passport.js Integration

---

## Authorization

* Role-Based Access Control (RBAC)
* User Role
* Admin Role
* Protected User Routes
* Protected Admin Routes

---

## Security Features

* Password Hashing using bcrypt
* JWT Access Tokens
* Refresh Tokens
* HTTP-Only Cookies
* Secure Cookie Configuration
* Helmet Security Middleware
* Login and more routes Rate Limiting
* Account Lockout after Multiple Failed Attempts
* Suspicious Login Detection Email
* Backend Route Protection
* Server-side Input Validation

---

## Frontend Features

* React Hook Form Validation
* Protected Routes
* Public Route Guards
* Admin Route Guards
* OTP Verification UI
* OTP Auto Focus
* OTP Paste Support
* Countdown Timer
* Persistent Account Lock Countdown
* Responsive Authentication Pages
* User-friendly Error Messages

---

## Backend Features

* MVC Architecture
* Modular Route Structure
* Service Layer
* Authentication Middleware
* Authorization Middleware
* Validation Middleware
* Centralized Error Handling
* MongoDB with Mongoose

---

# 🏗️ Authentication Flow

```text

User Registration =>  Password Hashing (bcrypt) =>  Store User in MongoDB =>  Send Verification Email (OTP) =>  User Verifies Account =>  Login =>  JWT Access Token + Refresh Token Generated =>  Stored in HTTP-Only Cookies =>  Protected Routes =>  Role Verification =>  User / Admin Access
```

---

# 🛡 Security Flow

```text

Login Request =>  Rate Limiter =>  Input Validation =>  Account Lock Check =>  Password Verification =>  JWT Generation =>  Secure HTTP-Only Cookies =>  Protected Resources

```

---

# 📋 Feature Responsibility Matrix

| Feature                   | Responsibility                                      |
| ------------------------- | --------------------------------------------------- |
| bcrypt                    | Hashes user passwords before storing them           |
| JWT                       | Authenticates users after login                     |
| Refresh Token             | Maintains authenticated sessions securely           |
| HTTP-Only Cookies         | Prevents JavaScript access to authentication tokens |
| Email Verification        | Ensures account ownership                           |
| OTP Resend                | Allows users to request a new verification code     |
| Forgot Password           | Starts secure password recovery                     |
| Reset Password            | Allows users to create a new password               |
| Passport.js               | Handles OAuth authentication                        |
| Google OAuth              | Social authentication with Google                   |
| GitHub OAuth              | Social authentication with GitHub                   |
| RBAC                      | Restricts access based on user roles                |
| Helmet                    | Adds secure HTTP response headers                   |
| Rate Limiter              | Protects login endpoint from brute-force attacks    |
| Account Lockout           | Temporarily blocks repeated failed login attempts   |
| Suspicious Login Email    | Notifies users of repeated failed login attempts    |
| React Hook Form           | Client-side form validation and UX                  |
| Validation Middleware     | Validates incoming request data                     |
| Authentication Middleware | Verifies authenticated users                        |
| Authorization Middleware  | Restricts access to protected resources             |

---

# 🧪 Functional Test Scenarios

* User registration
* Email verification
* OTP resend
* Successful login
* Invalid login handling
* Refresh token authentication
* Secure logout
* Forgot password
* Password reset
* Google OAuth login
* GitHub OAuth login
* Protected user routes
* Protected admin routes
* Role-based authorization
* Login rate limiting
* Account lockout after repeated failures
* Suspicious login notification email
* Persistent account lock countdown
* Helmet security headers

---

# 🧱 Tech Stack

### Frontend

* React
* React Router DOM
* React Hook Form
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* Passport.js
* Express Session
* Cookie Parser
* Helmet
* Express Rate Limit
* Nodemailer

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcrypt
* HTTP-Only Cookies
* Refresh Tokens

---

# 📂 Project Architecture

```
client/
 ├── components/
 ├── pages/
 ├── api/
 ├── hooks/
 ├── utils/

server/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── services/
 ├── utils/
```

---

# 📌 Current Status

* ✅ Registration
* ✅ Email Verification
* ✅ Secure Login
* ✅ Secure Logout
* ✅ Refresh Tokens
* ✅ Forgot Password
* ✅ Reset Password
* ✅ Google OAuth
* ✅ GitHub OAuth
* ✅ Protected Routes
* ✅ RBAC
* ✅ Helmet Security
* ✅ Login Rate Limiting
* ✅ Account Lockout Protection
* ✅ Suspicious Login Detection
* ✅ Production-inspired Authentication Flow

---

# 👨‍💻 Author

**Muhammad Waris**

Built as a portfolio project to practice production-inspired authentication, authorization, and modern web security concepts using the MERN Stack.
