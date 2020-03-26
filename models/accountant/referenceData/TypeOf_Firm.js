const mongoose = require('mongoose');

const TypeOf_Firm_Schema = new mongoose.Schema({
  TypeOf_FirmLong: {
    type: String,
    required: [true, 'Введите полное название формы собственности предприятия'],
    unique: true
  },
  TypeOf_FirmShort: {
    type: String,
    required: [
      true,
      'Введите сокращенное название формы собственности предприятия'
    ],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_Firm', TypeOf_Firm_Schema);
