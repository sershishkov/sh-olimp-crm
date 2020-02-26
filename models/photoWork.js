const mongoose = require('mongoose');

const PhotoWork = new mongoose.Schema({
  imageUrl: String,
  typeOfImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOfImage'
  },
  description: String
});

module.exports = mongoose.model('PhotoWork', PhotoWork);
