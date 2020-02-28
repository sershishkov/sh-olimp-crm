const mongoose = require('mongoose');

const GroupOfImage = new mongoose.Schema({
  imageGroup: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('GroupOfImage', GroupOfImage);
