const mongoose = require('mongoose');

const BankName = new mongoose.Schema({
  bankName: {
    type: String,
    required: [true, 'Введите название Банка'],
    unique: true
  },
  mfo: {
    type: Number,
    required: [true, 'Введите МФО Банка'],
    unique: true,
    min: 6,
    max: 6
  }
});

module.exports = mongoose.model('BankName', BankName);
