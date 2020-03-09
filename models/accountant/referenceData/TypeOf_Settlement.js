const mongoose = require('mongoose');

const TypeOf_Settlement = new mongoose.Schema({
  typeOf_SettlementLong: {
    type: String,
    required: [true, 'Введите полное название типа населенного пункта'],
    unique: true
  },
  typeOf_SettlementShort: {
    type: String,
    required: [true, 'Введите сокращенное название типа населенного пункта'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_Settlement', TypeOf_Settlement);
