const mongoose = require('mongoose');

const PhoneOperator = new mongoose.Schema({
  operatorCode: {
    type: String,
    required: [true, 'Введите код телефонного оператора'],
    unique: true
  }
});

module.exports = mongoose.model('PhoneOperator', PhoneOperator);
