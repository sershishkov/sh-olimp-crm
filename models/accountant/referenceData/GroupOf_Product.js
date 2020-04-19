const mongoose = require('mongoose');

const GroupOf_Product_Schema = new mongoose.Schema({
  productGroup: {
    type: String,
    required: [true, 'Введите группу товара'],
    unique: true
  }
});

module.exports = mongoose.model('GroupOf_Product', GroupOf_Product_Schema);
