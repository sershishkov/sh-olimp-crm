const mongoose = require('mongoose');

const Our_InvoiceProduct_Schema = new mongoose.Schema({
  invoceProductNumber: {
    type: String,
    required: [true, 'Введите номер счета'],
    unique: true
  },
  invoceProductDate: {
    type: Date,
    // required: [true, 'Введите дату счета'],
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
  'Our_InvoiceProduct',
  Our_InvoiceProduct_Schema
);
