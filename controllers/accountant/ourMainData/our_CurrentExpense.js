const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_CurrentExpense = require('../../../models/accountant/ourMainData/Our_CurrentExpense');

//@desc   Add a Our_CurrentExpense
//@route  POST /api/v1/accountant/our-current-expense
//@access Private
exports.addOur_CurrentExpense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_CurrentExpense = new Our_CurrentExpense({
    expenseNumber: req.body.expenseNumber,
    dateExpense: req.body.dateExpense,
    ourFirm: req.body.ourFirm,
    expenseDescription: req.body.expenseDescription,
    typeOf_Expense: req.body.typeOf_Expense,
    worker: req.body.worker,
    sum: req.body.sum,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newOur_CurrentExpense.save();

  res.status(200).json({
    success: true,
    data: newOur_CurrentExpense
  });
});

//@desc   Update a Our_CurrentExpense
//@route  PUT /api/v1/accountant/our-current-expense/:id
//@access Private
exports.updateOur_CurrentExpense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOur_CurrentExpense = {
    expenseNumber: req.body.expenseNumber,
    dateExpense: req.body.dateExpense,
    ourFirm: req.body.ourFirm,
    expenseDescription: req.body.expenseDescription,
    typeOf_Expense: req.body.typeOf_Expense,
    worker: req.body.worker,
    sum: req.body.sum,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  };

  const updatedOur_CurrentExpense = await Our_CurrentExpense.findByIdAndUpdate(
    req.params.id,
    newOur_CurrentExpense,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOur_CurrentExpense
  });
});

//@desc   Get all Our_CurrentExpenses
//@route  GET /api/v1/accountant/our-current-expense
//@access Private
exports.getAllOur_CurrentExpenses = asyncHandler(async (req, res, next) => {
  const allOur_CurrentExpenses = await Our_CurrentExpense.find()
    .sort({
      dateExpense: -1
    })
    .populate({ path: 'typeOf_Expense', select: 'typeOf_ExpenseName' })
    .populate({ path: 'worker', select: 'surname name middleName' })
    .populate({ path: 'ourFirm', select: 'firmName' });

  //Check if  exists response
  if (!allOur_CurrentExpenses) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOur_CurrentExpenses
  });
});

//@desc   Get one Our_CurrentExpense
//@route  GET /api/v1/accountant/our-current-expense/:id
//@access Private
exports.getOneOur_CurrentExpense = asyncHandler(async (req, res, next) => {
  const oneOur_CurrentExpense = await Our_CurrentExpense.findById(
    req.params.id
  );
  //Check if  exists response
  if (!oneOur_CurrentExpense) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOur_CurrentExpense
  });
});

//@desc   DELETE one Our_CurrentExpense
//@route  DELETE /api/v1/accountant/our-current-expense/:id
//@access Private
exports.deleteOur_CurrentExpense = asyncHandler(async (req, res, next) => {
  const oneOur_CurrentExpense = await Our_CurrentExpense.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneOur_CurrentExpense) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
