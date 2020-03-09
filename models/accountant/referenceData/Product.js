const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Введите название материала'],
    unique: true
  },
  productImage: {
    type: String
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  },
  amountInPackage: {
    type: Number,
    default: 1,
    required: [true, 'Введите количество в упаковке']
  },
  price: {
    type: Number,
    required: true
  },
  suppliers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier'
    }
  ],
  ratePerUnit: {
    type: Number,
    required: [true, 'Введите норму расхода'],
    default: 1
  },
  length: {
    type: Number,
    required: [true, 'Введите длину упаковки'],
    default: 1
  },
  width: {
    type: Number,
    required: [true, 'Введите ширину упаковки'],
    default: 1
  },
  height: {
    type: Number,
    required: [true, 'Введите высоту упаковки'],
    default: 1
  },
  weight: {
    type: Number,
    required: [true, 'Введите вес упаковки'],
    default: 1
  }
});

module.exports = mongoose.model('Product', Product);
