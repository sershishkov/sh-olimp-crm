const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_WorkersSalary = require('../../../models/accountant/ourMainData/Our_WorkersSalary');

//@desc   Add a Our_WorkersSalary
//@route  POST /api/v1/accountant/our-workers-salary
//@access Private
exports.addOur_WorkersSalary = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_WorkersSalary = new Our_WorkersSalary({
    paymentNumber: req.body.paymentNumber,
    datePayment: req.body.datePayment,
    worker: req.body.worker,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    description: req.body.description,
    sum: req.body.sum,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newOur_WorkersSalary.save();

  res.status(200).json({
    success: true,
    data: newOur_WorkersSalary
  });
});

//@desc   Update a Our_WorkersSalary
//@route  PUT /api/v1/accountant/our-workers-salary/:id
//@access Private
exports.updateOur_WorkersSalary = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOur_WorkersSalary = {
    paymentNumber: req.body.paymentNumber,
    datePayment: req.body.datePayment,
    worker: req.body.worker,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    description: req.body.description,
    sum: req.body.sum,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  };

  const updatedOur_WorkersSalary = await Our_WorkersSalary.findByIdAndUpdate(
    req.params.id,
    newOur_WorkersSalary,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOur_WorkersSalary
  });
});

//@desc   Get all Our_WorkersSalarys
//@route  GET /api/v1/accountant/our-workers-salary
//@access Private
exports.getAllOur_WorkersSalarys = asyncHandler(async (req, res, next) => {
  const allOur_WorkersSalarys = await Our_WorkersSalary.find()
    .sort({
      datePayment: -1
    })
    .populate({ path: 'worker', select: 'surname name middleName' })
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' });

  //Check if  exists response
  if (!allOur_WorkersSalarys) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOur_WorkersSalarys
  });
});

//@desc   Get one Our_WorkersSalary
//@route  GET /api/v1/accountant/our-workers-salary/:id
//@access Private
exports.getOneOur_WorkersSalary = asyncHandler(async (req, res, next) => {
  const oneOur_WorkersSalary = await Our_WorkersSalary.findById(req.params.id);
  //Check if  exists response
  if (!oneOur_WorkersSalary) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOur_WorkersSalary
  });
});

//@desc   DELETE one Our_WorkersSalary
//@route  DELETE /api/v1/accountant/our-workers-salary/:id
//@access Private
exports.deleteOur_WorkersSalary = asyncHandler(async (req, res, next) => {
  const oneOur_WorkersSalary = await Our_WorkersSalary.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneOur_WorkersSalary) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
