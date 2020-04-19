const mongoose = require('mongoose');

const FirstPersonPosition_Schema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, 'Введите должность в именительном падеже'],
    unique: true
  },
  positionRoditPadej: {
    type: String,
    required: [true, 'Введите должность в родительном падеже'],
    unique: true
  }
});

module.exports = mongoose.model(
  'FirstPersonPosition',
  FirstPersonPosition_Schema
);
