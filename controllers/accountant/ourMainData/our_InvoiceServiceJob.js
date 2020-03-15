const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_InvoiceServiceJob = require('../../../models/accountant/ourMainData/Our_InvoiceServiceJob');

//@desc   Add a Our_InvoiceServiceJob
//@route  POST /api/v1/accountant/our-invoice-service-job
//@access Private
exports.addOur_InvoiceServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_InvoiceServiceJob = new Our_InvoiceServiceJob({
    invoiceServiceJobNumber: req.body.invoiceServiceJobNumber,
    invoiceServiceJobDate: req.body.invoiceServiceJobDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    serviceJobs: req.body.serviceJobs,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newOur_InvoiceServiceJob.save();

  res.status(200).json({
    success: true,
    data: newOur_InvoiceServiceJob
  });
});

//@desc   Update a Our_InvoiceServiceJob
//@route  PUT /api/v1/accountant/our-invoice-service-job/:id
//@access Private
exports.updateOur_InvoiceServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOur_InvoiceServiceJob = {
    invoiceServiceJobNumber: req.body.invoiceServiceJobNumber,
    invoiceServiceJobDate: req.body.invoiceServiceJobDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    serviceJobs: req.body.serviceJobs,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  };

  const updatedOur_InvoiceServiceJob = await Our_InvoiceServiceJob.findByIdAndUpdate(
    req.params.id,
    newOur_InvoiceServiceJob,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOur_InvoiceServiceJob
  });
});

//@desc   Get all Our_InvoiceServiceJobs
//@route  GET /api/v1/accountant/our-invoice-service-job
//@access Private
exports.getAllOur_InvoiceServiceJobs = asyncHandler(async (req, res, next) => {
  const allOur_InvoiceServiceJobs = await Our_InvoiceServiceJob.find().sort({
    invoiceServiceJobDate: -1
  });
  //Check if  exists response
  if (!allOur_InvoiceServiceJobs) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOur_InvoiceServiceJobs
  });
});

//@desc   Get one Our_InvoiceServiceJob
//@route  GET /api/v1/accountant/our-invoice-service-job/:id
//@access Private
exports.getOneOur_InvoiceServiceJob = asyncHandler(async (req, res, next) => {
  const oneOur_InvoiceServiceJob = await Our_InvoiceServiceJob.findById(
    req.params.id
  )
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' })
    .populate({ path: 'serviceJobs.serviceJob', select: 'serviceName' });

  //Check if  exists response
  if (!oneOur_InvoiceServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOur_InvoiceServiceJob
  });
});

//@desc   DELETE one Our_InvoiceServiceJob
//@route  DELETE /api/v1/accountant/our-invoice-service-job/:id
//@access Private
exports.deleteOur_InvoiceServiceJob = asyncHandler(async (req, res, next) => {
  const oneOur_InvoiceServiceJob = await Our_InvoiceServiceJob.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneOur_InvoiceServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
