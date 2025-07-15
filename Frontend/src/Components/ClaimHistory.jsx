import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ClaimHistory() {
  const { userId } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/history/${userId}`)
      .then((res) => setHistory(res?.data?.claimHistory))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-3">Claim History</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item?._id} className="border p-2 rounded">
            +{item?.points} pts at {new Date(item?.claimedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClaimHistory;
