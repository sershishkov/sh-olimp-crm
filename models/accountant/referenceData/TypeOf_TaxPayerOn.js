const mongoose = require('mongoose');

const TypeOf_TaxPayerOn = new mongoose.Schema({
  typeOf_TaxPayerOn: {
    type: String,
    required: [true, 'Введите основание налогооблажения'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_TaxPayerOn', TypeOf_TaxPayerOn);
