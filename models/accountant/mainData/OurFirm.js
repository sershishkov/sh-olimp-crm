const mongoose = require('mongoose');

const OurFirm = new mongoose.Schema({
  firmName: {
    type: String,
    required: [true, 'Введите название фирмы'],
    unique: true
  },
  typeOfFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Firm',
    required: [true, 'Необходимо выбрать форму собственности ']
  },
  postCode: {
    type: Number,
    required: [true, 'Введите почтовый индекс '],
    min: 5,
    max: 5
  },
  typeOf_settlement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Settlement',
    required: [true, 'Тип нaселенного пункта? ']
  },
  city: {
    type: String,
    required: [true, 'Населенный пункт? ']
  },
  typeOf_street: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Settlement',
    required: [true, 'Тип улицы? ']
  },
  street: {
    type: String,
    required: [true, 'Улица? ']
  },
  numberOf_house: {
    type: String,
    required: [true, 'Номер дома? ']
  },
  numberOf_app: {
    type: String
  },
  EDRPOU: {
    type: Number,
    required: [true, 'Введите корректный ЄДРПОУ '],
    min: 8,
    max: 10
  },
  iban: {
    type: Number,
    required: [true, 'Введите корректный IBAN '],
    min: 27,
    max: 27
  },
  bankName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankName',
    required: [true, 'Выберите банк ']
  },
  firstPersonPosition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FirstPersonPosition',
    required: [true, 'Выберите должность ']
  },
  firstPersonSurname: {
    type: String,
    required: [true, 'Фамилия? ']
  },
  firstPersonName: {
    type: String,
    required: [true, 'Имя? ']
  },
  firstPersonMiddleName: {
    type: String,
    required: [true, 'Отчество? ']
  },
  shortName: {
    type: String,
    required: [true, 'Введите Сокращенное ФИО ']
  },
  actsOnBasisOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_ActsOnBasisOf'
  },
  issuedBy: {
    type: String
  },
  taxPayerOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_TaxPayerOn'
  },
  email: {
    type: String,
    required: [true, 'Введите email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста введите корректный email'
    ]
  },
  operatorCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhoneOperator',
    required: [true, 'Выберите код вашего оператора']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Введите номер телефона'],
    min: 7,
    max: 7
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OurFirm', OurFirm);
