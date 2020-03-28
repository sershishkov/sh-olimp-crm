const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Oblast = require('../../../models/accountant/referenceData/Oblast');

//@desc   Add a Oblast
//@route  POST /api/v1/accountant/oblast
//@access Private
exports.addOblast = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { oblastName } = req.body;
  const newOblast = new Oblast({
    oblastName
  });

  await newOblast.save();

  res.status(200).json({
    success: true,
    data: newOblast
  });
});

//@desc   Update a Oblast
//@route  PUT /api/v1/accountant/oblast/:id
//@access Private
exports.updateOblast = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOblast = {
    oblastName: req.body.oblastName
  };

  const updatedOblast = await Oblast.findByIdAndUpdate(
    req.params.id,
    newOblast,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOblast
  });
});

//@desc   Get all Oblasts
//@route  GET /api/v1/accountant/oblast
//@access Private
exports.getAllOblasts = asyncHandler(async (req, res, next) => {
  const allOblasts = await Oblast.find().sort({
    oblastName: 1
  });
  //Check if  exists response
  if (!allOblasts) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOblasts
  });
});

//@desc   Get one Oblast
//@route  GET /api/v1/accountant/oblast/:id
//@access Private
exports.getOneOblast = asyncHandler(async (req, res, next) => {
  const oneOblast = await Oblast.findById(req.params.id);
  //Check if  exists response
  if (!oneOblast) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOblast
  });
});

//@desc   DELETE one Oblast
//@route  DELETE /api/v1/accountant/oblast/:id
//@access Private
exports.deleteOblast = asyncHandler(async (req, res, next) => {
  const oneOblast = await Oblast.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneOblast) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
