<!-- TODO before merging to the default branch:
     resolve every <<< FILL >>> marker below (screenshots, demo credentials,
     handles, and the metrics flagged inline). They are visible when rendered. -->

# Dog Hotel Management System

> Full-stack management system for a pet-boarding business — reservations, medical records,
> billing and staff — built as a TypeScript monorepo with a strictly layered REST API.

<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black">
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white">
</p>

<!-- <<< FILL >>> Put a real screenshot or a 15-second GIF here. This is the single
     highest-leverage thing in the whole README — most reviewers decide in 10 seconds.
     Suggested: the reservation calendar with data in it.
     Save to  docs/screenshot-calendar.png  and uncomment: -->
<!-- ![Reservation calendar](docs/screenshot-calendar.png) -->

**At a glance**

| | |
|---|---|
| **What** | Operations system for a pet hotel: pets, owners, rooms, reservations, payments, staff, specialized service appointments |
| **Scope** | University software-engineering project, built solo as a monorepo |
| **Size** | 35-table PostgreSQL schema · 16 resource modules × 4 layers · ~110 REST routes · 55 React components |
| **Notable** | Strict Routes → Controllers → Services → Repositories separation; JWT over httpOnly cookies with role-based access control |

---

## Why this project is interesting

The domain is deliberately messy, and that's the point. A pet hotel has genuine relational
complexity — a pet has many owners' phone numbers, many vaccinations, many allergies; a
reservation consumes a room over a date range and may pull in several billable services. Getting
that into a normalized schema without ending up with either a god-table or forty joins per query
is the actual engineering problem.

Three decisions I'd defend in a review:

1. **Repository layer instead of queries in controllers.** Every resource has
   `routes → controller → service → repository`. Controllers only translate HTTP; services hold
   business rules (e.g. a room cannot be double-booked); repositories own SQL. It costs four files
   per resource and it's the reason adding the payments module took an afternoon.
2. **httpOnly cookies, not `localStorage`, for the JWT.** Tokens in `localStorage` are readable by
   any XSS payload on the page. httpOnly cookies are not, at the cost of having to think about
   CSRF and CORS explicitly — which I'd rather think about once than pretend doesn't exist.
3. **Validation at the edge with `express-validator`.** Every write route has a validator file, so
   handlers can assume well-formed input instead of defensively re-checking.

---

## Architecture

```
hotel-perros/                     npm workspaces monorepo
├── packages/server/              Express + TypeScript API
│   └── src/
│       ├── routes/               16 route modules — HTTP surface only
│       ├── controllers/          16 — request/response translation
│       ├── services/             16 — business rules, transactions
│       ├── repositories/         16 — SQL, the only layer touching pg
│       ├── validators/           16 — express-validator schemas per route
│       ├── middlewares/          auth (JWT), error handling, uploads
│       └── config/               db pool, env
│
├── packages/client/              React 19 + Vite + TypeScript
│   └── src/
│       ├── features/             auth · reservations · pets · admin
│       │                         (each with api/ components/ hooks/ pages/ types/)
│       ├── components/           ui · calendar · layout
│       └── services/             centralized Axios instance + interceptors
│
└── database_config/
    ├── basededatos.sql           schema — 35 tables
    └── datos.sql                 seed data
```

**Request path**

```
Browser ──HTTP──▶ route ──▶ validator ──▶ auth middleware ──▶ controller
                                                                  │
                                                                  ▼
                                          repository ◀── service (business rules)
                                               │
                                               ▼
                                         PostgreSQL
```

---

## Features

**Reservations** — interactive calendar (`react-big-calendar`), room assignment, check-in /
check-out flow, real-time availability, billing.
**Pets & owners** — full profiles, multiple phones and addresses per owner, photo and document
upload (Multer).
**Medical records** — vaccinations, dewormings, illnesses, allergies, all as proper related tables
rather than free text.
**Services** — appointments for veterinary, grooming and training, with assigned staff.
**Admin** — employees, roles, rooms, and dashboards.

---

## Run it locally

**Prerequisites:** Node.js ≥ 18 (v20 LTS recommended), PostgreSQL ≥ 12.

```bash
git clone https://github.com/AaronUgalde/hotel-perros.git
cd hotel-perros
npm install                       # installs both workspaces

# 1. Create the database and load the schema + seed data
createdb hotel_perros
psql -d hotel_perros -f database_config/basededatos.sql
psql -d hotel_perros -f database_config/datos.sql

# 2. Configure the server
cp packages/server/.env.example packages/server/.env   # <<< FILL >>> commit a .env.example
#    set DATABASE_URL, JWT_SECRET, PORT

# 3. Start both packages
npm run dev
```

Client: <http://localhost:5173> · API: <http://localhost:3000>

<!-- <<< FILL >>> Add a seeded demo login so a reviewer can get past the login screen
     in five seconds instead of creating an account:
     **Demo account:** `admin@demo.local` / `demo1234`
-->

---

## API

<!-- <<< FILL >>> Paste the real base path if it isn't /api. -->

| Resource | Routes |
|---|---|
| `auth` | login, logout, session |
| `pets`, `owners`, `phones`, `addresses` | full CRUD |
| `reservations`, `rooms`, `payments` | CRUD + availability and check-in/out |
| `services`, `service-appointments` | CRUD + scheduling |
| `vaccinations`, `dewormings`, `diseases`, `allergies`, `documents` | CRUD |
| `employees` | CRUD + role assignment |

~110 routes across 16 modules. Every write route is validated; every protected route goes through
the JWT middleware.

---

## Known gaps

I'd rather list these than have a reviewer find them:

- **No automated tests.** The layering makes services straightforward to unit-test with a stubbed
  repository; that's the first thing I'd add.
- **No migrations tool.** Schema lives in a single `.sql` file. Fine for a course project,
  wrong for anything with more than one deployment.
- **No CI.** A GitHub Actions workflow running `tsc --noEmit` plus lint on every PR is a
  half-hour of work and would catch most of what I currently catch by hand.
- **File uploads go to local disk**, which doesn't survive a container restart. Object storage
  would be the real answer.

---

## What I'd do next

1. Unit tests on the service layer, then integration tests on the API with a throwaway Postgres
   container.
2. Replace the raw `.sql` file with versioned migrations.
3. Add database-level constraints for the booking rule (currently enforced in the service layer
   only — an exclusion constraint on the room/date range would make double-booking impossible
   rather than merely unlikely).
4. Dockerize both packages with a compose file so the whole thing starts with one command.

---

## License

<!-- <<< FILL >>> This repo currently has no LICENSE file. Add one (MIT is the usual
     choice for portfolio work) — recruiters at larger companies do check, and an
     unlicensed repo is technically "all rights reserved". -->
