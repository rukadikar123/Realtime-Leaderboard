import ClaimHistory from "../Models/ClaimHistory.schema.js";
import User from "../Models/User.schema.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "No user Found",
      });
    }
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

export const addUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    let isNameExisted = await User.findOne({ name });
    if (isNameExisted) {
      return res.status(400).json({
        success: false,
        message: "user already existed",
      });
    }

    let user = await User.create({
      name,
    });

    return res.status(200).json({
      success: true,
      message: "user added successfylly",
      user,
    });
  } catch (error) {
    console.log(`adduser error : ${error}`);

    return res.status(400).json({
      success: false,
      message: "error in addUser func",
    });
  }
};

export const claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;

    let points = Math.floor(Math.random() * 10) + 1;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.totalPoints += points;
    await user.save();

    await ClaimHistory.create({
      userId,
      points,
    });

    const io = req.app.get("io");

    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));
    io.emit("leaderboardUpdate", leaderboard);

    return res.status(200).json({
        success:true,
        points
    })
  } catch (error) {
    console.log(`claimPoints error : ${error}`);

    return res.status(400).json({
      success: false,
      message: "error in claimPoints func",
    });
  }
};

export const getLeaderBoard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    if (!users) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const leaderBoard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));

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

export const getClaimHitsory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "No userId provided",
      });
    }

    const claimHistory = await ClaimHistory.find({ userId }).sort({
      claimedAt: -1,
    });

    if (claimHistory.length === 0) {
      return res.status(400).json({
        success: false,
        message: "no claim history found",
      });
    }

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
