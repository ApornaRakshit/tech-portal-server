# 🚀 Technology Evolution Portal — Server Side (Backend)

A scalable and secure RESTful backend built with **Node.js, Express.js, and MongoDB**.  
This repository contains the complete backend of **Tech Portal**, a technology learning and career guidance platform for students and IT professionals.

The backend handles authentication, content management, learning pathways, and secure API services.

🔗 Live API: https://tech-portal-30529.web.app/  
🔗 Server Repository: https://github.com/ApornaRakshit/tech-portal-server  
🔗 Client Repository: https://github.com/ApornaRakshit/tech-portal-client  

---

## 📑 Table of Contents

- About the Backend  
- Features  
- Tech Stack  
- Folder Structure  
- Environment Variables  
- Installation & Setup  
- API Overview  
- Deployment  
- Future Enhancements  
- License  
- Contact  

---

## 🔍 About the Backend

The **Tech Portal Backend** provides secure and efficient API services for managing:

- User authentication & authorization  
- Technology articles & tutorials  
- Learning pathways  
- Categories and content filtering  
- Admin content management  

It is designed using REST architecture and JWT-based authentication.

---

## 🚀 Features

- User authentication using JWT  
- Secure API endpoints  
- CRUD operations for tech articles & tutorials  
- Category & learning pathway management  
- Role-based access (Admin/User)  
- MongoDB database integration  
- Production-ready deployment  

---

## 🛠 Tech Stack

### Backend Framework & Tools

- **Node.js** — Server runtime  
- **Express.js** — REST API framework  
- **MongoDB** — NoSQL database  
- **Mongoose** — ODM for MongoDB  
- **JWT** — Authentication & authorization  
- **Firebase Admin** — Secure token verification  
- **Cors** — Cross-origin requests  
- **Dotenv** — Environment configuration  

---

## 📂 Folder Structure

```
TECH-PORTAL-SERVER/
├── .vercel/
├── node_modules/
│
├── routes/
│ ├── events.routes.js
│ ├── registrations.routes.js
│ ├── tech.routes.js
│ ├── trends.routes.js
│ └── users.routes.js
│
├── vercel.json
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=
MONGO_URI=
```
⚙ Installation & Setup
1. Clone the repository
```
git clone https://github.com/ApornaRakshit/tech-portal-server.git
```

2. Navigate to the project folder
```
cd tech-portal-server
```

3. Install dependencies
```
npm install
```
4. Configure environment variables
```
Create a .env file and add required keys.
```
5. Start the server
```
npm start
```

```
Server will run on:
http://localhost:5000
```

## 🔌 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /events | Get all events |
| POST   | /registrations | Register for event |
| GET    | /tech | Get all tech articles |
| GET    | /trends | Get trending technologies |
| GET    | /users | Get users |

---

🌐 Deployment

Backend deployed using Vercel

🔮 Future Enhancements

- Analytics system

- AI-based content recommendation

---

📜 License

This project is developed for educational and learning purposes.

---

📬 Contact

Developer: Aporna Rakshit

Computer Science & Engineering Student
Full Stack Developer (MERN)

---

🔗 Links

GitHub: https://github.com/ApornaRakshit

LinkedIn: https://www.linkedin.com/in/apornarakshit/
