const { default: mongoose } = require('mongoose');
const ProfessionModel = require('../models/profession');

const professionController = {
  // Add Profession
  addprofession: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Profession name is required.' });
      }

      const newProfession = new ProfessionModel({ name });
      const savedProfession = await newProfession.save();

      res.status(201).json({
        message: 'Profession added successfully.',
        profession: savedProfession,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error adding profession.', error: error.message });
    }
  },

  editprofession: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      console.log("Received ID:", id); // Debugging line
      console.log("Received Body:", req.body); // Debugging line
  
      if (!name) {
        return res.status(400).json({ message: 'Profession name is required.', error: true, success: false });
      }
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid profession ID.", error: true, success: false });
      }
  
      const updatedProfession = await ProfessionModel.findByIdAndUpdate(
        id,
       req.body,
        { new: true }
      );
  
      if (!updatedProfession) {
        return res.status(404).json({ message: 'Profession not found.', error: true, success: false });
      }
  
      res.status(200).json({
        message: 'Profession updated successfully.',
        success: true,
        error: false,
        profession: updatedProfession,
      });
    } catch (error) {
      console.error("Error:", error); // Debugging line
      res.status(500).json({ message: 'Error updating profession.', error: error.message, success: false });
    }
  },
  
  

  // Delete Profession
  deleteprofession: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedProfession = await ProfessionModel.findByIdAndDelete(id);

      if (!deletedProfession) {
        return res.status(404).json({ message: 'Profession not found.' });
      }

      res.status(200).json({
        message: 'Profession deleted successfully.',
        profession: deletedProfession,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting profession.', error: error.message });
    }
  },

  // List Professions
  listprofession: async (req, res) => {
    try {
      const professions = await ProfessionModel.find();

      res.status(200).json(professions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching professions.', error: error.message });
    }
  },
};

module.exports = professionController;
