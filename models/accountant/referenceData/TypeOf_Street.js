const mongoose = require('mongoose');

const TypeOf_Street = new mongoose.Schema({
  typeLong: {
    type: String,
    required: [true, 'Введите полное название типа улицы'],
    unique: true
  },
  typeShort: {
    type: String,
    required: [true, 'Введите сокращенное название типа улицы'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_Street', TypeOf_Street);
