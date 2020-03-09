const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const GroupOf_Product = require('../../../models/accountant/referenceData/GroupOf_Product');

//@desc   Add a GroupOf_Product
//@route  POST /api/v1/accountant/group-of-product
//@access Private
exports.addGroupOf_Product = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { productGroup } = req.body;
  const newGroupOf_Product = new GroupOf_Product({
    productGroup
  });

  await newGroupOf_Product.save();

  res.status(200).json({
    success: true,
    data: newGroupOf_Product
  });
});

//@desc   Update a GroupOf_Product
//@route  PUT /api/v1/accountant/group-of-product/:id
//@access Private
exports.updateGroupOf_Product = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newGroupOf_Product = {
    productGroup: req.body.productGroup
  };

  const updatedGroupOf_Product = await GroupOf_Product.findByIdAndUpdate(
    req.params.id,
    newGroupOf_Product,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedGroupOf_Product
  });
});

//@desc   Get all GroupOf_Products
//@route  GET /api/v1/accountant/group-of-product
//@access Private
exports.getAllGroupOf_Products = asyncHandler(async (req, res, next) => {
  const allGroupOf_Products = await GroupOf_Product.find();
  //Check if  exists response
  if (!allGroupOf_Products) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allGroupOf_Products
  });
});

//@desc   Get one GroupOf_Product
//@route  GET /api/v1/accountant/group-of-product/:id
//@access Private
exports.getOneGroupOf_Product = asyncHandler(async (req, res, next) => {
  const oneGroupOf_Product = await GroupOf_Product.findById(req.params.id);
  //Check if  exists response
  if (!oneGroupOf_Product) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneGroupOf_Product
  });
});

//@desc   DELETE one GroupOf_Product
//@route  DELETE /api/v1/accountant/group-of-product/:id
//@access Private
exports.deleteGroupOf_Product = asyncHandler(async (req, res, next) => {
  const groupOf_Product = await GroupOf_Product.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!groupOf_Product) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
