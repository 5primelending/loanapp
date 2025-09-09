const mongoose = require('mongoose');
const users = require('../models/users');
const Profession = require('../models/profession');

async function userRegisterController(req, res) {
  try {
    const { name, email, mobile, panno, pinno, profession } = req.body;

    if (!name || !email || !mobile || !panno || !pinno || !profession) {
      return res.status(400).json({ message: "All fields are required", message: true, success: false });
    }

    // Validate profession ID
    if (!mongoose.Types.ObjectId.isValid(profession)) {
      return res.status(400).json({ message: "Invalid profession ID", error: true, success: false });
    }

    const professionExists = await Profession.findById(profession);
    if (!professionExists) {
      return res.status(400).json({ message: "Profession not found", error: true, success: false });
    }

    // Check for existing user
    const checkuser = await users.findOne({ mobile });
    if (checkuser) {
      return res.status(400).json({ message: "Mobile number already registered", error: true, success: false });
    }

    const payload = req.body;
    const newUser = new users(payload);

    const savedUser = await newUser.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userRegisterController;
