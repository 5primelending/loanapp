const leadModel = require('../models/lead');
const leadController = {
  add: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        mobile_no,
        email,
        loan_type,
        loan_purpose,
        refer_to_ambak,
        property_state,
        property_city,
        required_amount,
        status,              // Optional
        follow_up_date,      // Optional
        assigned_to,         // Optional
        comments,            // Optional
        source,
        documents_uploaded   // Optional
      } = req.body;

      // ✅ Required field check
      if (!first_name || !last_name || !mobile_no || !email || !loan_type || !required_amount || !property_state || !property_city || !status || !source) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
          // Convert to number safely
             const requiredAmountNum = Number(required_amount) || 0;
             const commission_amount = (requiredAmountNum * 2) / 100;
      // ✅ Create a new lead
      const newLead = new leadModel({
        first_name,
        last_name,
        mobile_no,
        email,
        loan_type,
        loan_purpose,
        refer_to_ambak,
        property_state,
        property_city,
        required_amount,
        status,
        follow_up_date,
        assigned_to,
        comments,
        source,
        commission_amount,
        documents_uploaded
      });

      const savedLead = await newLead.save();

      return res.status(201).json({
        data: { lead: savedLead },
        success: true,
        error: false,
        message: "New application added successfully!",
      });

    } catch (error) {
      console.error("Error in leadController.add:", error);
      return res.status(500).json({
        message: error.message || "Internal Server Error",
        error: true,
        success: false
      });
    }
  }
};

module.exports = leadController;

