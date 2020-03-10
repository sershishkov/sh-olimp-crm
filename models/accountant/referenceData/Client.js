const mongoose = require('mongoose');

const Client = new mongoose.Schema({
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
    type: String,
    required: [true, 'Введите почтовый индекс '],
    match: [/\b\d{5}\b/, 'Пожалуйста введите 5 цифр']
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
    type: String,
    required: [true, 'Введите корректный ЄДРПОУ '],
    unique: true,
    match: [/\b\d{8,10}\b/, 'Пожалуйста введите 8 или 10 цифр']
  },
  ibanOwn: {
    type: String,
    required: [true, 'Введите корректный IBAN '],
    match: [/\b\d{27}\b/, 'Пожалуйста введите 27 цифр']
  },
  ibanGazBank: {
    type: String,
    // required: [true, 'Введите корректный IBAN '],
    match: [/\b\d{27}\b/, 'Пожалуйста введите 27 цифр']
  },
  firstPersonPosition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FirstPersonPosition',
    required: [true, 'Выберите должность ']
  },
  firstPersonSurname: {
    type: String,
    required: [true, 'Впишите фамилию в именительном падеже ']
  },
  firstPersonName: {
    type: String,
    required: [true, 'Впишите имя в именительном падеже ']
  },
  firstPersonMiddleName: {
    type: String,
    required: [true, 'Впишите отчество в именительном падеже ']
  },

  firstPersonSurnameRoditelPadej: {
    type: String,
    required: [true, 'Впишите фамилию в родительном падеже ']
  },
  firstPersonNameRoditelPadej: {
    type: String,
    required: [true, 'Впишите имя в родительном падеже ']
  },
  firstPersonMiddleNameRoditelPadej: {
    type: String,
    required: [true, 'Впишите отчество в родительном падеже ']
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
    // unique: true,
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
    match: [/\b\d{7}\b/, 'Пожалуйста введите 7 цифр']
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

module.exports = mongoose.model('Client', Client);