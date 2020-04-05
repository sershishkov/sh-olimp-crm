const fs = require('fs');
const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Individual_GroupOfImage = require('../../../models/mainInformation/individuals/Individual_GroupOfImage');
const Individual_PhotoWork = require('../../../models/mainInformation/individuals/Individual_PhotoWork');

//@desc   Add a group
//@route  POST /api/v1/individual-imagegroup
//@access Private
exports.addImageGroup = asyncHandler(async (req, res, next) => {
  //Check if group exists
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { imageGroup, descriptions } = req.body;
  const newGroup = new Individual_GroupOfImage({
    imageGroup,
    descriptions: descriptions.trim().split(','),
  });

  await newGroup.save();

  res.status(200).json({
    success: true,
    data: newGroup,
  });
});

//@desc   Update a group
//@route  PUT /api/v1/individual-imagegroup/:id
//@access Private
exports.updateImageGroup = asyncHandler(async (req, res, next) => {
  //Check if group exists
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newNameOfGroup = {
    imageGroup: req.body.imageGroup,
    descriptions: req.body.descriptions.trim().split(','),
  };

  const updatedNameGroup = await Individual_GroupOfImage.findByIdAndUpdate(
    req.params.id,
    newNameOfGroup,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updatedNameGroup,
  });
});

//@desc   Get all groups
//@route  GET /api/v1/individual-imagegroup
//@access Private
exports.getAllImageGroups = asyncHandler(async (req, res, next) => {
  const allImageGroups = await Individual_GroupOfImage.find();
  //Check if group exists
  if (!allImageGroups) {
    return next(
      new ErrorResponse('На данный момент Нет ни одной  группы ', 400)
    );
  }

  const newAllImageGroups = allImageGroups.map((item) => {
    return {
      _id: item._id,
      imageGroup: item.imageGroup,
      descriptions: item.descriptions.join(', '),
    };
  });

  res.status(200).json({
    success: true,
    data: newAllImageGroups,
  });
});

//@desc   Get one group
//@route  GET /api/v1/individual-imagegroup/:id
//@access Private
exports.getOneImageGroup = asyncHandler(async (req, res, next) => {
  const oneImageGroup = await Individual_GroupOfImage.findById(req.params.id);
  //Check if ImageType exists
  if (!oneImageGroup) {
    return next(new ErrorResponse('Нет этой группы фото', 400));
  }

  res.status(200).json({
    success: true,
    data: oneImageGroup,
  });
});

//@desc   DELETE one group
//@route  DELETE /api/v1/individual-imagegroup/:id
//@access Private
exports.deleteImageGroup = asyncHandler(async (req, res, next) => {
  const relatedElement = await Individual_PhotoWork.findOne(
    { imageGroup: req.params.id },
    '_id'
  );

  if (relatedElement) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneGroup = await Individual_GroupOfImage.findByIdAndDelete(
      req.params.id
    );

    //Check if group exists
    if (!oneGroup) {
      return next(new ErrorResponse('Нет этой группы фото', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
