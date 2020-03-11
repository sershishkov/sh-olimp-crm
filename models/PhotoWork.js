const mongoose = require('mongoose');

const PhotoWork = new mongoose.Schema({
  imageUrl: String,
  imageGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupOfImage'
  },
  description: String,
  categoryGroupOf_image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryGroupOfImage'
  }
});

module.exports = mongoose.model('PhotoWork', PhotoWork);
