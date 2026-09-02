# TAXI

TAXI is a full-stack ride-booking application with separate experiences for passengers and captains (drivers). Passengers can create an account, choose pickup and destination locations, view a driving route, compare vehicle fares, and move through the ride-booking screens. Captains can create an account with vehicle information, sign in, view their current location, and access the captain ride workflow.

The application is split into:

- `backend/`: Express API, MongoDB models, JWT authentication, route/fare calculation, and validation.
- `frontend/`: React 19 single-page application built with Vite, React Router, Leaflet, Tailwind CSS, and GSAP animations.

## Features

- Passenger and captain registration and login.
- Password hashing with bcrypt.
- JWT authentication stored in HTTP cookies, with bearer-token support as a fallback.
- Token blacklist on logout.
- Protected passenger and captain profiles.
- Location search and reverse geocoding through OpenStreetMap Nominatim.
- Current-location lookup using the browser Geolocation API.
- Driving routes through the public OSRM routing service.
- Route distance and duration display on a Leaflet map.
- Fare estimates for car, auto, and motorcycle/moto options.
- Passenger ride panels for vehicle selection, confirmation, driver search, and waiting states.
- Captain map and ride panels.
- Passenger ride selection state persisted in browser `localStorage`.
- Responsive interface with GSAP panel transitions.

## Prerequisites

- Node.js 18 or newer recommended.
- npm.
- A MongoDB deployment, such as MongoDB Atlas, with a usable connection string.
- A modern browser with JavaScript enabled. Browser location permissions are needed for “Use current location”.

The application also calls public Nominatim and OSRM endpoints. Their availability, rate limits, and usage policies apply.

## Installation

Install dependencies independently for both applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Configuration

Create `backend/.env` from `backend/.env.example` and set:

```env
DB_CONNECT=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
PORT=4000
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=http://localhost:5173
```

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_BASE_URL=http://localhost:4000
```

`VITE_BASE_URL` is used as the Axios base URL and must point to the running backend. `FRONTEND_URL` is used by the backend CORS configuration and must match the browser origin running Vite.

Do not commit either `.env` file. Keep database credentials and `JWT_SECRET` private.

## Running Locally

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

The backend listens on `http://localhost:4000` when using the example configuration. Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

For a production-style local run:

```bash
cd backend
npm start

cd frontend
npm run build
npm run preview
```

The backend port defaults to `3000` in code when `PORT` is not set. The example environment sets it to `4000`.


## How the Application Works

### Passenger flow

1. A passenger registers or logs in from the passenger screens.
2. The backend validates the request, checks for an existing email, hashes the password, creates a MongoDB user, signs a 24-hour JWT, and sets the `userToken` cookie.
3. On `/home`, the passenger searches for a pickup and destination. Searches require at least three characters, wait 500 ms after typing, and are rate-limited to approximately one request per 1.1 seconds.
4. Selecting both locations triggers an OSRM driving-route request. The route is drawn on the Leaflet map and its distance and duration are displayed.
5. The frontend calculates fares locally and opens the vehicle panel. Selecting a vehicle opens ride confirmation and the subsequent driver-search/waiting panels.
6. Ride selection state is saved under `taxi_ride_state` in `localStorage`, allowing route and fare selections to survive a page refresh.

### Captain flow

1. A captain registers with identity and vehicle details or logs in using existing credentials.
2. The backend creates or authenticates the captain and sets the `captainToken` cookie.
3. `/captain-home` requests the browser’s current coordinates and displays the captain dashboard, vehicle details, and ride panels.
