const mongoose = require('mongoose');

const TypeOfImage = new mongoose.Schema({
  imageType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('TypeOfImage', TypeOfImage);
