import LeaderBoard from "./Components/LeaderBoard";
import AddUser from "./Components/AddUser";
import UserList from "./Components/UserList";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import socket from "./socket"; // Import socket instance (Socket.IO client)

function App() {
  const [users, setUsers] = useState([]); // State to hold all users
  const [leaderBoard, setLeaderBoard] = useState([]); // State to hold leaderboard data (sorted users with rank)

  // Fetch users from backend API
  const fetchUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`);
    setUsers(res?.data?.users);
  };

  // Fetch leaderboard data from backend API
  const fetchLeaderboard = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/leaderboard`
    );
    setLeaderBoard(res?.data?.leaderBoard);
  };

  // useEffect runs once on component mount
  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();

    // Listen for real-time leaderboard updates from server
    socket.on("leaderboardUpdate", (data) => {
      setLeaderBoard(data); // Update leaderboard immediately
      fetchUsers(); // Refresh users to sync points
    });

    // Cleanup listener when component unmounts
    return () => {
      socket.off("leaderboardUpdate");
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 h-screen max-w-3xl mx-auto">
      <div className="p-4">
        <LeaderBoard leaderBoard={leaderBoard} />
      </div>
      <div className="px-4">
        <AddUser
          onUserAdded={() => {
            fetchUsers();
            fetchLeaderboard();
          }}
        />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <UserList users={users} />
      </div>
      <ToastContainer/>
    </div>

  );
}

export default App;
