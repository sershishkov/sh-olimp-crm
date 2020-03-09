const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Unit = require('../../../models/accountant/referenceData/Unit');

//@desc   Add a Unit
//@route  POST /api/v1/accountant/unit
//@access Private
exports.addUnit = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { unitNameLong, unitNameShort, unitType } = req.body;
  const newUnit = new Unit({
    unitNameLong,
    unitNameShort,
    unitType
  });

  await newUnit.save();

  res.status(200).json({
    success: true,
    data: newUnit
  });
});

//@desc   Update a Unit
//@route  PUT /api/v1/accountant/unit/:id
//@access Private
exports.updateUnit = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newUnit = {
    unitNameLong: req.body.unitNameLong,
    unitNameShort: req.body.unitNameShort,
    unitType: req.body.unitType
  };

  const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, newUnit, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: updatedUnit
  });
});

//@desc   Get all Units
//@route  GET /api/v1/accountant/unit
//@access Private
exports.getAllUnits = asyncHandler(async (req, res, next) => {
  const allUnits = await Unit.find()
    .populate({ path: 'unitType', select: 'typeOf_Unit' })
    .sort({
      unitType: 1,
      unitNameShort: 1
    });
  //Check if  exists response
  if (!allUnits) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allUnits
  });
});

//@desc   Get one Unit
//@route  GET /api/v1/accountant/unit/:id
//@access Private
exports.getOneUnit = asyncHandler(async (req, res, next) => {
  const oneUnit = await Unit.findById(req.params.id);
  //Check if  exists response
  if (!oneUnit) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneUnit
  });
});

//@desc   DELETE one Unit
//@route  DELETE /api/v1/accountant/unit/:id
//@access Private
exports.deleteUnit = asyncHandler(async (req, res, next) => {
  const oneUnit = await Unit.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneUnit) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
