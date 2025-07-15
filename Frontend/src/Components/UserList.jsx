import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";


function UserList({ users }) {
  const navigate = useNavigate();

  const handleClaim = async (userId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/claim/${userId}`);
      console.log("Claimed points:", res?.data?.points);
    } catch (err) {
      console.error("Error claiming points", err);
    }
  };

  return (
    <div className="space-y-1  ">
      <h2 className="text-xl font-bold flex items-center gap-4"><FaUsers/> Users</h2>
      {users?.map((user) => (
        <div
          key={user?._id}
          className="flex justify-between  items-center border shadow-md rounded px-3 py-2  "
        >
          <div>
            <p className="font-medium capitalize">{user?.name}</p>
            <p className="text-sm text-gray-600">Total: {user?.totalPoints} pts</p>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer transition transform duration-300 hover:scale-105"
              onClick={() => handleClaim(user?._id)}
            >
              Claim
            </button>
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded cursor-pointer transition transform duration-300 hover:scale-105"
              onClick={() => navigate(`/history/${user?._id}`)}
            >
              Claim History
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
