const mongoose = require('mongoose');

const ServiceJob_Schema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, 'Введите название материала'],
    unique: true
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  },
  serviceJobGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GroupOf_ServiceJob'
  }
});

module.exports = mongoose.model('ServiceJob', ServiceJob_Schema);
