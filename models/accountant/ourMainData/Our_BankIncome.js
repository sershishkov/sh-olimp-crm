const mongoose = require('mongoose');

const Our_BankIncome_Schema = new mongoose.Schema({
  bankIncomeNumber: {
    type: String,
    required: [true, 'Введите номер накладной'],
    unique: true
  },
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
    // required: true,
    default: true
  },
  cashPayment: {
    type: Boolean,
    // required: true,
    default: false
  }
});

module.exports = mongoose.model('Our_BankIncome', Our_BankIncome_Schema);
