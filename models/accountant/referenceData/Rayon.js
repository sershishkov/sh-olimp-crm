const mongoose = require('mongoose');

const Rayon_Schema = new mongoose.Schema({
  rayonName: {
    type: String,
    required: [true, 'Введите название района'],
    unique: true
  }
});

module.exports = mongoose.model('Rayon', Rayon_Schema);
