const leadModel = require('../models/lead');

const commissionController = {
  summary: async (req, res) => {
    try {
      const { startDate, endDate, assigned_to } = req.query;

      const match = {};

      if (startDate || endDate) {
        match.createdAt = {};
        if (startDate) match.createdAt.$gte = new Date(startDate);
        if (endDate) match.createdAt.$lte = new Date(endDate);
      }

      if (assigned_to) {
        match.assigned_to = assigned_to;
      }

      const result = await leadModel.aggregate([
        { $match: match },
        {
          $group: {
            _id: "$status",
            totalCommission: { $sum: { $ifNull: ["$commission_amount", 0] } },
            count: { $sum: 1 },
          },
        },
      ]);

      // Defaults
      let total_pending_amount = 0;
      let total_approved_amount = 0;
      let pending_count = 0;
      let approved_count = 0;

      result.forEach(row => {
        const status = (row._id || "").toLowerCase();
        if (status === "pending") {
          total_pending_amount = row.totalCommission;
          pending_count = row.count;
        }
        if (status === "approved") {
          total_approved_amount = row.totalCommission;
          approved_count = row.count;
        }
      });

      return res.status(200).json({
        success: true,
        error: false,
        message: "Commission summary fetched successfully",
        data: {
          total_pending_amount,
          pending_count,
          total_approved_amount,
          approved_count,
          grand_total: total_pending_amount + total_approved_amount,
          grand_count: pending_count + approved_count,
        },
      });

    } catch (error) {
      console.error("Error in commissionController.summary:", error);
      return res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false
      });
    }
  },
};

module.exports = commissionController;
