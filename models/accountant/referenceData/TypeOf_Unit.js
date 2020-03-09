const mongoose = require('mongoose');

const TypeOf_Unit = new mongoose.Schema({
  typeOf_Unit: {
    type: String,
    required: [true, 'Введите группу единиц измерения'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_Unit', TypeOf_Unit);
