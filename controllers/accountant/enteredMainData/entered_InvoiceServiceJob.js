const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Entered_InvoiceServiceJob = require('../../../models/accountant/enteredMainData/Entered_InvoiceServiceJob');

//@desc   Add a Entered_InvoiceServiceJob
//@route  POST /api/v1/accountant/entered-invoice-service-job
//@access Private
exports.addEntered_InvoiceServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newEntered_InvoiceServiceJob = new Entered_InvoiceServiceJob({
    invoiceServiceJobNumber: req.body.invoiceServiceJobNumber,
    invoiceServiceJobDate: req.body.invoiceServiceJobDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    serviceJobs: req.body.serviceJobs,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newEntered_InvoiceServiceJob.save();

  res.status(200).json({
    success: true,
    data: newEntered_InvoiceServiceJob
  });
});

//@desc   Update a Entered_InvoiceServiceJob
//@route  PUT /api/v1/accountant/entered-invoice-service-job/:id
//@access Private
exports.updateEntered_InvoiceServiceJob = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }
    const newEntered_InvoiceServiceJob = {
      invoiceServiceJobNumber: req.body.invoiceServiceJobNumber,
      invoiceServiceJobDate: req.body.invoiceServiceJobDate,
      ourFirm: req.body.ourFirm,
      client: req.body.client,
      serviceJobs: req.body.serviceJobs,
      active: req.body.active,
      cashPayment: req.body.cashPayment
    };

    const updatedEntered_InvoiceServiceJob = await Entered_InvoiceServiceJob.findByIdAndUpdate(
      req.params.id,
      newEntered_InvoiceServiceJob,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedEntered_InvoiceServiceJob
    });
  }
);

//@desc   Get all Entered_InvoiceServiceJobs
//@route  GET /api/v1/accountant/entered-invoice-service-job
//@access Private
exports.getAllEntered_InvoiceServiceJobs = asyncHandler(
  async (req, res, next) => {
    const allEntered_InvoiceServiceJobs = await Entered_InvoiceServiceJob.find().sort(
      {
        invoiceServiceJobDate: -1
      }
    );
    //Check if  exists response
    if (!allEntered_InvoiceServiceJobs) {
      return next(
        new ErrorResponse('На данный момент ничего в базе нет ', 400)
      );
    }

    res.status(200).json({
      success: true,
      data: allEntered_InvoiceServiceJobs
    });
  }
);

//@desc   Get one Entered_InvoiceServiceJob
//@route  GET /api/v1/accountant/entered-invoice-service-job/:id
//@access Private
exports.getOneEntered_InvoiceServiceJob = asyncHandler(
  async (req, res, next) => {
    const oneEntered_InvoiceServiceJob = await Entered_InvoiceServiceJob.findById(
      req.params.id
    )
      .populate({ path: 'ourFirm', select: 'firmName' })
      .populate({ path: 'client', select: 'firmName' })
      .populate({ path: 'serviceJobs.serviceJob', select: 'serviceName' });

    //Check if  exists response
    if (!oneEntered_InvoiceServiceJob) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: oneEntered_InvoiceServiceJob
    });
  }
);

//@desc   DELETE one Entered_InvoiceServiceJob
//@route  DELETE /api/v1/accountant/entered-invoice-service-job/:id
//@access Private
exports.deleteEntered_InvoiceServiceJob = asyncHandler(
  async (req, res, next) => {
    const oneEntered_InvoiceServiceJob = await Entered_InvoiceServiceJob.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneEntered_InvoiceServiceJob) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
);
