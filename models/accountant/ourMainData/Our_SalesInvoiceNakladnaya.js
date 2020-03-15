const mongoose = require('mongoose');

const Our_SalesInvoiceNakladnaya = new mongoose.Schema({
  naklNumber: {
    type: String,
    required: [true, 'Введите номер накладной'],
    unique: true
  },

  naclDate: {
    type: Date,
    // required: [true, 'Введите дату накладной'],
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
  'Our_SalesInvoiceNakladnaya',
  Our_SalesInvoiceNakladnaya
);
