const mongoose = require('mongoose');

const GroupOfImage_Schema = new mongoose.Schema({
  imageGroup: {
    type: String,
    required: true,
    unique: true
  },
  descriptions: [String],
  categoryGroupOf_image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryGroupOfImage'
  }
});

module.exports = mongoose.model('GroupOfImage', GroupOfImage_Schema);
