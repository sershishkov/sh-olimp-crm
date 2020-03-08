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
  postCode: {
    type: Number,
    // required: [true, 'Введите почтовый индекс '],
    min: 5,
    max: 5
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
    type: Number,
    // required: [true, 'Введите  ЄДРПОУ '],
    min: [10, 'Должно быть десять цифр'],
    max: [10, 'Должно быть десять цифр']
  },

  operatorCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhoneOperator',
    required: [true, 'Выберите код вашего оператора']
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Введите номер телефона'],
    min: 7,
    max: 7
  }
});

module.exports = mongoose.model('Worker', Worker);
