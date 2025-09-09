const mongoose = require('mongoose');
const User = require('../models/users');  // Ensure correct model import
const Profession = require('../models/profession');

async function userDetailsController(req, res) {
    try {
        // Extract user ID from request params or body
        const userId = req.userId; // Assuming the user ID is passed as a route parameter

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Fetch user details and populate profession if needed
        const user = await User.findById(userId).populate('profession'); // Assuming profession is a ref field in User schema

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = userDetailsController;

