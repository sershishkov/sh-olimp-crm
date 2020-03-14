const mongoose = require('mongoose');

const InvoiceProduct = new mongoose.Schema({
  invoceProductNumber: {
    type: String,
    required: [true, 'Введите номер счета'],
    unique: true
  },
  invoceProductDate: {
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

module.exports = mongoose.model('InvoiceProduct', InvoiceProduct);
