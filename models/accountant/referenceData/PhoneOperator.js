const mongoose = require('mongoose');

const PhoneOperator = new mongoose.Schema({
  operatorCode: {
    type: Number,
    required: [true, 'Введите код(коды) телефонного оператора'],
    unique: true
  }
});

module.exports = mongoose.model('PhoneOperator', PhoneOperator);
