const express = require("express");
const router = express.Router();
const {
  requestOTP,
  verifyOTP,
  resetPassword,
  resendOTP
} = require("../controllers/forgotPasswordController");

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

module.exports = router;