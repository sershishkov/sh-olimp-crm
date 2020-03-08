const mongoose = require('mongoose');

const Unit = new mongoose.Schema({
  unitNameLong: {
    type: String,
    required: [true, 'Введите полное название единицы измерения'],
    unique: true
  },
  unitNameShort: {
    type: String,
    required: [true, 'Введите сокращенное название единицы измерения'],
    unique: true
  },
  unitType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Unit'
  }
});

module.exports = mongoose.model('Unit', Unit);
