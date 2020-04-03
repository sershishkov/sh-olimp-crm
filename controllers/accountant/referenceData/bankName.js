const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const BankName = require('../../../models/accountant/referenceData/BankName');

//@desc   Add a BankName
//@route  POST /api/v1/accountant/bankname
//@access Private
exports.addBankName = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { bankName, mfo } = req.body;
  const newBankName = new BankName({
    bankName,
    mfo
  });

  await newBankName.save();

  res.status(200).json({
    success: true,
    data: newBankName
  });
});

//@desc   Update a BankName
//@route  PUT /api/v1/accountant/bankname/:id
//@access Private
exports.updateBankName = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newBankName = {
    bankName: req.body.bankName,
    mfo: req.body.mfo
  };

  const updatedBankName = await BankName.findByIdAndUpdate(
    req.params.id,
    newBankName,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedBankName
  });
});

//@desc   Get all BankNames
//@route  GET /api/v1/accountant/bankname
//@access Private
exports.getAllBankNames = asyncHandler(async (req, res, next) => {
  const allBankNames = await BankName.find().sort({ bankName: 1 });
  //Check if  exists response
  if (!allBankNames) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allBankNames
  });
});

//@desc   Get one BankName
//@route  GET /api/v1/accountant/bankname/:id
//@access Private
exports.getOneBankName = asyncHandler(async (req, res, next) => {
  const oneBankName = await BankName.findById(req.params.id);

  console.log(oneBankName);
  //Check if  exists response
  if (!oneBankName) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneBankName
  });
});

//@desc   Get one BankName by mfo
//@route  GET /api/v1/accountant/bankname/:id
//@access Private
exports.getOneBankNameByMfo = asyncHandler(async (req, res, next) => {
  const oneBankName = await BankName.find({ mfo: req.params.mfo });
  //Check if  exists response
  if (!oneBankName) {
    return next(new ErrorResponse('Нет  объекта с данным mfo', 400));
  }

  res.status(200).json({
    success: true,
    data: oneBankName
  });
});

//@desc   DELETE one BankName
//@route  DELETE /api/v1/accountant/bankname/:id
//@access Private
exports.deleteBankName = asyncHandler(async (req, res, next) => {
  const bankName = await BankName.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!bankName) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
