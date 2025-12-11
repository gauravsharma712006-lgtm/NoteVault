# 📓 NoteVault — Secure Full-Stack Notes Application

NoteVault is a fully featured and production-ready **notes application** built with  
**Node.js, Express, MongoDB, JWT Authentication, bcrypt, and EJS**.

Users can register, log in, create notes, edit them, delete them, and view a personalized dashboard.  
The entire app is securely deployed on **AWS EC2** using **PM2**, served through an **Nginx reverse proxy**, and protected with **HTTPS**.

🔗 **Live Demo:** https://gaurav-notes.ignorelist.com/


---

## 🚀 Features

### 🔐 Authentication
- User signup & login  
- Password hashing with **bcrypt**  
- JWT-based authentication  
- HttpOnly cookie tokens  
- Route protection via `requireLogin` middleware  
- `noCache` middleware to prevent back-button access after logout  

### 📝 Notes Management
- Create notes  
- Edit existing notes  
- Delete notes  
- View individual notes  
- All notes stored per user using email mapping  
- Fully dynamic UI rendered through **EJS**  

### ⚙️ Backend Architecture
- Node.js + Express server  
- Modular models using Mongoose (`User`, `File`)  
- Clean routing structure  
- Static file serving  
- Proper async error handling  
- Secure cookie-based sessions  

### ☁️ Deployment & DevOps
- Hosted on **AWS EC2 (Ubuntu)**  
- Running on **PM2** (port 3000)  
- **Nginx reverse proxy** for routing domain → Node server  
- **HTTPS/SSL** enabled via Certbot + Let’s Encrypt  
- Log management + auto restart via PM2  
- Secure production folder structure  

---

## 🛠️ Tech Stack

**Frontend:**  
- HTML  
- CSS  
- EJS Template Engine  

**Backend:**  
- Node.js  
- Express.js  
- JWT  
- bcrypt  
- cookie-parser  

**Database:**  
- MongoDB  
- Mongoose  

**Deployment:**  
- AWS EC2  
- PM2  
- Nginx  
- HTTPS / SSL (Certbot)  
- Linux (Ubuntu)  

