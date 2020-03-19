const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Street = require('../../../models/accountant/referenceData/Street');

//@desc   Add a Street
//@route  POST /api/v1/accountant/street
//@access Private
exports.addStreet = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { streetName } = req.body;
  const newStreet = new Street({
    streetName
  });

  await newStreet.save();

  res.status(200).json({
    success: true,
    data: newStreet
  });
});

//@desc   Update a Street
//@route  PUT /api/v1/accountant/street/:id
//@access Private
exports.updateStreet = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newStreet = {
    streetName: req.body.streetName
  };

  const updatedStreet = await Street.findByIdAndUpdate(
    req.params.id,
    newStreet,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedStreet
  });
});

//@desc   Get all Streets
//@route  GET /api/v1/accountant/street
//@access Private
exports.getAllStreets = asyncHandler(async (req, res, next) => {
  const allStreets = await Street.find().sort({
    streetName: 1
  });
  //Check if  exists response
  if (!allStreets) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allStreets
  });
});

//@desc   Get one Street
//@route  GET /api/v1/accountant/street/:id
//@access Private
exports.getOneStreet = asyncHandler(async (req, res, next) => {
  const oneStreet = await Street.findById(req.params.id);
  //Check if  exists response
  if (!oneStreet) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneStreet
  });
});

//@desc   DELETE one Street
//@route  DELETE /api/v1/accountant/street/:id
//@access Private
exports.deleteStreet = asyncHandler(async (req, res, next) => {
  const oneStreet = await Street.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneStreet) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
