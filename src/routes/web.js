const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/AuthController");

router.post("/signup", signup);

// router.post("/login", login);

router.get("/", (req, res) => {
  res.json({ message: "Auth Routes Working Fine" });
});

module.exports = router;
