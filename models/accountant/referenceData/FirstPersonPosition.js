const mongoose = require('mongoose');

const FirstPersonPosition = new mongoose.Schema({
  position: {
    type: String,
    required: [true, 'Введите должность'],
    unique: true
  }
});

module.exports = mongoose.model('FirstPersonPosition', FirstPersonPosition);
