const mongoose = require('mongoose');

const PhotoOf_Fasad = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_Fasad', PhotoOf_Fasad);
