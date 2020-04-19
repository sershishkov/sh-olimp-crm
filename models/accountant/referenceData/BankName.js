const mongoose = require('mongoose');

const BankName_Schema = new mongoose.Schema({
  bankName: {
    type: String,
    required: [true, 'Введите название Банка'],
    unique: true
  },
  mfo: {
    type: Number,
    required: [true, 'Введите МФО Банка'],
    unique: true,
    match: [/\b\d{6}\b/, 'Пожалуйста введите 6 цифр']
  }
});

module.exports = mongoose.model('BankName', BankName_Schema);
