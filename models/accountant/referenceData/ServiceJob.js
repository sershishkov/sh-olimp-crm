const mongoose = require('mongoose');

const ServiceJob = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, 'Введите название материала'],
    unique: true
  },
  serviceImage: {
    type: String
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  }
});

module.exports = mongoose.model('ServiceJob', ServiceJob);
