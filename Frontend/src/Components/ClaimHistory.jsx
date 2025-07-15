import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Component to display the claim history of a specific user
function ClaimHistory() {
  const { userId } = useParams(); // Extract userId from URL parameters
  const [history, setHistory] = useState([]); // State to hold the user's claim history data

  // Fetch claim history when component mounts or when userId changes
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/history/${userId}`)
      .then((res) => setHistory(res?.data?.claimHistory)) // Set response data to state
      .catch((err) => console.error(err)); // Log any error
  }, [userId]);

  return (
    <div className="max-w-xl p-4">
      {/* Heading */}
      <h2 className="text-xl font-bold mb-3 ">Claim History</h2>
      {/* Render list of claim history items */}
      <ul className="space-y-1">
        {history?.map((item) => (
          <li key={item?._id} className="border shadow-md p-2 rounded">
            +{item?.points} pts at {new Date(item?.claimedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClaimHistory;
