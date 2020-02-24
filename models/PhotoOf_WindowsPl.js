const mongoose = require('mongoose');

const PhotoOf_WindowsPl = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_WindowsPl', PhotoOf_WindowsPl);
