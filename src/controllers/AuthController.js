const sequelize = require('../config/connectDB');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const { User } = require("../models");  
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const signup = async (req, res) => {
  try {
    const { email, phone, password, sponsor } = req.body;
    if (!password || !sponsor) {
      return res.status(400).json({
        message: " Password & Sponsor are required",
      });
    }

    if (!email && !phone) {
      return res.status(400).json({
        message: "Either Email or Phone is required",
      });
    }

    if (email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    if (phone) {
      const existingPhone = await User.findOne({ where: { phone } });
      if (existingPhone) {
        return res.status(400).json({ message: "Phone already exists" });
      }
    }

    const sponsorUser = await User.findOne({ where: { username: sponsor } });

    if (!sponsorUser) {
      return res.status(400).json({
        message: "Invalid Sponsor Username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
        const username = Math.floor(1000000 + Math.random() * 9000000);

    const newUser = await User.create({
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      sponsor: sponsorUser.id,
       username,
       PSR: password,
    });

   

    return res.status(201).json({
      message: "User Registered Successfully",
    username  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Signup Failed",
      error: error.message,
    });
  }
};

const signin = async (req, res) => {
  const emailOrPhone = req.body.email || req.body.phone || req.body.emailOrPhone;
  const password = req.body.password;

  console.log("Body Received:", req.body);
  console.log("Detected emailOrPhone:", emailOrPhone);

  // Validation
  if (!emailOrPhone) {
    return res.status(400).json({ message: "Email or Phone is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    console.log("Signin API Hit");

    // Find user by email or phone
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: emailOrPhone },
          { phone: emailOrPhone }
        ]
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        username: user.username
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { signup,signin };
