const path = require('path');
const UserKyc = require('../models/leadkyc');
const Users = require('../models/users');

async function userKycController(req, res) {
    try {
        const userId  = req.userId;

        // Validate user existence
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get relative file paths for frontend access
        const pancardpdf = req.files['pancardpdf'] ? `../../frontend/public/uploads/${req.files['pancardpdf'][0].filename}` : null;
        const adharcardpdf = req.files['adharcardpdf'] ? `../../frontend/public/uploads/${req.files['adharcardpdf'][0].filename}` : null;
        const bankdocumentpdf = req.files['bankdocumentpdf'] ? `../../frontend/public/uploads/${req.files['bankdocumentpdf'][0].filename}` : null;
        const gstCertificatepdf = req.files['gstCertificatepdf'] ? `../../frontend/public/uploads/${req.files['gstCertificatepdf'][0].filename}` : "";

        if (!pancardpdf || !adharcardpdf || !bankdocumentpdf) {
            return res.status(400).json({ message: "All required PDFs must be uploaded" });
        }

        // Check if KYC exists and update or create new record
        let userKyc = await UserKyc.findOne({ userId });

        if (userKyc) {
            userKyc.pancardpdf = pancardpdf;
            userKyc.adharcardpdf = adharcardpdf;
            userKyc.bankdocumentpdf = bankdocumentpdf;
            if (gstCertificatepdf) userKyc.gstCertificatepdf = gstCertificatepdf;
            await userKyc.save();
        } else {
            userKyc = await UserKyc.create({
                userId,
                pancardpdf,
                adharcardpdf,
                bankdocumentpdf,
                gstCertificatepdf
            });
        }

        return res.status(200).json({ message: "KYC documents uploaded successfully", data: userKyc });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = userKycController;
