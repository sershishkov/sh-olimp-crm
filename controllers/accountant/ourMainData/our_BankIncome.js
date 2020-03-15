const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_BankIncome = require('../../../models/accountant/ourMainData/Our_BankIncome');

//@desc   Add a Our_BankIncome
//@route  POST /api/v1/accountant/our-bank-income
//@access Private
exports.addOur_BankIncome = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_BankIncome = new Our_BankIncome({
    bankIncomeNumber: req.body.bankIncomeNumber,
    dateOf_income: req.body.dateOf_income,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    sum: req.body.sum,
    active: req.body.active
  });

  await newOur_BankIncome.save();

  res.status(200).json({
    success: true,
    data: newOur_BankIncome
  });
});

//@desc   Update a Our_BankIncome
//@route  PUT /api/v1/accountant/our-bank-income/:id
//@access Private
exports.updateOur_BankIncome = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOur_BankIncome = {
    bankIncomeNumber: req.body.bankIncomeNumber,
    dateOf_income: req.body.dateOf_income,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    sum: req.body.sum,
    active: req.body.active
  };

  const updatedOur_BankIncome = await Our_BankIncome.findByIdAndUpdate(
    req.params.id,
    newOur_BankIncome,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOur_BankIncome
  });
});

//@desc   Get all Our_BankIncomes
//@route  GET /api/v1/accountant/our-bank-income
//@access Private
exports.getAllOur_BankIncomes = asyncHandler(async (req, res, next) => {
  const allOur_BankIncomes = await Our_BankIncome.find().sort({
    dateOf_income: -1
  });
  //Check if  exists response
  if (!allOur_BankIncomes) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOur_BankIncomes
  });
});

//@desc   Get one Our_BankIncome
//@route  GET /api/v1/accountant/our-bank-income/:id
//@access Private
exports.getOneOur_BankIncome = asyncHandler(async (req, res, next) => {
  const oneOur_BankIncome = await Our_BankIncome.findById(req.params.id)
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' });
  //Check if  exists response
  if (!oneOur_BankIncome) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOur_BankIncome
  });
});

//@desc   DELETE one Our_BankIncome
//@route  DELETE /api/v1/accountant/our-bank-income/:id
//@access Private
exports.deleteOur_BankIncome = asyncHandler(async (req, res, next) => {
  const oneOur_BankIncome = await Our_BankIncome.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneOur_BankIncome) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
