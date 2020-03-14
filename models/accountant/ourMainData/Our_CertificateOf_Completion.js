const mongoose = require('mongoose');

const CertificateOf_Completion = new mongoose.Schema({
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

module.exports = mongoose.model(
  'CertificateOf_Completion',
  CertificateOf_Completion
);
