const mongoose = require('mongoose');

const PhotoOf_Elektro = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_Elektro', PhotoOf_Elektro);
