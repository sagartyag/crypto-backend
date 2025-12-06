const sequelize = require('../config/connectDB');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const { User } = require("../models");  // 👈 correct way
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, phone, password, sponsor } = req.body;
    if (!password || !sponsor) {
      return res.status(400).json({
        message: " Password & Sponsor are required",
      });
    }

    // At least email or phone
    if (!email && !phone) {
      return res.status(400).json({
        message: "Either Email or Phone is required",
      });
    }

    // Check email exists
    if (email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
console.log("jjj",email)

    // Check phone exists
    if (phone) {
      const existingPhone = await User.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone already exists" });
      }
    }

    // Check sponsor username
    const sponsorUser = await User.findOne({ where: { username: sponsor } });

    if (!sponsorUser) {
      return res.status(400).json({
        message: "Invalid Sponsor Username",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      sponsor: sponsorUser.id,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email, phone },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Signup Failed",
      error: error.message,
    });
  }
};
