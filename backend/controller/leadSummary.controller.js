const leadModel = require("../models/lead");

const leadSummaryController = {
    leadSummary: async (req, res) => {
        try {
            const pipeline = [
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ];

            // ✅ Use Mongoose model instead of raw db.collection
            const summaryResults = await leadModel.aggregate(pipeline);

            // Initialize summary structure
            const summary = {
                "Follow Ups": 0,
                "Confirmation Pending": 0,
                "New Leads": 0,
                "Logged In": 0,
                "Sanctioned": 0,
                "Disbursed": 0,
                "Lost": 0
            };

            // Fill in counts based on aggregation
            summaryResults.forEach(item => {
                const key = item._id;
                if (summary.hasOwnProperty(key)) {
                    summary[key] = item.count;
                }
            });

            res.status(200).json({
                success: true,
                data: summary,
                message: "Lead summary fetched successfully"
            });

        } catch (error) {
            console.error("Error in leadSummary:", error);
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message
            });
        }
    }
};

module.exports = leadSummaryController;
