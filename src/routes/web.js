const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.get('/user', UserController.getUserDetails);


router.get("/", (req, res) => {
  res.json({ message: "Auth Routes Working Fine" });
});

module.exports = router;
