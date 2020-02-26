const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const TypeOfImage = require('../models/TypeOfImage');

//@desc   Add ImageType
//@route  POST /api/v1/imagetype
//@access Private
exports.addImageType = asyncHandler(async (req, res, next) => {
  //Check if ImageType exists
  if (!req.body) {
    return next(new ErrorResponse('New ImageType does not exist', 400));
  }
  const newImageType = new TypeOfImage({
    imageType: req.body.imageType
  });

  await newImageType.save();

  res.status(200).json({
    success: true,
    data: newImageType
  });
});

//@desc   Get all ImageTypes
//@route  GET /api/v1/imagetype
//@access Private
exports.getAllImageTypes = asyncHandler(async (req, res, next) => {
  const allImageType = await TypeOfImage.find();
  //Check if ImageType exists
  if (!allImageType) {
    return next(new ErrorResponse('На данный момент нет фото в галлерее', 400));
  }

  res.status(200).json({
    success: true,
    data: allImageType
  });
});

//@desc   Get one ImageType
//@route  GET /api/v1/imagetype/:id
//@access Private
exports.getOneImageType = asyncHandler(async (req, res, next) => {
  const oneImageType = await TypeOfImage.findById(req.params.id);
  //Check if ImageType exists
  if (!oneImageType) {
    return next(new ErrorResponse('Нет этого фото в галлерее', 400));
  }

  res.status(200).json({
    success: true,
    data: oneImageType
  });
});

//@desc   DELETE one ImageType
//@route  DELETE /api/v1/imagetype/:id
//@access Private
exports.deleteImageType = asyncHandler(async (req, res, next) => {
  const oneImageType = await TypeOfImage.findByIdAndDelete(req.params.id);

  //Check if ImageType exists
  if (!oneImageType) {
    return next(new ErrorResponse('Нет этого фото в галлерее', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
