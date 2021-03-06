const mongoose = require('mongoose');

const TypeOf_ActsOnBasisOf_Schema = new mongoose.Schema({
  actOnBasisOf: {
    type: String,
    required: [true, 'Введите основание действия руководителя'],
    unique: true
  }
});

module.exports = mongoose.model(
  'TypeOf_ActsOnBasisOf',
  TypeOf_ActsOnBasisOf_Schema
);
