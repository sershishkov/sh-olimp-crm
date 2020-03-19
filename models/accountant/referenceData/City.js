const mongoose = require('mongoose');

const City = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, 'Введите название города'],
    unique: true
  }
});

module.exports = mongoose.model('City', City);
