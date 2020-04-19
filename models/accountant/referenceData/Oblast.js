const mongoose = require('mongoose');

const Oblast_Schema = new mongoose.Schema({
  oblastName: {
    type: String,
    required: [true, 'Введите название области'],
    unique: true
  }
});

module.exports = mongoose.model('Oblast', Oblast_Schema);
