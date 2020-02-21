const mongoose = require('mongoose');

const PhotoOfWork = new mongoose.Schema({
  image:String
});

module.exports = mongoose.model('PhotoOfWork', PhotoOfWork);
