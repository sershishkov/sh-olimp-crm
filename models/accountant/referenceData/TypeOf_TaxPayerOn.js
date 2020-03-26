const mongoose = require('mongoose');

const TypeOf_TaxPayerOn_Schema = new mongoose.Schema({
  typeOf_TaxPayerOn: {
    type: String,
    required: [true, 'Введите основание налогооблажения'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_TaxPayerOn', TypeOf_TaxPayerOn_Schema);
