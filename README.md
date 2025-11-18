# BlogifyX – Multi-User Blogging & Commenting Platform

## 1. Project Title
**BlogifyX** – A modern, multi-user blogging platform with rich editing, comments, moderation, and role-based access.

---

## 2. Problem Statement
Modern writers and readers need a clean and distraction-free environment to publish and discuss ideas. Existing blogging platforms often feel cluttered, overly complex, or lack proper moderation tools.

**BlogifyX** solves this by providing:
- A minimal and user-friendly interface  
- Role-based access control (reader, author, editor, admin)  
- A structured blogging system with post creation, comments, and moderation  
- Scalable architecture suitable for production deployment  

---

## 3. System Architecture

### Overall Flow
**Frontend → Backend API → Database**

### Frontend
- React.js  
- React Router  
- Hosted on  **Vercel**

### Backend
- Node.js  
- Express.js  
- Hosted on **Render**

### Database
- PostgreSQL  
- Prisma ORM  
- Hosted on **Neon**

### Authentication
- JWT-based login and signup  
- Access + Refresh tokens

---

## 5. Key Features

### 🔐 Authentication & Roles
- Email-based signup & login  
- Logout functionality  
- Role-based access: **reader**, **author**, **editor**, **admin**  
- JWT authentication with refresh tokens  

### ✏️ CRUD Operations
- Create, edit, delete, publish, and unpublish posts  
- Tag & category management  
- Comment add/edit/delete functionality  
- Like/unlike posts  
- Bookmark/unbookmark posts  

### 🚦 Frontend Routing
Pages include:
- Home  
- Login / Signup  
- Post Detail  
- Author Profile  
- Tag Page & Category Page  
- Dashboard (My Posts)  

### 🖼️ Editor & Media Handling
- Full rich-text editor  
- Cover image upload  
- Auto slug generation  
- Reading time calculation  

### 💬 Comments & Moderation
- Nested comments  
- Users can edit/delete their own comments  
- Moderators can flag or hide comments  

### ☁️ Hosting
- Fully deployed frontend & backend  
- Proper use of environment variables  

---

## 6. Tech Stack

### Frontend
- React.js  
- React Router  
- CSS  

### Backend
- Node.js  
- Express.js  
- bcrypt  
- Prisma ORM  

### Database
- PostgreSQL (Neon)

### Authentication
- JWT (Access + Refresh tokens)

### Hosting
- Frontend: **Vercel** 
- Backend: **Render** 
- Database: **Neon**

---

## 7. API Overview (Sample Endpoints)

### Authentication
- `POST /api/auth/signup` — Register new user  
- `POST /api/auth/login` — Login and receive tokens  
- `POST /api/auth/refresh` — Refresh access token  

### Posts
- `GET /api/posts` — Fetch all posts (with filters)  
- `GET /api/posts/:slug` — Get a single post  
- `POST /api/posts` — Create new post (author only)  
- `PATCH /api/posts/:id` — Edit post  
- `DELETE /api/posts/:id` — Delete post (owner/admin)  

### Comments
- `GET /api/posts/:id/comments` — Get comments  
- `POST /api/posts/:id/comments` — Add comment  
- `PATCH /api/comments/:id` — Edit or soft-delete comment  

### Reactions
- `POST /api/posts/:id/react` — Like/unlike a post  
- `POST /api/posts/:id/bookmark` — Bookmark/unbookmark post  

---

## 📌 License
This project can include your preferred license (MIT, Apache, etc.).

---

## 📞 Contact
For support or collaboration, feel free to reach out!


