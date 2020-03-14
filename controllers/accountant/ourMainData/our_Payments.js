const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_Payment = require('../../../models/accountant/ourMainData/Our_Payment');

//@desc   Add a Our_Payment
//@route  POST /api/v1/accountant/our-payments
//@access Private
exports.addOur_Payment = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_Payment = new Our_Payment({
    paymentNumber: req.body.paymentNumber,
    dateOf_payment: req.body.dateOf_payment,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    sum: req.body.sum,
    active: req.body.active
  });

  await newOur_Payment.save();

  res.status(200).json({
    success: true,
    data: newOur_Payment
  });
});

//@desc   Update a Our_Payment
//@route  PUT /api/v1/accountant/our-payments/:id
//@access Private
exports.updateOur_Payment = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOur_Payment = {
    paymentNumber: req.body.paymentNumber,
    dateOf_payment: req.body.dateOf_payment,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    sum: req.body.sum,
    active: req.body.active
  };

  const updatedOur_Payment = await Our_Payment.findByIdAndUpdate(
    req.params.id,
    newOur_Payment,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOur_Payment
  });
});

//@desc   Get all Our_Payments
//@route  GET /api/v1/accountant/our-payments
//@access Private
exports.getAllOur_Payments = asyncHandler(async (req, res, next) => {
  const allOur_Payments = await Our_Payment.find().sort({
    dateOf_payment: -1
  });
  //Check if  exists response
  if (!allOur_Payments) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOur_Payments
  });
});

//@desc   Get one Our_Payment
//@route  GET /api/v1/accountant/our-payments/:id
//@access Private
exports.getOneOur_Payment = asyncHandler(async (req, res, next) => {
  const oneOur_Payment = await Our_Payment.findById(req.params.id)
    .populate({ path: 'ourFirm', select: 'firmName' })
    .populate({ path: 'client', select: 'firmName' });

  //Check if  exists response
  if (!oneOur_Payment) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOur_Payment
  });
});

//@desc   DELETE one Our_Payment
//@route  DELETE /api/v1/accountant/our-payments/:id
//@access Private
exports.deleteOur_Payment = asyncHandler(async (req, res, next) => {
  const oneOur_Payment = await Our_Payment.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneOur_Payment) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
