# Sumptuous

A full-stack restaurant web application with a customer-facing site, an admin dashboard, and a REST API backend. Built as a portfolio project.

---

## Features

**Customer Site**
- Landing page with hero section, services, and menu
- Live menu fetched from the database with category filtering
- Online table reservation form with a date picker and 30-minute time slot chips
- Capacity check on booking — rejects if the requested time window is fully booked
- Email confirmation sent automatically on booking

**Admin Dashboard**
- Secure login with JWT authentication
- Dashboard with live stats: total products, active reservations, guests today
- Add, edit, and remove menu items (with Cloudinary image uploads)
- View, create, edit, and manage reservations with pagination
- Reservation status lifecycle: `confirmed` → `cancelled` | `no_show`
- Emails triggered on admin actions: update, cancellation
- 24-hour reminder emails sent automatically via a background cron job

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Tailwind CSS v4, Vite, react-datepicker |
| Admin | React 19, Tailwind CSS v4, Vite |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| Image Storage | Cloudinary |
| Auth | JSON Web Tokens (JWT) |
| Email | Nodemailer |
| Scheduled Jobs | node-cron |

---

## Project Structure

```
Sumptuous-by-Airmarh/
├── frontend/    # Customer-facing React app (port 5173)
├── admin/       # Admin React app (port 5174)
└── backend/     # Express REST API (port 4000)
```

Each app is independently runnable and has its own `package.json`.

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- A [Cloudinary](https://cloudinary.com/) account

### 1. Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=a_long_random_secret_string
PORT=4000

# Restaurant capacity settings
MAX_CAPACITY=40
DINING_WINDOW_MINS=120

# Email (Nodemailer — works with any SMTP provider, e.g. Gmail, Mailgun, SendGrid)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Start the server:

```bash
# Development (with hot reload)
npm run server

# Production
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

```env
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

Runs on [http://localhost:5173](http://localhost:5173)

### 3. Admin

```bash
cd admin
npm install
```

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

```env
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

Runs on [http://localhost:5174](http://localhost:5174). Log in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in the backend `.env`.

---

## API Overview

All protected routes require a `token` header (JWT returned from login).

### Auth
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/user/admin` | — | Admin login |

### Products
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/product/add` | ✓ | Add a menu item |
| GET | `/api/product/getAll` | — | Get all menu items |
| GET | `/api/product/get` | — | Get a single item |
| PUT | `/api/product/update/:id` | ✓ | Update a menu item |
| DELETE | `/api/product/remove` | ✓ | Remove a menu item |

### Reservations
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/reservation/create` | — | Create a reservation (public) |
| GET | `/api/reservation/getAll` | ✓ | List all reservations |
| GET | `/api/reservation/get/:id` | ✓ | Get a single reservation |
| PUT | `/api/reservation/update/:id` | ✓ | Update a reservation |
| DELETE | `/api/reservation/delete/:id` | ✓ | Cancel a reservation |

---

## Deployment

When deploying, set `VITE_BACKEND_URL` in the frontend and admin `.env` files to your live backend URL before running `npm run build`.
