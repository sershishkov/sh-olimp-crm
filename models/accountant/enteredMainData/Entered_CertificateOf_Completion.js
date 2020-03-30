const mongoose = require('mongoose');

const Entered_CertificateOf_Completion_Schema = new mongoose.Schema({
  certificatNumber: {
    type: String,
    required: [true, 'Введите номер акта'],
    unique: true
  },
  cerificateDate: {
    type: Date
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
  'Entered_CertificateOf_Completion',
  Entered_CertificateOf_Completion_Schema
);
