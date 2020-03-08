const mongoose = require('mongoose');

const BankIncome = new mongoose.Schema({
  dateOf_income: {
    type: Date,
    required: [true, 'Введите дату прихода']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  sum: {
    type: Number,
    required: [true, 'Введите сумму прихода']
  }
});

module.exports = mongoose.model('BankIncome', BankIncome);
