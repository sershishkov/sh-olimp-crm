const mongoose = require('mongoose');

const CategoryGroupOfImage_Schema = new mongoose.Schema({
  categoryOf_Group: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model(
  'CategoryGroupOfImage',
  CategoryGroupOfImage_Schema
);
