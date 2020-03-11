const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const GroupOfImage = require('../models/GroupOfImage');

//@desc   Add a group
//@route  POST /api/v1/imagegroup
//@access Private
exports.addImageGroup = asyncHandler(async (req, res, next) => {
  //Check if group exists
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { imageGroup, descriptions, categoryGroupOf_image } = req.body;
  const newGroup = new GroupOfImage({
    imageGroup,
    descriptions: descriptions.trim().split(','),
    categoryGroupOf_image
  });

  await newGroup.save();

  res.status(200).json({
    success: true,
    data: newGroup
  });
});

//@desc   Update a group
//@route  PUT /api/v1/imagegroup/:id
//@access Private
exports.updateImageGroup = asyncHandler(async (req, res, next) => {
  //Check if group exists
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newNameOfGroup = {
    imageGroup: req.body.imageGroup,
    categoryGroupOf_image: req.body.categoryGroupOf_image,
    descriptions: req.body.descriptions.trim().split(',')
  };

  const updatedNameGroup = await GroupOfImage.findByIdAndUpdate(
    req.params.id,
    newNameOfGroup,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedNameGroup
  });
});

//@desc   Get all groups
//@route  GET /api/v1/imagegroup
//@access Private
exports.getAllImageGroups = asyncHandler(async (req, res, next) => {
  const allImageGroups = await GroupOfImage.find();
  //Check if group exists
  if (!allImageGroups) {
    return next(
      new ErrorResponse('На данный момент Нет ни одной  группы ', 400)
    );
  }

  res.status(200).json({
    success: true,
    data: allImageGroups
  });
});

//@desc   Get one group
//@route  GET /api/v1/imagegroup/:id
//@access Private
exports.getOneImageGroup = asyncHandler(async (req, res, next) => {
  const oneImageGroup = await GroupOfImage.findById(req.params.id).populate({
    path: 'categoryGroupOf_image',
    select: 'categoryOf_Group'
  });
  //Check if ImageType exists
  if (!oneImageGroup) {
    return next(new ErrorResponse('Нет этой группы фото', 400));
  }

  res.status(200).json({
    success: true,
    data: oneImageGroup
  });
});

//@desc   DELETE one group
//@route  DELETE /api/v1/imagegroup/:id
//@access Private
exports.deleteImageGroup = asyncHandler(async (req, res, next) => {
  const oneGroup = await GroupOfImage.findByIdAndDelete(req.params.id);

  //Check if group exists
  if (!oneGroup) {
    return next(new ErrorResponse('Нет этой группы фото', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
