const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Entered_InvoiceMixed = require('../../../models/accountant/enteredMainData/Entered_InvoiceMixed');

//@desc   Add a Entered_InvoiceMixed
//@route  POST /api/v1/accountant/entered-invoice-mixed
//@access Private
exports.addEntered_InvoiceMixed = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newEntered_InvoiceMixed = new Entered_InvoiceMixed({
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    serviceJobs: req.body.serviceJobs,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newEntered_InvoiceMixed.save();

  res.status(200).json({
    success: true,
    data: newEntered_InvoiceMixed
  });
});

//@desc   Update a Entered_InvoiceMixed
//@route  PUT /api/v1/accountant/entered-invoice-mixed/:id
//@access Private
exports.updateEntered_InvoiceMixed = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newEntered_InvoiceMixed = {
    invoiceNumber: req.body.invoiceNumber,
    invoiceDate: req.body.invoiceDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    serviceJobs: req.body.serviceJobs,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  };

  const updatedEntered_InvoiceMixed = await Entered_InvoiceMixed.findByIdAndUpdate(
    req.params.id,
    newEntered_InvoiceMixed,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedEntered_InvoiceMixed
  });
});

//@desc   Get all Entered_InvoiceMixeds
//@route  GET /api/v1/accountant/entered-invoice-mixed
//@access Private
exports.getAllEntered_InvoiceMixeds = asyncHandler(async (req, res, next) => {
  const allEntered_InvoiceMixeds = await Entered_InvoiceMixed.find().sort({
    invoiceDate: -1
  });
  //Check if  exists response
  if (!allEntered_InvoiceMixeds) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allEntered_InvoiceMixeds
  });
});

//@desc   Get one Entered_InvoiceMixed
//@route  GET /api/v1/accountant/entered-invoice-mixed/:id
//@access Private
exports.getOneEntered_InvoiceMixed = asyncHandler(async (req, res, next) => {
  const oneEntered_InvoiceMixed = await Entered_InvoiceMixed.findById(
    req.params.id
  )
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' })
    .populate({ path: 'products.product', select: 'productName' })
    .populate({ path: 'serviceJobs.serviceJob', select: 'serviceName' });

  //Check if  exists response
  if (!oneEntered_InvoiceMixed) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneEntered_InvoiceMixed
  });
});

//@desc   DELETE one Entered_InvoiceMixed
//@route  DELETE /api/v1/accountant/entered-invoice-mixed/:id
//@access Private
exports.deleteEntered_InvoiceMixed = asyncHandler(async (req, res, next) => {
  const oneEntered_InvoiceMixed = await Entered_InvoiceMixed.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneEntered_InvoiceMixed) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
