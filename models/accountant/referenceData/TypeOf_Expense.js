const mongoose = require('mongoose');

const TypeOf_Expense_Schema = new mongoose.Schema({
  typeOf_ExpenseName: {
    type: String,
    required: [true, 'Введите тип расходов'],
    unique: true
  }
});

module.exports = mongoose.model('TypeOf_Expense', TypeOf_Expense_Schema);
