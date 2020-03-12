const mongoose = require('mongoose');

const CategoryGroupOfImage = new mongoose.Schema({
  categoryOf_Group: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('CategoryGroupOfImage', CategoryGroupOfImage);