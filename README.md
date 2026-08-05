# 🎥 SyncMeet - Full Stack Video Conferencing Platform

SyncMeet is a full-stack video conferencing platform inspired by Zoom and Google Meet. It enables users to create or join secure video meetings with real-time communication, chat, screen sharing, and participant management. The application is built using the MERN stack with WebRTC, Socket.IO, Docker, Kubernetes, AWS, and GitHub Actions CI/CD.

---

## 🚀 Live Demo

Website Link : https://syncmeet-akif.duckdns.org/

---

## ✨ Features

- 🔐 JWT Authentication
- 🎥 HD Video & Audio Calling
- 📞 Create & Join Meeting Rooms
- 💬 Real-Time Chat
- 🖥️ Screen Sharing
- 🎤 Mute / Unmute Microphone
- 📷 Camera On / Off
- 👥 Live Participant Management
- ⏱️ Meeting Duration Timer
- 📋 Copy & Share Meeting Link
- 📱 Responsive Design
- ⚡ Real-Time Communication using Socket.IO
- 🌐 WebRTC Peer-to-Peer Video Streaming
- 🚀 Dockerized Application
- ☸️ Kubernetes Deployment
- ☁️ AWS EC2 Deployment
- 🔄 GitHub Actions CI/CD Pipeline

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Material UI
- React Router
- Axios
- Socket.IO Client
- WebRTC
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Socket.IO

## DevOps

- Docker
- Docker Compose
- Kubernetes
- Minikube
- AWS EC2
- GitHub Actions
- Nginx
- PM2

---

# 📂 Project Structure

```
SyncMeet/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── docker-compose.yml
├── k8s/
└── README.md
```

---

# ⚙️ Backend Setup

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/backend-syncmeet.git
```

Install dependencies

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3000
```

Run backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# 💻 Frontend Setup

Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/frontend-syncmeet.git
```

Install dependencies

```bash
cd frontend
npm install
```

Run

```bash
npm start
```

Frontend runs on

```
http://localhost:3000
```

---

# 🐳 Docker Setup

Build Docker images

```bash
docker compose build
```

Run containers

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

---

# ☸️ Kubernetes Deployment

Apply Kubernetes resources

```bash
kubectl apply -f k8s/
```

Verify

```bash
kubectl get pods
kubectl get services
kubectl get ingress
```

---

# 🔑 Environment Variables

## Backend

| Variable | Description |
|-----------|-------------|
| PORT | Backend Port |
| MONGO_URI | MongoDB Atlas Connection String |
| JWT_SECRET | JWT Secret |
| CLIENT_URL | Frontend URL |

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint |
|---------|------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |

---

## Meetings

| Method | Endpoint |
|---------|----------------|
| POST | /api/meeting/create |
| GET | /api/meeting/:id |
| POST | /api/meeting/join |

---

## Socket Events

- Join Room
- Leave Room
- User Connected
- User Disconnected
- Send Message
- Receive Message
- Toggle Audio
- Toggle Video
- Screen Share
- ICE Candidate Exchange
- Offer / Answer Signaling

---

# 🚀 Deployment

The application is deployed using:

- AWS EC2
- Docker
- Kubernetes
- Nginx
- PM2
- GitHub Actions CI/CD

---

# 🔄 CI/CD Pipeline

Every push to the **main** branch automatically:

- Checks out the source code
- Installs dependencies
- Runs project build
- Builds Docker images
- Pushes images (optional)
- Deploys application to AWS EC2
- Updates Kubernetes deployment
- Restarts application
- Verifies deployment status

---

# 📈 Future Improvements

- 📹 Meeting Recording
- 📅 Meeting Scheduling
- 📧 Email Invitations
- 👨‍💼 Admin Dashboard
- 🎭 Virtual Backgrounds
- ✋ Raise Hand Feature
- 📝 Live Captions
- 📂 File Sharing
- 📺 Multi-screen Sharing
- 🔒 End-to-End Encryption

---

# 👨‍💻 Author

**Abdurrahman Akif**

LinkedIn: https://www.linkedin.com/in/ar-akif/

---
