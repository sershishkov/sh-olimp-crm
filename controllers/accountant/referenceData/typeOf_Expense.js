const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const TypeOf_Expense = require('../../../models/accountant/referenceData/TypeOf_Expense');
const Our_CurrentExpense = require('../../../models/accountant/ourMainData/Our_CurrentExpense');

//@desc   Add a TypeOf_Expense
//@route  POST /api/v1/accountant/type-of-expense
//@access Private
exports.addTypeOf_Expense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newTypeOf_Expense = new TypeOf_Expense({
    typeOf_ExpenseName: req.body.typeOf_ExpenseName
  });

  await newTypeOf_Expense.save();

  res.status(200).json({
    success: true,
    data: newTypeOf_Expense
  });
});

//@desc   Update a TypeOf_Expense
//@route  PUT /api/v1/accountant/type-of-expense/:id
//@access Private
exports.updateTypeOf_Expense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newTypeOf_Expense = {
    typeOf_ExpenseName: req.body.typeOf_ExpenseName
  };

  const updatedTypeOf_Expense = await TypeOf_Expense.findByIdAndUpdate(
    req.params.id,
    newTypeOf_Expense,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedTypeOf_Expense
  });
});

//@desc   Get all TypeOf_Expenses
//@route  GET /api/v1/accountant/type-of-expense
//@access Private
exports.getAllTypeOf_Expenses = asyncHandler(async (req, res, next) => {
  const allTypeOf_Expenses = await TypeOf_Expense.find().sort({
    typeOf_ExpenseName: 1
  });

  //Check if  exists response
  if (!allTypeOf_Expenses) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allTypeOf_Expenses
  });
});

//@desc   Get one TypeOf_Expense
//@route  GET /api/v1/accountant/type-of-expense/:id
//@access Private
exports.getOneTypeOf_Expense = asyncHandler(async (req, res, next) => {
  const oneTypeOf_Expense = await TypeOf_Expense.findById(req.params.id);
  //Check if  exists response
  if (!oneTypeOf_Expense) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneTypeOf_Expense
  });
});

//@desc   DELETE one TypeOf_Expense
//@route  DELETE /api/v1/accountant/type-of-expense/:id
//@access Private
exports.deleteTypeOf_Expense = asyncHandler(async (req, res, next) => {
  const relatedElement = await Our_CurrentExpense.findOne(
    { typeOf_Expense: req.params.id },
    '_id'
  );

  if (relatedElement) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneTypeOf_Expense = await TypeOf_Expense.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneTypeOf_Expense) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
