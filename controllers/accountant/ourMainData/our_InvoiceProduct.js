const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_InvoiceProduct = require('../../../models/accountant/ourMainData/Our_InvoiceProduct');

//@desc   Add a Our_InvoiceProduct
//@route  POST /api/v1/accountant/our-invoice-product
//@access Private
exports.addOur_InvoiceProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_InvoiceProduct = new Our_InvoiceProduct({
    invoceProductNumber: req.body.invoceProductNumber,
    invoceProductDate: req.body.invoceProductDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newOur_InvoiceProduct.save();

  res.status(200).json({
    success: true,
    data: newOur_InvoiceProduct
  });
});

//@desc   Update a Our_InvoiceProduct
//@route  PUT /api/v1/accountant/our-invoice-product/:id
//@access Private
exports.updateOur_InvoiceProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOur_InvoiceProduct = {
    invoceProductNumber: req.body.invoceProductNumber,
    invoceProductDate: req.body.invoceProductDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  };

  const updatedOur_InvoiceProduct = await Our_InvoiceProduct.findByIdAndUpdate(
    req.params.id,
    newOur_InvoiceProduct,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOur_InvoiceProduct
  });
});

//@desc   Get all Our_InvoiceProducts
//@route  GET /api/v1/accountant/our-invoice-product
//@access Private
exports.getAllOur_InvoiceProducts = asyncHandler(async (req, res, next) => {
  const allOur_InvoiceProducts = await Our_InvoiceProduct.find().sort({
    invoceProductDate: -1
  });
  //Check if  exists response
  if (!allOur_InvoiceProducts) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOur_InvoiceProducts
  });
});

//@desc   Get one Our_InvoiceProduct
//@route  GET /api/v1/accountant/our-invoice-product/:id
//@access Private
exports.getOneOur_InvoiceProduct = asyncHandler(async (req, res, next) => {
  const oneOur_InvoiceProduct = await Our_InvoiceProduct.findById(req.params.id)
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' })
    .populate({ path: 'products.product', select: 'productName' });

  //Check if  exists response
  if (!oneOur_InvoiceProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOur_InvoiceProduct
  });
});

//@desc   DELETE one Our_InvoiceProduct
//@route  DELETE /api/v1/accountant/our-invoice-product/:id
//@access Private
exports.deleteOur_InvoiceProduct = asyncHandler(async (req, res, next) => {
  const oneOur_InvoiceProduct = await Our_InvoiceProduct.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneOur_InvoiceProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
