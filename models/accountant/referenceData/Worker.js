const mongoose = require('mongoose');

const Worker_Schema = new mongoose.Schema({
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
  oblast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Oblast'
  },
  rayon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Oblast'
  },
  typeOf_settlement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Settlement'
    // required: [true, 'Тип нaселенного пункта? ']
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
    // required: [true, 'Населенный пункт? ']
  },
  typeOf_street: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Street'
    // required: [true, 'Тип улицы? ']
  },
  street: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Street'
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
  phoneNumber: {
    type: String,
    required: [true, 'Введите номер телефона']
    // match: [/\b\d{7}\b/, 'Пожалуйста введите 7 цифр']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Worker', Worker_Schema);
