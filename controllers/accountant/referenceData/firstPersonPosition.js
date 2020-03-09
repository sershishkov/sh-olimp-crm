const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const FirstPersonPosition = require('../../../models/accountant/referenceData/FirstPersonPosition');

//@desc   Add a PersonPosition
//@route  POST /api/v1/accountant/personposition
//@access Private
exports.addFirstPersonPosition = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { position, positionRoditPadej } = req.body;
  const newPersonPosition = new FirstPersonPosition({
    position,
    positionRoditPadej
  });

  await newPersonPosition.save();

  res.status(200).json({
    success: true,
    data: newPersonPosition
  });
});

//@desc   Update a PersonPosition
//@route  PUT /api/v1/accountant/personposition/:id
//@access Private
exports.updateFirstPersonPosition = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newPersonPosition = {
    position: req.body.position,
    positionRoditPadej: req.body.positionRoditPadej
  };

  const updatedPersonPosition = await FirstPersonPosition.findByIdAndUpdate(
    req.params.id,
    newPersonPosition,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedPersonPosition
  });
});

//@desc   Get all PersonPositions
//@route  GET /api/v1/accountant/personposition
//@access Private
exports.getAllFirstPersonPositions = asyncHandler(async (req, res, next) => {
  const allPersonPositions = await FirstPersonPosition.find().sort({
    position: 1
  });
  //Check if  exists response
  if (!allPersonPositions) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allPersonPositions
  });
});

//@desc   Get one PersonPosition
//@route  GET /api/v1/accountant/personposition/:id
//@access Private
exports.getOneFirstPersonPosition = asyncHandler(async (req, res, next) => {
  const onePersonPosition = await FirstPersonPosition.findById(req.params.id);
  //Check if  exists response
  if (!onePersonPosition) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: onePersonPosition
  });
});

//@desc   DELETE one PersonPosition
//@route  DELETE /api/v1/accountant/personposition/:id
//@access Private
exports.deleteFirstPersonPosition = asyncHandler(async (req, res, next) => {
  const PersonPosition = await FirstPersonPosition.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!PersonPosition) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
