const mongoose = require('mongoose');

const Street_Schema = new mongoose.Schema({
  streetName: {
    type: String,
    required: [true, 'Введите название города'],
    unique: true
  }
});

module.exports = mongoose.model('Street', Street_Schema);
