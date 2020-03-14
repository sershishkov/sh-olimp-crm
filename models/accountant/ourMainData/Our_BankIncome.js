const mongoose = require('mongoose');

const Our_BankIncome = new mongoose.Schema({
  dateOf_income: {
    type: Date,
    required: [true, 'Введите дату прихода']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  ourFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OurFirm'
  },
  sum: {
    type: Number,
    required: [true, 'Введите сумму прихода']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model('Our_BankIncome', Our_BankIncome);
