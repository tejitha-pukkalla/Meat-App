const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailOrPhone: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  otp: String,
  otpExpires: Date,
  area: String,
  subArea: String,
  pincode: String,
});

module.exports = mongoose.model("User", userSchema);



