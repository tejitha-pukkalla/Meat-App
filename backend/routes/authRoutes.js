const express = require("express");


const { register, login, getProfile } = require("../controllers/authController.js");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);


router.get("/profile", authMiddleware, getProfile);


router.get("/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

module.exports = router;
