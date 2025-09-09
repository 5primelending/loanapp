const UsersModel = require('../models/users');  // Adjust the path to your model
const jwt = require('jsonwebtoken');
//const twilio = require('twilio');  // For sending OTP via SMS

// Twilio setup (replace with your Twilio credentials)
//const twilioClient = new twilio('YOUR_TWILIO_SID', 'YOUR_TWILIO_AUTH_TOKEN');
//const fromNumber = 'YOUR_TWILIO_PHONE_NUMBER';  // The number from which you send OTP

// Store OTP temporarily (in a real app, use Redis or a similar cache mechanism for better scalability)
let otpStorage = {};  // { mobile: otp }

// OTP generation function
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const loginController = {

    // Step 1: Send OTP to mobile
    sendOTP: async (req, res) => {
        try {
            const { mobile } = req.body;
            if (!mobile) {
                return res.status(400).json({ error: "Mobile number is required" });
            }

            // Check if the mobile number is already registered
            const user = await UsersModel.findOne({ mobile });
            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            // Generate OTP
            const otp = generateOTP();

            // Store the OTP temporarily (for demo purposes, store it in memory)
            otpStorage[mobile] = otp;

            // Send OTP to the user's mobile using Twilio
           // await twilioClient.messages.create({
            //    body: `Your OTP for login is: ${otp}`,
            //    from: fromNumber,
            //    to: mobile
            //});

            res.status(200).json({ message: "OTP sent successfully to mobile", data:otp,error:false,success:true });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error, please try again later",error:true,success:false });
        }
    },

    // Step 2: Verify OTP and login
    verifyOTP: async (req, res) => {
        try {
            const { mobile, otp } = req.body;

            if (!mobile || !otp) {
                return res.status(400).json({ error: "Mobile number and OTP are required" });
            }

            // Check if OTP exists for the mobile number
            const storedOTP = otpStorage[mobile];

            if (!storedOTP) {
                return res.status(400).json({ error: "OTP not sent or expired" });
            }

            // Check if OTP matches
            if (storedOTP !== otp) {
                return res.status(400).json({ error: "Invalid OTP" });
            }

            // OTP is valid, clear the OTP from storage
            delete otpStorage[mobile];

            // User is authenticated successfully, you can create a JWT token for the user here
            // For simplicity, we'll return a success message with user details (excluding password)

            const user = await UsersModel.findOne({ mobile });
             
            const tokenData = {
                _id: user._id, 
                mobile: user.mobile
            };

            // Generate JWT token
            const token = jwt.sign(
                tokenData,
                process.env.TOKEN_SECRET_KEY, // Use an environment variable for security
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            const tokenOptions = {
                httpOnly: true, // Security best practice
                secure: false,  // Set to true in production (for HTTPS)
                sameSite: 'Strict'
              //  httpOnly: true,
              //  secure: process.env.NODE_ENV === 'production', // Only secure in production (HTTPS)
               // sameSite: 'Strict' // Add this for additional CSRF protection
            };



            res.cookie("token", token, tokenOptions).status(200).json({
                message: "Login successful",
                data:user,
                token,
                error:false,
                success:true
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error, please try again later",error:true,
                success:false });
        }
    }
};

module.exports = loginController;
