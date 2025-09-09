const leadModel = require("../models/lead");

const fetchLeadController = {
  fetchLeads: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        mobile_no,
        loan_type,
        assigned_to,
        property_city,
        start_date,
        end_date,
        search
      } = req.query;

      const query = {};

      // ✅ Build filters
      if (status) query.status = status;
      if (mobile_no) query.mobile_no = mobile_no;
      if (loan_type) query.loan_type = loan_type;
      if (assigned_to) query.assigned_to = assigned_to;
      if (property_city) query.property_city = property_city;

      // ✅ Search by name or email (case-insensitive partial match)
      if (search) {
        query.$or = [
          { first_name: { $regex: search, $options: 'i' } },
          { last_name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      // ✅ Date range filtering
      if (start_date || end_date) {
        query.created_at = {};
        if (start_date) query.created_at.$gte = new Date(start_date);
        if (end_date) query.created_at.$lte = new Date(end_date);
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);

      // ✅ Fetch leads
      const leads = await leadModel.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalLeads = await leadModel.countDocuments(query);
      const totalPages = Math.ceil(totalLeads / limit);

      res.status(200).json({
        success: true,
        data: leads,
        pagination: {
          totalLeads,
          totalPages,
          currentPage: parseInt(page),
          perPage: parseInt(limit),
        },
        message: "Filtered leads fetched successfully",
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

module.exports = fetchLeadController;
