const mongoose = require('mongoose');

const TypeOf_Settlement = new mongoose.Schema({
  typeLong: {
    type: String,
    required: [true, 'Введите полное название типа населенного пункта'],
    unique: true
  },
  typeShort: {
    type: String,
    required: [true, 'Введите сокращенное название типа населенного пункта'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_Settlement', TypeOf_Settlement);
