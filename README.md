# MAISON — Luxury Ecommerce

A full-stack luxury ecommerce application built with React + Vite (frontend) and Express.js (backend).

## Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Axios, CSS Modules
- **Backend**: Express.js, CORS
- **Fonts**: Cormorant Garant (headings), DM Sans (body) via Google Fonts

## Project Structure

```
EcommerceWeb/
├── package.json          # Root — runs both client & server concurrently
├── client/               # Vite + React frontend (port 5173)
└── server/               # Express API server (port 5000)
```

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm 9+

### Install all dependencies

```bash
npm run install:all
```

This installs dependencies for the root, client, and server packages in one command.

### Run in development mode

```bash
npm run dev
```

This starts both the Express server (port 5000) and Vite dev server (port 5173) concurrently.

- Frontend: http://localhost:5173
- API: http://localhost:5000/api

### Build for production

```bash
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/products | Get all products (supports filtering) |
| GET | /api/products/featured | Get first 4 featured products |
| GET | /api/products/:id | Get single product by ID |
| POST | /api/newsletter/subscribe | Subscribe to newsletter |

### Product query parameters

- `category` — Filter by category (Women, Men, Accessories, Footwear)
- `maxPrice` — Maximum price filter
- `sort` — Sort order: `price_asc`, `price_desc`, `newest`, `rating`
- `badge` — Filter by badge: `New`, `Sale`
- `search` — Search by name, brand, or category

## Pages

- `/` — Home page with hero, categories, featured products, promo banners, newsletter
- `/shop` — Shop page with sidebar filters, sort, grid view toggle
- `/product/:id` — Product detail with gallery, info, tabs, related products
