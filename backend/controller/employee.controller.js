const mongoose = require("mongoose");
const employeeModel = require("../models/empRegistration");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeController = {
  // Employee Registration (Signup)
  add: async (req, res) => {
    try {
      const { firstName, lastName, email, mobile, password } = req.body;

      // Validate Required Fields
      if (!firstName || !lastName || !email || !mobile || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if Email Already Exists
      const userEmp = await employeeModel.findOne({ email });
      if (userEmp) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }

      // Hash Password
      const salt = bcryptjs.genSaltSync(10);
      const hashPassword = bcryptjs.hashSync(password, salt);

      // Create New Employee
      const newEmployee = new employeeModel({
        firstName,
        lastName,
        email,
        mobile,
        password: hashPassword,
      });

      // Save to Database
      const savedEmployee = await newEmployee.save();

      res.status(201).json({
        data: savedEmployee,
        message: "Signup successful",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: "Error in Signup", error: error.message });
    }
  },

  // Employee Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if Employee Exists
      const user = await employeeModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare Passwords
      const isMatch = bcryptjs.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.TOKEN_SECRET_KEY || "your_secret_key",
        { expiresIn: "1d" }
      );

      res.status(200).json({ 
        message: "Login successful", 
        token, 
        user,
      success:true,error:false });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  // Get Employee Profile
  profile: async (req, res) => {
    try {
      const userId = req.user.id; // Assuming userId is set from authentication middleware

      const user = await employeeModel.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
  },

  // Update Employee Profile
  update: async (req, res) => {
    try {
      const { firstName, lastName, mobile } = req.body;
      const userId = req.user.id;

      const updatedUser = await employeeModel.findByIdAndUpdate(
        userId,
        { firstName, lastName, mobile },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Profile updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error: error.message });
    }
  },

  // Delete Employee Account
  deleteEmp: async (req, res) => {
    try {
      const userId = req.user.id;

      const deletedUser = await employeeModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  },

  // Logout Employee
  logout: async (req, res) => {
    try {
      res.clearCookie("token", { path: "/" });
      res.status(200).json({
        message: "Logout successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: "Error in Logout", error: error.message });
    }
  },
};

module.exports = employeeController;
