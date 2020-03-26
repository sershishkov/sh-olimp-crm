const mongoose = require('mongoose');

const TypeOf_Street_Schema = new mongoose.Schema({
  typeOf_StreetLong: {
    type: String,
    required: [true, 'Введите полное название типа улицы'],
    unique: true
  },
  typeOf_StreetShort: {
    type: String,
    required: [true, 'Введите сокращенное название типа улицы'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_Street', TypeOf_Street_Schema);
