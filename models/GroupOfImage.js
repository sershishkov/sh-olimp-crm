const mongoose = require('mongoose');

const GroupOfImage = new mongoose.Schema({
  imageGroup: {
    type: String,
    required: true,
    unique: true
  },
  descriptions: [String]
});

module.exports = mongoose.model('GroupOfImage', GroupOfImage);
