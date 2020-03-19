const mongoose = require('mongoose');

const Street = new mongoose.Schema({
  streetName: {
    type: String,
    required: [true, 'Введите название города'],
    unique: true
  }
});

module.exports = mongoose.model('Street', Street);
