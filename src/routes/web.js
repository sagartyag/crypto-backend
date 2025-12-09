const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/user', UserController.getUserDetails);


router.get("/", (req, res) => {
  res.json({ message: "Auth Routes Working Fine" });
});

module.exports = router;
