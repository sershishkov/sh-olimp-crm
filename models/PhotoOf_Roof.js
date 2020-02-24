const mongoose = require('mongoose');

const PhotoOf_Roof = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_Roof', PhotoOf_Roof);
