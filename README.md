# Chatkrobackend

This is the backend for **Chatkro**, a real-time chat application built using the MERN stack. It handles user authentication, chat management, and real-time messaging using Socket.IO.

## 🚀 Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Real-time messaging using Socket.IO
- RESTful API for users, chats, and messages
- MongoDB database integration
- CORS enabled for frontend communication

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT (jsonwebtoken)
- dotenv
- bcrypt / bcryptjs

## 📁 Project Structure

backend/
│
├── index.js # Main entry point
├── models/ # Mongoose models
├── routes/ # API routes
├── controllers/ # Route logic
├── config/ # DB connection and environment config
└── .env # Environment variables

## ⚙️ Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/Arpit0408/Chatkrobackend.git
cd Chatkrobackend

npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

npm start

📡 Sample API Endpoints
POST /api/user/register – Register a new user

POST /api/user/login – Authenticate a user

GET /api/chats – Retrieve all chats

POST /api/message – Send a new message

Made by @Arpit0408
