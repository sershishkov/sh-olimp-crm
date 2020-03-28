const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Worker = require('../../../models/accountant/referenceData/Worker');

//@desc   Add a Worker
//@route  POST /api/v1/accountant/worker
//@access Private
exports.addWorker = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newWorker = new Worker({
    surname: req.body.surname,
    name: req.body.name,
    middleName: req.body.middleName,
    dateOf_Birth: req.body.dateOf_Birth,
    postCode: req.body.postCode,
    oblast: req.body.oblast,
    rayon: req.body.rayon,
    typeOf_settlement: req.body.typeOf_settlement,
    city: req.body.city,
    typeOf_street: req.body.typeOf_street,
    street: req.body.street,
    numberOf_house: req.body.numberOf_house,
    numberOf_app: req.body.numberOf_app,
    individualTaxNumber: req.body.individualTaxNumber,
    phoneNumber: req.body.phoneNumber
  });

  await newWorker.save();

  res.status(200).json({
    success: true,
    data: newWorker
  });
});

//@desc   Update a Worker
//@route  PUT /api/v1/accountant/worker/:id
//@access Private
exports.updateWorker = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newWorker = {
    surname: req.body.surname,
    name: req.body.name,
    middleName: req.body.middleName,
    dateOf_Birth: req.body.dateOf_Birth,
    postCode: req.body.postCode,
    oblast: req.body.oblast,
    rayon: req.body.rayon,
    typeOf_settlement: req.body.typeOf_settlement,
    city: req.body.city,
    typeOf_street: req.body.typeOf_street,
    street: req.body.street,
    numberOf_house: req.body.numberOf_house,
    numberOf_app: req.body.numberOf_app,
    individualTaxNumber: req.body.individualTaxNumber,
    phoneNumber: req.body.phoneNumber
  };

  const updatedWorker = await Worker.findByIdAndUpdate(
    req.params.id,
    newWorker,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedWorker
  });
});

//@desc   Get all Workers
//@route  GET /api/v1/accountant/worker
//@access Private
exports.getAllWorkers = asyncHandler(async (req, res, next) => {
  const allWorkers = await Worker.find()
    .sort({
      surname: 1
    })
    .populate({ path: 'typeOf_settlement', select: 'typeOf_SettlementShort' })
    .populate({ path: 'city', select: 'cityName' })
    .populate({ path: 'typeOf_street', select: 'typeOf_StreetShort' })
    .populate({ path: 'street', select: 'streetName' })
    .populate({ path: 'oblast', select: 'oblastName' })
    .populate({ path: 'rayon', select: 'rayonName' });
  //Check if  exists response
  if (!allWorkers) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allWorkers
  });
});

//@desc   Get one Worker
//@route  GET /api/v1/accountant/worker/:id
//@access Private
exports.getOneWorker = asyncHandler(async (req, res, next) => {
  const oneWorker = await Worker.findById(req.params.id);
  //Check if  exists response
  if (!oneWorker) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneWorker
  });
});

//@desc   DELETE one Worker
//@route  DELETE /api/v1/accountant/worker/:id
//@access Private
exports.deleteWorker = asyncHandler(async (req, res, next) => {
  const oneWorker = await Worker.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneWorker) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
