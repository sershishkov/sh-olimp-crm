const mongoose = require('mongoose');

const PhotoWork = new mongoose.Schema({
  imageUrl: String,
  imageGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupOfImage'
  },
  description: String
});

module.exports = mongoose.model('PhotoWork', PhotoWork);
