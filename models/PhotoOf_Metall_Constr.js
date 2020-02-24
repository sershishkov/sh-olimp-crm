const mongoose = require('mongoose');

const PhotoOf_Metall_Constr = new mongoose.Schema({
  image: String
});

module.exports = mongoose.model('PhotoOf_Metall_Constr', PhotoOf_Metall_Constr);
