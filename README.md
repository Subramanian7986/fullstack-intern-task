# TemplateStore — Mini SaaS Template Store

A full-stack web application where users can register, browse templates, and save favorites.

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js (Vite) + TailwindCSS       |
| Backend    | Node.js + Express.js                |
| Database   | SQLite (via better-sqlite3)         |
| ORM        | Knex.js                             |
| Auth       | JWT + bcryptjs                      |
| HTTP Client| Axios                               |

## Project Structure

```
fullstack-intern-task/
├── client/          # React frontend
└── server/          # Express backend
```

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm

### Backend

```bash
cd server
npm install
npm start
```

Server runs on **http://localhost:5000**

> The database is auto-created and seeded with 6 sample templates on first run.

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

## API Endpoints

| Method | Endpoint                        | Auth     | Description              |
|--------|---------------------------------|----------|--------------------------|
| POST   | /api/auth/register              | No       | Register a new user      |
| POST   | /api/auth/login                 | No       | Login and get JWT        |
| GET    | /api/templates                  | No       | List all templates       |
| GET    | /api/templates/:id              | No       | Get template by ID       |
| GET    | /api/favorites                  | Yes      | Get user's favorites     |
| POST   | /api/favorites/:templateId      | Yes      | Add template to favorites|
| DELETE | /api/favorites/:templateId      | Yes      | Remove from favorites    |

## Features

- JWT-based authentication (register / login / logout)
- Browse all templates with search and category filter
- Favorite / unfavorite templates with instant UI feedback
- Protected `/favorites` route — redirects to login if unauthenticated
- Quick View modal for template details
- Loading skeletons, toast notifications, responsive mobile menu
- Passwords hashed with bcrypt

---

**Author:** Vsubr  
**Contact:** [your email here]
