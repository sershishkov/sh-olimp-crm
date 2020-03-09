const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const TypeOf_Settlement = require('../../../models/accountant/referenceData/TypeOf_Settlement');

//@desc   Add a TypeOf_Settlement
//@route  POST /api/v1/accountant/type-of-settlement
//@access Private
exports.addTypeOf_Settlement = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { typeOf_SettlementLong, typeOf_SettlementShort } = req.body;
  const newTypeOf_Settlement = new TypeOf_Settlement({
    typeOf_SettlementLong,
    typeOf_SettlementShort
  });

  await newTypeOf_Settlement.save();

  res.status(200).json({
    success: true,
    data: newTypeOf_Settlement
  });
});

//@desc   Update a TypeOf_Settlement
//@route  PUT /api/v1/accountant/type-of-settlement/:id
//@access Private
exports.updateTypeOf_Settlement = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newTypeOf_Settlement = {
    typeOf_SettlementLong: req.body.typeOf_SettlementLong,
    typeOf_SettlementShort: req.body.typeOf_SettlementShort
  };

  const updatedTypeOf_Settlement = await TypeOf_Settlement.findByIdAndUpdate(
    req.params.id,
    newTypeOf_Settlement,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedTypeOf_Settlement
  });
});

//@desc   Get all TypeOf_Settlements
//@route  GET /api/v1/accountant/type-of-settlement
//@access Private
exports.getAllTypeOf_Settlements = asyncHandler(async (req, res, next) => {
  const allTypeOf_Settlements = await TypeOf_Settlement.find().sort({
    typeOf_SettlementShort: 1
  });
  //Check if  exists response
  if (!allTypeOf_Settlements) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allTypeOf_Settlements
  });
});

//@desc   Get one TypeOf_Settlement
//@route  GET /api/v1/accountant/type-of-settlement/:id
//@access Private
exports.getOneTypeOf_Settlement = asyncHandler(async (req, res, next) => {
  const oneTypeOf_Settlement = await TypeOf_Settlement.findById(req.params.id);
  //Check if  exists response
  if (!oneTypeOf_Settlement) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneTypeOf_Settlement
  });
});

//@desc   DELETE one TypeOf_Settlement
//@route  DELETE /api/v1/accountant/type-of-settlement/:id
//@access Private
exports.deleteTypeOf_Settlement = asyncHandler(async (req, res, next) => {
  const oneTypeOf_Settlement = await TypeOf_Settlement.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneTypeOf_Settlement) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
