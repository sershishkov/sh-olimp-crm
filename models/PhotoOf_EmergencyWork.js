const mongoose = require('mongoose');

const PhotoOf_EmergencyWork = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_EmergencyWork', PhotoOf_EmergencyWork);
