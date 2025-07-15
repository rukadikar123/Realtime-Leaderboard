# Leaderboard Backend

This is the backend for the Leaderboard application, built with Node.js, Express, MongoDB, and Socket.IO. It provides RESTful APIs for managing users, claiming points, viewing claim history, and real-time leaderboard updates.

## Features

- **User Management:** Add and list users.
- **Claim Points:** Claim random points for any user.
- **Claim History:** View history of claimed points for each user.
- **Leaderboard:** Get ranked users and their points.
- **Real-time Updates:** Leaderboard updates instantly via Socket.IO.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Installation

```bash
cd Backend
npm install
```

### Running the Server

```bash
npm start
```

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/api/users`           | Get all users                  |
| POST   | `/api/addUser`         | Add a new user (`{ name }`)    |
| POST   | `/api/claim/:userId`   | Claim random points for a user |
| GET    | `/api/leaderboard`     | Get leaderboard (ranked users) |
| GET    | `/api/history/:userId` | Get claim history for a user   |

## Real-time Leaderboard

- The backend uses Socket.IO to emit `leaderboardUpdate` events to all connected clients whenever points are claimed.

## Project Structure

- `index.js` — Main server file and Socket.IO setup
- `config/MongoDb_connect.js` — MongoDB connection logic
- `Models/User.schema.js` — User model
- `Models/ClaimHistory.schema.js` — Claim history model
- `Controllers/user.controller.js` — API logic for users and claims
- `Routes/user.routes.js` — API route definitions

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- Socket.IO

## License
