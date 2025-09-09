const leadModel = require("../models/lead");

const updateLeadstatusController = {
  updateLead: async (req, res) => {
    try {
      const { id } = req.params; // lead ID from URL
      const {
        status,
        follow_up_date,
        follow_up_time,
        comments
      } = req.body;

      // Basic validation
      if (!status && !follow_up_date && !comments && !follow_up_time) {
        return res.status(400).json({
          success: false,
          message: "No fields provided to update"
        });
      }

      // Build update object
      const updateData = {};
      if (status) updateData.status = status;
      if (comments) updateData.comments = comments;

      // Handle follow_up_date & time if provided
      if (follow_up_date) {
        let dateStr = follow_up_date;
        if (follow_up_time) {
          // Combine date + time into a single Date object
          dateStr = `${follow_up_date}T${follow_up_time}`;
        }
        updateData.follow_up_date = new Date(dateStr);
      }

      // Update lead
      const updatedLead = await leadModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedLead) {
        return res.status(404).json({
          success: false,
          message: "Lead not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: updatedLead
      });
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message
      });
    }
  }
};

module.exports = updateLeadstatusController;

