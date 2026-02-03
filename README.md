# 📚 Mini Course Subscription Application (Black Friday Edition)

A full-stack web application where users can browse courses and subscribe to them based on whether the course is **free or paid**, with a **mock promo-based subscription flow**.

> ⚠️ **Note:** No real payments are involved. Paid courses use a mock promo code for discount as per guidelines.

---

## 🚀 Live Demo

- **Frontend (Vercel):**  
  👉 https://mini-course-subscription.vercel.app/login

- **Backend (Render):**  
  👉 https://minicoursesubscription.onrender.com

---

## 🎯 Objective

To build and host a **secure, full-stack course subscription platform** that includes:
- Authentication
- Course listing
- Free & paid subscription logic
- Promo code validation
- Cloud deployment

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- MongoDB (Atlas)
- Mongoose

### Hosting
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## 🔐 Authentication

- JWT-based authentication
- Token stored in `localStorage`
- Protected routes for authenticated users
- Simple login system with **pre-created users**

### Dummy Credentials (for evaluation)
Email: prem123@gmail.com

Password: prem123

Email: harsha@gmail.com

Password: harsha123


---

## 📄 Application Pages

### 1️⃣ Signup + Login Page
- Email
- Password
- Name (optional)
- Basic validation
- JWT stored on login
- Redirects to Home page

---

### 2️⃣ Home Page
- Displays list of **5+ courses**
- Course details:
  - Title
  - Description
  - Price (FREE / Paid)
  - Image
- Each course links to Course Detail page

---

### 3️⃣ Course Detail Page
Displays:
- Course title
- Full description
- Course image
- Price

#### Subscription Logic
- **FREE course**
  - Instant subscription
- **PAID course**
  - Promo code input required
  - Subscribe button enabled only after valid promo

🎉 **Valid Promo Code:**
BFSALE25 → 50% Discount


> Payment is fully mock-based.

---

### 4️⃣ My Courses Page
- Lists all subscribed courses
- Shows:
  - Course title
  - Image
  - Price paid
  - Subscription date

---

## 💳 Subscription Logic (Backend)

- Checks if course is FREE or PAID
- FREE → subscribed instantly
- PAID → requires valid promo code
- Promo validation:
  - Only `BFSALE25` is accepted
- Stores subscription details:
  - `userId`
  - `courseId`
  - `pricePaid`
  - `subscribedAt`

---

## 🗄️ Database Schema

### Users
id
name
email
password (hashed)


### Courses
id
title
description
price (0 = FREE)
image


### Subscriptions
id
userId
courseId
pricePaid
subscribedAt


---

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT authentication
- Protected routes (frontend & backend)
- Token validation middleware

---

## 🎨 UI & UX

- Clean, professional UI
- Tailwind CSS styling
- Responsive design
- Card-based layout
- Promo & error feedback messages

---

## ☁️ Hosting & Deployment

### Backend (Render)
- Root directory set to `backend`
- Environment variables:

MONGO_URI
JWT_SECRET


### Frontend (Vercel)
- Root directory set to `frontend`
- React Router rewrite configured
- Connected to Render backend via Axios

---

## 🛠️ Local Setup Instructions

###  Clone the repository
```bash
git clone https://github.com/Prem5326/MiniCourseSubscription.git
cd MiniCourseSubscription

1️⃣ Backend Setup
cd backend
npm install
npm run dev


Create .env file:

MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

