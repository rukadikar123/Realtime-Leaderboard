# Leaderboard Frontend

This is the frontend for the Leaderboard application, built with React and Tailwind CSS. It displays a real-time leaderboard, allows users to claim points, view claim history, and add new users.

## Features

- **Leaderboard:** Shows ranked users and their points.
- **Add User:** Add new users to the leaderboard.
- **Claim Points:** Claim random points for any user.
- **Claim History:** View the history of claimed points for each user.
- **Real-time Updates:** Leaderboard updates instantly via Socket.IO.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm 

### Installation

```bash
cd Frontend
npm install
```



### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/Components/LeaderBoard.jsx` — Leaderboard UI
- `src/Components/AddUser.jsx` — Add user form
- `src/Components/UserList.jsx` — User list and claim actions
- `src/Components/ClaimHistory.jsx` — User claim history
- `src/socket.js` — Socket.IO client setup
- `src/App.jsx` — Main app logic and routing

## Technologies Used

- React
- Tailwind CSS
- Axios
- Socket.IO
- React Router