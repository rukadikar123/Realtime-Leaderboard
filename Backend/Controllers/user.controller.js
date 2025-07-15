import ClaimHistory from "../Models/ClaimHistory.schema.js";
import User from "../Models/User.schema.js";

// Controller function to fetch all users from the database
export const getUsers = async (req, res) => {
  try {
    // Fetch all user documents from the User collection
    const users = await User.find();
    // If no users are found, return a 400 error response
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "No user Found",
      });
    }
    // If users are found, return them in a success response
    return res.status(200).json({
      success: true,
      message: "users Fetched Successfully",
      users,
    });
  } catch (error) {
    console.log(`getUsers error : ${error}`);
    return res.status(400).json({
      success: false,
      message: "error in getUsers func",
    });
  }
};

// Controller function to add a new user
export const addUser = async (req, res) => {
  try {
    // Extract 'name' from the request body
    const { name } = req.body;

    // Validate that the name exists and is not just whitespace
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    // Check if a user with the same name already exists in the database
    let isNameExisted = await User.findOne({ name });
    if (isNameExisted) {
      return res.status(400).json({
        success: false,
        message: "user already existed",
      });
    }

    // If name is unique, create a new user document
    let user = await User.create({
      name,
    });

    // Send success response with the newly created user
    return res.status(200).json({
      success: true,
      message: "user added successfylly",
      user,
    });
  } catch (error) {
    console.log(`adduser error : ${error}`);
    // Send a failure response in case of an error
    return res.status(400).json({
      success: false,
      message: "error in addUser func",
    });
  }
};

// Controller function to allow a user to claim random points
export const claimPoints = async (req, res) => {
  try {
    // Extract userId from URL parameters
    const { userId } = req.params;
    // Generate a random number between 1 and 10 for points
    let points = Math.floor(Math.random() * 10) + 1;

    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Add the randomly generated points to the user's totalPoints
    user.totalPoints += points;
    // Save the updated user document
    await user.save();

    // Create a new claim history entry for tracking point claims
    await ClaimHistory.create({
      userId,
      points,
    });

    // Access the Socket.IO instance from the app context
    const io = req.app.get("io");

    // Fetch all users, sorted by totalPoints in descending order
    const users = await User.find().sort({ totalPoints: -1 });
    // Generate leaderboard with rank based on sorted position
    const leaderboard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));

    // Emit updated leaderboard to all connected clients via WebSocket
    io.emit("leaderboardUpdate", leaderboard);

    // Send back success response with the points claimed
    return res.status(200).json({
      success: true,
      points,
    });
  } catch (error) {
    console.log(`claimPoints error : ${error}`);

    return res.status(400).json({
      success: false,
      message: "error in claimPoints func",
    });
  }
};

// Controller function to fetch and return the leaderboard
export const getLeaderBoard = async (req, res) => {
  try {
    // Fetch all users sorted in descending order of totalPoints
    const users = await User.find().sort({ totalPoints: -1 });
    // Check if the users array is empty or not found
    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    // Map through users to create a leaderboard array with ranks
    const leaderBoard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));

    // Send the leaderboard as a successful response
    return res.status(200).json({
      success: true,
      message: "fetched leaderBoard",
      leaderBoard,
    });
  } catch (error) {
    console.log(`getLeaderBoard error : ${error}`);

    return res.status(400).json({
      success: false,
      message: "error in getLeaderBoard func",
    });
  }
};

// Controller function to fetch the claim history for a specific user
export const getClaimHitsory = async (req, res) => {
  try {
    // Extract userId from the route parameters
    const { userId } = req.params;
    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "No userId provided",
      });
    }

    // Fetch claim history for the given userId, sorted by most recent first
    const claimHistory = await ClaimHistory.find({ userId }).sort({
      claimedAt: -1,
    });

    // If no claim history is found, return a failure response
    if (claimHistory.length === 0) {
      return res.status(400).json({
        success: false,
        message: "no claim history found",
      });
    }

    // Return the claim history with a success response
    return res.status(200).json({
      success: true,
      message: "Fetched claim history successfully.",
      claimHistory,
    });
  } catch (error) {
    console.log(`getClaimHitsory error : ${error}`);

    return res.status(400).json({
      success: false,
      message: "error in getClaimHitsory func",
    });
  }
};
