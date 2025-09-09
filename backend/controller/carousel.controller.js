const CarouselModel = require("../models/carousel");
const fs = require("fs");
const path = require("path");
// Create a new carousel item with image upload
exports.createCarousel = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Carousel image is required" });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // Save file path

    const newCarousel = new CarouselModel({ title, imageUrl });
    await newCarousel.save();

    res.status(201).json({ message: "Carousel created successfully", data: newCarousel });
  } catch (error) {
    res.status(500).json({ message: "Error creating carousel", error: error.message });
  }
};
// Get all carousel items
exports.getCarousels = async (req, res) => {
    try {
      const carousels = await CarouselModel.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: carousels });
    } catch (error) {
      res.status(500).json({ message: "Error fetching carousels", error: error.message });
    }
  };
  
  // Get a single carousel item by ID
  exports.getCarouselById = async (req, res) => {
    try {
      const { id } = req.params;
      const carousel = await CarouselModel.findById(id);
  
      if (!carousel) {
        return res.status(404).json({ message: "Carousel not found" });
      }
  
      res.status(200).json({ success: true, data: carousel });
    } catch (error) {
      res.status(500).json({ message: "Error fetching carousel", error: error.message });
    }
  };
  
  // Update a carousel item by ID
  exports.updateCarousel = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, imageUrl } = req.body;
  
      const updatedCarousel = await CarouselModel.findByIdAndUpdate(
        id,
        { title, imageUrl },
        { new: true, runValidators: true }
      );
  
      if (!updatedCarousel) {
        return res.status(404).json({ message: "Carousel not found" });
      }
  
      res.status(200).json({ message: "Carousel updated successfully", data: updatedCarousel });
    } catch (error) {
      res.status(500).json({ message: "Error updating carousel", error: error.message });
    }
  };
  
  // Delete a carousel item by ID
  exports.deleteCarousel = async (req, res) => {
    try {
      const { id } = req.params;
      const carouselItem = await CarouselModel.findById(id);
        if (!carouselItem) {
            return res.status(404).json({ success: false, message: "Carousel item not found" });
        }

        // Get image path
        const imagePath = path.join(__dirname, "..", "uploads", path.basename(carouselItem.imageUrl));

        // Delete the image file
        fs.unlink(imagePath, (err) => {
            if (err && err.code !== "ENOENT") {
                console.error("Failed to delete image:", err);
            }
        });
      const deletedCarousel = await CarouselModel.findByIdAndDelete(id);
  
      if (!deletedCarousel) {
        return res.status(404).json({ message: "Carousel not found" });
      }
  
      res.status(200).json({ message: "Carousel deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting carousel", error: error.message });
    }
  };
