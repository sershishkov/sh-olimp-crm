const mongoose = require('mongoose');

const Our_Payment = new mongoose.Schema({
  paymentNumber: {
    type: String,
    required: [true, 'Введите номер платежки'],
    unique: true
  },
  dateOf_payment: {
    type: Date,
    required: [true, 'Введите дату прихода']
    // default: Date.now
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Необходимо выбрать клиента']
  },
  ourFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OurFirm',
    required: [true, 'Необходимо выбрать нашу фирму']
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

module.exports = mongoose.model('Our_Payment', Our_Payment);
