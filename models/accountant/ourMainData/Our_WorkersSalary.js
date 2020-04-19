const mongoose = require('mongoose');

const Our_WorkersSalary_Schema = new mongoose.Schema({
  paymentNumber: {
    type: String,
    required: [true, 'Введите номер накладной'],
    unique: true
  },
  datePayment: {
    type: Date,
    required: [true, 'Введите дату прихода']
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  },
  ourFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OurFirm',
    required: [true, 'Выберите от какой фирмы выплата']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Выберите клиента']
  },
  description: {
    type: String
  },
  sum: {
    type: Number,
    required: [true, 'Введите сумму выплаты']
  },
  active: {
    type: Boolean,
    // required: true,
    default: true
  },
  cashPayment: {
    type: Boolean,
    // required: true,
    default: true
  }
});

module.exports = mongoose.model('Our_WorkersSalary', Our_WorkersSalary_Schema);
