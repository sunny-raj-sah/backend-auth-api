# 🚀 Backend APIs & Authentication Starter Kit

A production-ready Node.js backend starter with **JWT authentication**, **role-based access**, and **user management** using **Express** and **MongoDB**.

Includes secure defaults, structured code, and ready-to-use admin APIs.

---

## 🧩 Features

- JWT authentication with access token
- Password hashing with bcrypt
- Role-based authorization (`admin`, `user`)
- Security best practices: Helmet, CORS, rate-limit, dotenv
- Request validation using Zod
- Organized MVC structure
- Admin endpoints to manage users (CRUD)

---

## 📦 Key Endpoints:

- Method: POST api/auth/register ( Register New User
  )

- Method: POST /api/auth/login (Login)

- Method: GET /api/users (Get Current User Profile)

- Method: GET api/users?page=1&limit=10 (Admin – List Users)
  (Need to login with admin account first, e.g. seeded admin)

- Method: GET api/users/<USER_ID> (Admin – Get User by ID)

- Method: PATCH api/users/<USER_ID> (Admin – Update User Role/Status)

-Method: DELETE api/users/<USER_ID> (Admin – Delete User)

-Method: GET api/health (Health Check)
