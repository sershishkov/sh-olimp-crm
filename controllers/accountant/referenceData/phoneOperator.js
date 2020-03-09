const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const PhoneOperator = require('../../../models/accountant/referenceData/PhoneOperator');

//@desc   Add a PhoneOperator
//@route  POST /api/v1/accountant/phone-operator
//@access Private
exports.addPhoneOperator = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { operatorCode } = req.body;
  const newPhoneOperator = new PhoneOperator({
    operatorCode
  });

  await newPhoneOperator.save();

  res.status(200).json({
    success: true,
    data: newPhoneOperator
  });
});

//@desc   Update a PhoneOperator
//@route  PUT /api/v1/accountant/phone-operator/:id
//@access Private
exports.updatePhoneOperator = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newPhoneOperator = {
    operatorCode: req.body.operatorCode
  };

  const updatedPhoneOperator = await PhoneOperator.findByIdAndUpdate(
    req.params.id,
    newPhoneOperator,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedPhoneOperator
  });
});

//@desc   Get all PhoneOperators
//@route  GET /api/v1/accountant/phone-operator
//@access Private
exports.getAllPhoneOperators = asyncHandler(async (req, res, next) => {
  const allPhoneOperators = await PhoneOperator.find().sort({
    operatorCode: 1
  });
  //Check if  exists response
  if (!allPhoneOperators) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allPhoneOperators
  });
});

//@desc   Get one PhoneOperator
//@route  GET /api/v1/accountant/phone-operator/:id
//@access Private
exports.getOnePhoneOperator = asyncHandler(async (req, res, next) => {
  const onePhoneOperator = await PhoneOperator.findById(req.params.id);
  //Check if  exists response
  if (!onePhoneOperator) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: onePhoneOperator
  });
});

//@desc   DELETE one PhoneOperator
//@route  DELETE /api/v1/accountant/phone-operator/:id
//@access Private
exports.deletePhoneOperator = asyncHandler(async (req, res, next) => {
  const onePhoneOperator = await PhoneOperator.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!onePhoneOperator) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
