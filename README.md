# Jaipur Real Estate Platform

A full-stack, inquiry-based real estate platform for Jaipur with three verticals:
**Buy Property · Invest in Property · Stay / Short-Term Accommodation**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js 20 + Express 5 |
| Database | MongoDB 7 + Mongoose 8 |
| Validation | Zod |
| Auth | JWT (access + refresh) + bcrypt |
| Security | Helmet, CORS, express-rate-limit, mongo-sanitize |

---

## Project Structure

```
jaipur-realestate/
├── client/          # React + Vite + Tailwind frontend
└── server/          # Node.js + Express + MongoDB backend
```

---

## Prerequisites

- Node.js 18+
- MongoDB (local: `mongodb://localhost:27017` or MongoDB Atlas URI)

---

## Quick Start

### 1. Start the Backend

```bash
cd server
# Copy env file and configure
cp .env.example .env
# Edit .env and set your MONGODB_URI and JWT secrets

npm run dev
# Server starts on http://localhost:5000
```

### 2. Start the Frontend

```bash
cd client
npm run dev
# App starts on http://localhost:5173
```

---

## API Endpoints (Milestone 1 — Auth)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/health` | Public | Health check |
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/logout` | Auth | Logout |
| POST | `/api/auth/refresh` | Cookie | Refresh access token |
| GET | `/api/auth/me` | Auth | Get own profile |
| PATCH | `/api/auth/me` | Auth | Update profile |

---

## User Roles

| Role | Description |
|---|---|
| `buyer` | Browse and inquire about buy listings |
| `owner` | Submit properties for sale |
| `investor` | Submit investment criteria, view matches |
| `host` | Submit stay listings |
| `agent` | Manage linked listings |
| `admin` | Moderate listings, manage inquiries |
| `super_admin` | Full platform access |

---

## Milestones

- [x] **M1** — Foundation: Auth, RBAC, shared infrastructure
- [x] **M2** — Buy Property module (Models, Search, Detail, Inquiry Form, Owner Submit, Admin Review & CRM)
- [x] **M3** — Stay / Short-Term Accommodation module (Models, Calendar/Date Search, Detail, Inquiry, Host Submit, Admin Review)
- [ ] **M4** — Investment & Matching Engine module
- [ ] **M5** — Unified Admin Dashboard & Inquiry CRM
- [ ] **M6** — Seed data, testing, and polish

---

## Security Notes

- Passwords hashed with bcrypt (12 salt rounds)
- JWT access tokens expire in 15 min; refresh tokens in 7 days (HTTP-only cookie)
- All inputs validated with Zod before reaching the database
- Rate limiting: 200 requests / 15 min globally
- NoSQL injection prevention via mongo-sanitize
- Private fields (`passwordHash`, `refreshTokenHash`) never returned in API responses
