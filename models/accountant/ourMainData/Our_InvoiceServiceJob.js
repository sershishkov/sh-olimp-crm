const mongoose = require('mongoose');

const InvoiceServiceJob = new mongoose.Schema({
  invoiceServiceJobNumber: {
    type: String,
    required: [true, 'Введите номер счета'],
    unique: true
  },
  invoiceServiceJobDate: {
    type: Date,
    required: [true, 'Введите дату счета'],
    default: Date.now
  },
  ourFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OurFirm',
    required: [true, 'Выберите фирму Исполнителя']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Выберите фирму Заказчика']
  },
  serviceJobs: [
    {
      serviceJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceJob',
        required: [true, 'Выберите услугу']
      },
      amount: {
        type: Number,
        required: [true, 'Введите количество']
      },
      price: {
        type: Number,
        required: [true, 'Введите цену']
      }
    }
  ]
});

module.exports = mongoose.model('InvoiceServiceJob', InvoiceServiceJob);
