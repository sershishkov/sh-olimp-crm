const mongoose = require('mongoose');

const GroupOfImage_Schema = new mongoose.Schema({
  imageGroup: {
    type: String,
    required: true,
    unique: true
  },
  descriptions: [String]
});

module.exports = mongoose.model('GroupOfImage', GroupOfImage_Schema);
