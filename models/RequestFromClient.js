const mongoose = require('mongoose');

const RequestFromClient = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'напишите Ваше имя']
  },
  requestFromClient: {
    type: String,
    required: [true, 'напишите вашу заявку']
  },
  operatorCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhoneOperator'
    // required: [true, 'Выберите код вашего оператора']
  },
  phoneNumber: {
    type: String,
    // required: [true, 'Введите номер телефона'],
    match: [/\b\d{7}\b/, 'Пожалуйста введите 7 цифр']
  },
  email: {
    type: String,
    // required: [true, 'Введите email'],
    // unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста введите корректный email'
    ]
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RequestFromClient', RequestFromClient);
