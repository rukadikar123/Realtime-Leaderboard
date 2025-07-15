import LeaderBoard from "./Components/LeaderBoard";
import AddUser from "./Components/AddUser";
import UserList from "./Components/UserList";
import { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";

function App() {
  const [users, setUsers] = useState([]);
  const [leaderBoard, setLeaderBoard] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`);
    setUsers(res?.data?.users);
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/leaderboard`
    );
    setLeaderBoard(res?.data?.leaderBoard);
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();

    socket.on("leaderboardUpdate", (data) => {
      setLeaderBoard(data);
      fetchUsers();
    });

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
    </div>
  );
}

export default App;
