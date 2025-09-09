const leadModel = require("../models/lead");

const leadController = {
  fetchAllLeads: async (req, res) => {
    try {
      // 🧾 Get page and limit from query params (default: page=1, limit=10)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // 🔍 Optional: search or filter logic (add if needed)
      const query = {};
      if (req.query.status) {
        query.status = req.query.status; // e.g., ?status=New Leads
      }

      // 🚀 Fetch leads with pagination
      const leads = await leadModel.find(query)
        .sort({ created_at: -1 }) // latest first
        .skip(skip)
        .limit(limit);

      // 🧮 Get total count for pagination
      const totalLeads = await leadModel.countDocuments(query);
      const totalPages = Math.ceil(totalLeads / limit);

      res.status(200).json({
        success: true,
        data: leads,
        pagination: {
          totalLeads,
          totalPages,
          currentPage: page,
          perPage: limit,
        },
        message: "Leads fetched successfully",
      });

    } catch (error) {
      console.error("Error in fetchAllLeads:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
    }
  }
};

module.exports = leadController;
