const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const CategoryGroupOfImage = require('../models/CategoryGroupOfImage');

//@desc   Add a CategoryGroupOfImage
//@route  POST /api/v1/category-imagegroup
//@access Private
exports.addCategoryGroupOfImage = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { categoryOf_Group } = req.body;
  const newCategoryGroupOfImage = new CategoryGroupOfImage({
    categoryOf_Group
  });

  await newCategoryGroupOfImage.save();

  res.status(200).json({
    success: true,
    data: newCategoryGroupOfImage
  });
});

//@desc   Update a CategoryGroupOfImage
//@route  PUT /api/v1/category-imagegroup/:id
//@access Private
exports.updateCategoryGroupOfImage = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newCategoryGroupOfImage = {
    categoryOf_Group: req.body.categoryOf_Group
  };

  const updatedCategoryGroupOfImage = await CategoryGroupOfImage.findByIdAndUpdate(
    req.params.id,
    newCategoryGroupOfImage,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedCategoryGroupOfImage
  });
});

//@desc   Get all CategoryGroupOfImages
//@route  GET /api/v1/category-imagegroup
//@access Private
exports.getAllCategoryGroupOfImages = asyncHandler(async (req, res, next) => {
  const allCategoryGroupOfImages = await CategoryGroupOfImage.find().sort({
    CategoryGroupOfImage: 1
  });
  //Check if  exists response
  if (!allCategoryGroupOfImages) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allCategoryGroupOfImages
  });
});

//@desc   Get one CategoryGroupOfImage
//@route  GET /api/v1/category-imagegroup/:id
//@access Private
exports.getOneCategoryGroupOfImage = asyncHandler(async (req, res, next) => {
  const oneCategoryGroupOfImage = await CategoryGroupOfImage.findById(
    req.params.id
  );
  //Check if  exists response
  if (!oneCategoryGroupOfImage) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneCategoryGroupOfImage
  });
});

//@desc   DELETE one CategoryGroupOfImage
//@route  DELETE /api/v1/category-imagegroup/:id
//@access Private
exports.deleteCategoryGroupOfImage = asyncHandler(async (req, res, next) => {
  const oneCategoryGroupOfImage = await CategoryGroupOfImage.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneCategoryGroupOfImage) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
