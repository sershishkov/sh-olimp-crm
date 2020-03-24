const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Product = require('../../../models/accountant/referenceData/Product');

//@desc   Add a Product
//@route  POST /api/v1/accountant/our-firm
//@access Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newProduct = new Product({
    productName: req.body.productName,
    unit: req.body.unit,
    productGroup: req.body.productGroup,
    amountInPackage: req.body.amountInPackage,
    suppliers: req.body.suppliers,
    ratePerUnit: req.body.ratePerUnit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    weight: req.body.weight
  });

  await newProduct.save();

  res.status(200).json({
    success: true,
    data: newProduct
  });
});

//@desc   Update a Product
//@route  PUT /api/v1/accountant/our-firm/:id
//@access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newProduct = {
    productName: req.body.productName,
    unit: req.body.unit,
    productGroup: req.body.productGroup,
    amountInPackage: req.body.amountInPackage,
    suppliers: req.body.suppliers,
    ratePerUnit: req.body.ratePerUnit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    weight: req.body.weight
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    newProduct,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedProduct
  });
});

//@desc   Get all Products
//@route  GET /api/v1/accountant/our-firm
//@access Private
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find()
    .sort({
      productName: 1
    })
    .populate({ path: 'unit', select: 'unitNameShort' })
    .populate({ path: 'productGroup', select: 'productGroup' })
    .populate({ path: 'suppliers', select: 'supplierName' });
  //Check if  exists response
  if (!allProducts) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allProducts
  });
});

//@desc   Get one Product
//@route  GET /api/v1/accountant/our-firm/:id
//@access Private
exports.getOneProduct = asyncHandler(async (req, res, next) => {
  const oneProduct = await Product.findById(req.params.id);
  // .populate({
  //   path: 'unit',
  //   select: 'unitNameLong unitNameShort'
  // })
  // .populate({ path: 'productGroup', select: 'productGroup' })
  // .populate({ path: 'suppliers', select: 'supplierName' });
  //Check if  exists response
  if (!oneProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneProduct
  });
});

//@desc   DELETE one Product
//@route  DELETE /api/v1/accountant/our-firm/:id
//@access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const oneProduct = await Product.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
