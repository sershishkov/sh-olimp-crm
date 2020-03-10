const mongoose = require('mongoose');

const Worker = new mongoose.Schema({
  surname: {
    type: String,
    required: [true, 'Фамилия? ']
  },
  name: {
    type: String,
    required: [true, 'Имя? ']
  },
  middleName: {
    type: String,
    required: [true, 'Отчество? ']
  },
  dateOf_Birth: {
    type: Date
  },
  postCode: {
    type: String,
    // required: [true, 'Введите почтовый индекс '],
    match: [/\b\d{5}\b/, 'Пожалуйста введите 5 цифр']
  },
  typeOf_settlement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Settlement'
    // required: [true, 'Тип нaселенного пункта? ']
  },
  city: {
    type: String
    // required: [true, 'Населенный пункт? ']
  },
  typeOf_street: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Settlement'
    // required: [true, 'Тип улицы? ']
  },
  street: {
    type: String
    // required: [true, 'Улица? ']
  },
  numberOf_house: {
    type: String
    // required: [true, 'Номер дома? ']
  },
  numberOf_app: {
    type: String
    // required: [true, 'Номер квартиры? ']
  },
  individualTaxNumber: {
    type: String,
    // required: [true, 'Введите  ЄДРПОУ '],
    match: [/\b\d{10}\b/, 'Пожалуйста введите 10 цифр']
  },

  operatorCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhoneOperator',
    required: [true, 'Выберите код вашего оператора']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Введите номер телефона'],
    match: [/\b\d{7}\b/, 'Пожалуйста введите 7 цифр']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Worker', Worker);
