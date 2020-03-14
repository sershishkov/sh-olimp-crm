const mongoose = require('mongoose');

const SalesInvoiceNakladnaya = new mongoose.Schema({
  naklNumber: {
    type: String,
    required: [true, 'Введите номер накладной'],
    unique: true
  },
  naclDate: {
    type: Date,
    required: [true, 'Введите дату накладной'],
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
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Выберите товар']
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
  'SalesInvoiceNakladnaya',
  SalesInvoiceNakladnaya
);
