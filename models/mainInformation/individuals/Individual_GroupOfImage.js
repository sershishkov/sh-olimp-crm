const mongoose = require('mongoose');

const Individual_GroupOfImage_Schema = new mongoose.Schema({
  imageGroup: {
    type: String,
    required: true,
    unique: true,
  },
  descriptions: [String],
});

module.exports = mongoose.model(
  'Individual_GroupOfImage',
  Individual_GroupOfImage_Schema
);
