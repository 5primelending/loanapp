const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true, // Removes extra spaces
    },
    imageUrl: {
      type: String,
      required: [true, "Provide Carousel Image"],
    },
  },
  {
    timestamps: true,
  }
);

const CarouselModel = mongoose.model('Carousel', carouselSchema);

module.exports = CarouselModel;
