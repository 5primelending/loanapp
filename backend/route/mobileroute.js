const express = require('express');
const router = express.Router();

const userRegisterController = require('../controller/users.controller');
const loginController = require('../controller/login.controller');

const professionController = require('../controller/profession.controller');

router.post('/register',userRegisterController);
router.post('/send-otp',loginController.sendOTP);
router.post('/verify-otp',loginController.verifyOTP);

//For Profession
router.get('/allprofession',professionController.listprofession); //authToken,
module.exports = router