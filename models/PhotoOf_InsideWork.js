const mongoose = require('mongoose');

const PhotoOf_InsideWork = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_InsideWork', PhotoOf_InsideWork);
