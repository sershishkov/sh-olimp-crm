const mongoose = require('mongoose');

const Product_Schema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Введите название материала'],
    unique: true
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: [true, 'Введите единицы измерения']
  },
  productGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupOf_Product'
  },
  amountInPackage: {
    type: Number,
    default: 1,
    required: [true, 'Введите количество в упаковке']
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

module.exports = mongoose.model('Product', Product_Schema);
