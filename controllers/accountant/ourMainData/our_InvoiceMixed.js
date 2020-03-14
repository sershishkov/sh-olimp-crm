const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_InvoiceMixed = require('../../../models/accountant/ourMainData/Our_InvoiceMixed');

//@desc   Add a Our_InvoiceMixed
//@route  POST /api/v1/accountant/our-invoice-mixed
//@access Private
exports.addOur_InvoiceMixed = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_InvoiceMixed = new Our_InvoiceMixed({
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    serviceJobs: req.body.serviceJobs,
    active: req.body.active
  });

  await newOur_InvoiceMixed.save();

  res.status(200).json({
    success: true,
    data: newOur_InvoiceMixed
  });
});

//@desc   Update a Our_InvoiceMixed
//@route  PUT /api/v1/accountant/our-invoice-mixed/:id
//@access Private
exports.updateOur_InvoiceMixed = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOur_InvoiceMixed = {
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    serviceJobs: req.body.serviceJobs,
    active: req.body.active
  };

  const updatedOur_InvoiceMixed = await Our_InvoiceMixed.findByIdAndUpdate(
    req.params.id,
    newOur_InvoiceMixed,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOur_InvoiceMixed
  });
});

//@desc   Get all Our_InvoiceMixeds
//@route  GET /api/v1/accountant/our-invoice-mixed
//@access Private
exports.getAllOur_InvoiceMixeds = asyncHandler(async (req, res, next) => {
  const allOur_InvoiceMixeds = await Our_InvoiceMixed.find().sort({
    invoiceDate: -1
  });
  //Check if  exists response
  if (!allOur_InvoiceMixeds) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOur_InvoiceMixeds
  });
});

//@desc   Get one Our_InvoiceMixed
//@route  GET /api/v1/accountant/our-invoice-mixed/:id
//@access Private
exports.getOneOur_InvoiceMixed = asyncHandler(async (req, res, next) => {
  const oneOur_InvoiceMixed = await Our_InvoiceMixed.findById(req.params.id)
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' })
    .populate({ path: 'products.product', select: 'productName' })
    .populate({ path: 'serviceJobs.serviceJob', select: 'serviceName' });

  //Check if  exists response
  if (!oneOur_InvoiceMixed) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOur_InvoiceMixed
  });
});

//@desc   DELETE one Our_InvoiceMixed
//@route  DELETE /api/v1/accountant/our-invoice-mixed/:id
//@access Private
exports.deleteOur_InvoiceMixed = asyncHandler(async (req, res, next) => {
  const oneOur_InvoiceMixed = await Our_InvoiceMixed.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneOur_InvoiceMixed) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
