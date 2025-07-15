import { useState } from "react";
import axios from "axios";

// AddUser component allows adding a new user
function AddUser({ onUserAdded }) {
  const [name, setName] = useState(""); // Local state to store the input value for the user name

  // Function to handle adding a new user
  const handleAddUser = async () => {
    if (!name.trim()) return;

    try {
      // Send POST request to backend API to create a new user
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/addUser`, {
        name,
      });
      setName(""); // Clear the input field after successful user creation
      onUserAdded?.(); // Refresh user list
    } catch (err) {
      console.error("Error adding user", err);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Input field for entering the user name */}
      <input
        className="border px-2 py-1 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      {/* Button to trigger handleAddUser on click */}
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
