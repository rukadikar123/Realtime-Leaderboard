import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

// UserList component receives a list of users as a prop
function UserList({ users }) {
  const navigate = useNavigate();
  // Function to handle claiming random points for a specific user
  const handleClaim = async (userId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/claim/${userId}`
      );
      console.log("Claimed points:", res?.data?.points);
      toast.success("Claimed  points!");
    } catch (err) {
      console.error("Error claiming points", err);
    }
  };

  return (
    <div className="space-y-1  ">
      {/* Heading with user icon */}
      <h2 className="text-xl font-bold flex items-center gap-4">
        <FaUsers /> Users
      </h2>
      {/* Render list of users */}
      {users?.map((user) => (
        <div
          key={user?._id}
          className="flex justify-between  items-center border shadow-md rounded px-3 py-2  "
        >
          {/* User info */}
          <div>
            <p className="font-medium capitalize">{user?.name}</p>
            <p className="text-sm text-gray-600">
              Total: {user?.totalPoints} pts
            </p>
          </div>
          {/* Action buttons */}
          <div className="flex gap-2">
            {/* Claim button to trigger point claiming for this user */}
            <button
              className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer transition transform duration-300 hover:scale-105"
              onClick={() => handleClaim(user?._id)}
            >
              Claim
            </button>
            {/* Navigate to this user's claim history page */}
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
