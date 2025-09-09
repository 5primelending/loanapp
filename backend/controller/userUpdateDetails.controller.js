const mongoose = require('mongoose');
const User = require('../models/users');  // Ensure correct model import
const Profession = require('../models/profession');

async function userUpdateDetailsController(req, res) {
    try {
        // Extract user ID from request params
        const userId = req.userId;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Extract update data from request body
        const updateData = req.body;

        // Update user details, ensuring { new: true } returns the updated document
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = userUpdateDetailsController;
