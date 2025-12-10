const sequelize = require('../config/connectDB');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const { User } = require("../models");  
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");


// get user details 
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated!" });
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res.status(200).json({
      id: user.id,
      username: user.username,
      name: user.name, // Assuming your model has a 'name' field
      email: user.email, // Assuming 'email' field exists in the user model
      bep20: user.usdtBep20,  // Fetching and including 'bep20' address
      trc20: user.usdtTrc20,
      sponsor: user.sponsor,
      botActivate: user.botActivate,
      bot_date: user.bot_date,
      message: "User details fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUserDetails };
