const mongoose = require('mongoose');

const GroupOf_ServiceJob_Schema = new mongoose.Schema({
  serviceJobGroup: {
    type: String,
    required: [true, 'Введите группу видов работ'],
    unique: true
  }
});

module.exports = mongoose.model(
  'GroupOf_ServiceJob',
  GroupOf_ServiceJob_Schema
);
