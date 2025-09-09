const leadModel = require('../models/lead');

const commissionController = {
  summary: async (req, res) => {
    try {
      // Optional filters: date range, assigned_to, etc.
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

      // Group by status and sum commissions
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

      // Format response
      const totals = {};
      const counts = {};
      let grandTotal = 0;
      let grandCount = 0;

      result.forEach(row => {
        const status = row._id || "unknown";
        totals[status] = row.totalCommission;
        counts[status] = row.count;
        grandTotal += row.totalCommission;
        grandCount += row.count;
      });

      return res.status(200).json({
        success: true,
        error: false,
        message: "Commission summary fetched successfully",
        data: {
          totals,   // { approved: 1000, pending: 500 }
          counts,   // { approved: 5, pending: 2 }
          grandTotal,
          grandCount,
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
