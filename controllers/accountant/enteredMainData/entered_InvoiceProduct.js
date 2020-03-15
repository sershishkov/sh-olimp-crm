const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Entered_InvoiceProduct = require('../../../models/accountant/enteredMainData/Entered_InvoiceProduct');

//@desc   Add a Entered_InvoiceProduct
//@route  POST /api/v1/accountant/entered-invoice-product
//@access Private
exports.addEntered_InvoiceProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newEntered_InvoiceProduct = new Entered_InvoiceProduct({
    invoceProductNumber: req.body.invoceProductNumber,
    invoceProductDate: req.body.invoceProductDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newEntered_InvoiceProduct.save();

  res.status(200).json({
    success: true,
    data: newEntered_InvoiceProduct
  });
});

//@desc   Update a Entered_InvoiceProduct
//@route  PUT /api/v1/accountant/entered-invoice-product/:id
//@access Private
exports.updateEntered_InvoiceProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newEntered_InvoiceProduct = {
    invoceProductNumber: req.body.invoceProductNumber,
    invoceProductDate: req.body.invoceProductDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  };

  const updatedEntered_InvoiceProduct = await Entered_InvoiceProduct.findByIdAndUpdate(
    req.params.id,
    newEntered_InvoiceProduct,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedEntered_InvoiceProduct
  });
});

//@desc   Get all Entered_InvoiceProducts
//@route  GET /api/v1/accountant/entered-invoice-product
//@access Private
exports.getAllEntered_InvoiceProducts = asyncHandler(async (req, res, next) => {
  const allEntered_InvoiceProducts = await Entered_InvoiceProduct.find().sort({
    invoceProductDate: -1
  });
  //Check if  exists response
  if (!allEntered_InvoiceProducts) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allEntered_InvoiceProducts
  });
});

//@desc   Get one Entered_InvoiceProduct
//@route  GET /api/v1/accountant/entered-invoice-product/:id
//@access Private
exports.getOneEntered_InvoiceProduct = asyncHandler(async (req, res, next) => {
  const oneEntered_InvoiceProduct = await Entered_InvoiceProduct.findById(
    req.params.id
  )
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' })
    .populate({ path: 'products.product', select: 'productName' });

  //Check if  exists response
  if (!oneEntered_InvoiceProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneEntered_InvoiceProduct
  });
});

//@desc   DELETE one Entered_InvoiceProduct
//@route  DELETE /api/v1/accountant/entered-invoice-product/:id
//@access Private
exports.deleteEntered_InvoiceProduct = asyncHandler(async (req, res, next) => {
  const oneEntered_InvoiceProduct = await Entered_InvoiceProduct.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneEntered_InvoiceProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
