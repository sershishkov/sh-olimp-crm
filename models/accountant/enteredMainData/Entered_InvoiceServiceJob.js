const mongoose = require('mongoose');

const Entered_InvoiceServiceJob_Schema = new mongoose.Schema({
  invoiceServiceJobNumber: {
    type: String,
    required: [true, 'Введите номер счета'],
    unique: true
  },
  invoiceServiceJobDate: {
    type: Date,
    // required: [true, 'Введите дату счета'],
    default: Date.now
  },
  ourFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OurFirm',
    required: [true, 'Выберите фирму Исполнителя']
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Выберите поставщика']
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
  ],
  purposeOf_payment: {
    type: String,
    required: [true, 'Введите назначение платежа']
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

module.exports = mongoose.model(
  'Entered_InvoiceServiceJob',
  Entered_InvoiceServiceJob_Schema
);
