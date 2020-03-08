const mongoose = require('mongoose');

const GroupOf_Product = new mongoose.Schema({
  productGroup: {
    type: String,
    required: [true, 'Введите группу товара'],
    unique: true
  }
});

module.exports = mongoose.model('GroupOf_Product', GroupOf_Product);
