const mongoose = require('mongoose');

const Individual_PhotoWork_Schema = new mongoose.Schema({
  imageUrl: String,
  imageGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual_GroupOfImage',
  },
  description: String,
});

module.exports = mongoose.model(
  'Individual_PhotoWork',
  Individual_PhotoWork_Schema
);
