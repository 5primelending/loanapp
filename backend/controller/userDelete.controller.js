const mongoose = require('mongoose');
const userModel = require('../models/users');

async function userDeleteController(req, res) {
   try{
    const userId = req.userId;
    const deleteduser = await userModel.findByIdAndDelete(userId);

      if (!deleteduser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json({
        message: 'Profession deleted successfully.',
        user: deleteduser,
      });
    
   }catch(error){
    res.status(500).json({ message: 'Error deleting user.', error: error.message });
   }

}

module.exports = userDeleteController;