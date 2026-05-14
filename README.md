# Real Time Chat Application

## Project Overview

This project is a real-time chat application built using:

### Frontend

* React
* CSS
* Socket.IO Client
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Socket.IO
* JWT Authentication
* bcryptjs

---

## Features

### Authentication & Authorization

* User registration
* User login
* JWT token authentication
* Protected routes

### User CRUD Operations

* Create user
* Read users
* Update user
* Delete user

### Real-Time Chat

* Send messages instantly using Socket.IO
* Receive messages live
* Store chat history in MongoDB
* Auto-scroll to latest message

### Dashboard Stats

* Total users count
* Total messages count

---

## Installation Steps

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

---

## Project Structure

```txt
backend/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── models/
 ├── server.js

frontend/
 ├── pages/
 ├── services/
 ├── App.jsx
```
