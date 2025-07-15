import { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");

  const handleAddUser = async () => {
    if (!name.trim()) return;

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/addUser`, { name });
      setName("");
      onUserAdded?.(); 
    } catch (err) {
      console.error("Error adding user", err);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        className="border px-2 py-1 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add User
      </button>
    </div>
  );
}

export default AddUser;
