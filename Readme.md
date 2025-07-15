# Leaderboard Application

This project is a full-stack real-time leaderboard system, featuring a React frontend and a Node.js/Express/MongoDB backend. Users can be added, claim random points, and view live rankings and claim history. The application uses Socket.IO for instant leaderboard updates across all clients.

## Overview

- **Frontend:**  
  Built with React and Tailwind CSS. Displays the leaderboard, allows adding users, claiming points, and viewing claim history. Real-time updates are handled via Socket.IO.

- **Backend:**  
  Built with Node.js, Express, MongoDB, and Socket.IO. Provides RESTful APIs for user management, claiming points, viewing claim history, and emits real-time leaderboard updates.

## Directory Structure

- `Frontend/` — React app for the user interface
- `Backend/` — Express server, MongoDB models, and API logic

## Getting Started

1. **Install dependencies for both frontend and backend:**
   ```bash
   cd Backend
   npm install

   cd ../Frontend
   npm install
   ```



2. **Run the backend server:**
   ```bash
   cd Backend
   npm start
   ```

3. **Run the frontend app:**
   ```bash
   cd ../Frontend
   npm run dev
   ```

4. **Access the app:**  
   Open [https://realtime-leaderboard-frontend.onrender.com](https://realtime-leaderboard-frontend.onrender.com) in your browser.

## Main Features

- Add and list users
- Claim random points for users
- View claim history for each user
- Real-time leaderboard updates via Socket.IO

For detailed setup and API documentation, see the [Frontend README](./Frontend/README.md) and [Backend README](./Backend/Readme.md)