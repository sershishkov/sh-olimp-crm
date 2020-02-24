const mongoose = require('mongoose');

const PhotoOf_Asfalt = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_Asfalt', PhotoOf_Asfalt);
