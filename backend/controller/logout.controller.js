async function logoutController(req, res) {
    try {
        // Clear the cookie named "token"
        res.clearCookie("token", { path: '/' }); // Specify path if necessary
        
        // Send a successful response
        res.status(200).json({
            message: "Logout successfully",
            success: true,
            error: false,
            data: []
        });
    } catch (err) {
        // Send an error response if something goes wrong
        res.status(400).json({
            message: err.message || "An error occurred during logout.",
            error: true,
            success: false
        });
    }
}
module.exports=logoutController;