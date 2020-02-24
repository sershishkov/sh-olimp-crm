const mongoose = require('mongoose');

const PhotoOf_Santeh = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_Santeh', PhotoOf_Santeh);
