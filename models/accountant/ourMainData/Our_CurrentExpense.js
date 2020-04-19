const mongoose = require('mongoose');

const Our_CurrentExpense_Schema = new mongoose.Schema({
  expenseNumber: {
    type: String,
    required: [true, 'Введите номер документа'],
    unique: true
  },
  dateExpense: {
    type: Date,
    required: [true, 'Введите дату расхода']
  },
  ourFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OurFirm',
    required: [true, 'Выберите фирму Исполнителя']
  },
  expenseDescription: {
    type: String
  },
  typeOf_Expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_Expense',
    required: [true, 'Введите тип расходов']
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  },
  sum: {
    type: Number,
    required: [true, 'Введите сумму выплаты']
  },
  active: {
    type: Boolean,
    // required: true,
    default: true
  },
  cashPayment: {
    type: Boolean,
    // required: true,
    default: true
  }
});

module.exports = mongoose.model(
  'Our_CurrentExpense',
  Our_CurrentExpense_Schema
);
