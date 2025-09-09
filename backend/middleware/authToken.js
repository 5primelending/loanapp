const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // ✅ Get token from cookies or Authorization header
        let token = req.cookies?.token || req.header('Authorization');

        console.log("Token Received: ", token);

        // ✅ If token is in Authorization header, remove 'Bearer ' prefix
        if (token?.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // Get actual token
        }

        // ✅ Check if token is missing
        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        // ✅ Verify token (synchronous method inside try-catch)
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        console.log("Decoded Token:", decoded);

        // ✅ Attach user ID from token payload to request
        req.userId = decoded._id; 

        next(); // ✅ Move to next middleware
    } catch (err) {
        console.error("Auth Error:", err.message);

        return res.status(401).json({
            message: "Invalid or Expired Token",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
