const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Client = require('../../../models/accountant/referenceData/Client');

//@desc   Add a Client
//@route  POST /api/v1/accountant/client
//@access Private
exports.addClient = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newClient = new Client({
    firmName: req.body.firmName,
    typeOfFirm: req.body.typeOfFirm,
    postCode: req.body.postCode,
    oblast: req.body.oblast,
    rayon: req.body.rayon,

    typeOf_settlement: req.body.typeOf_settlement,
    city: req.body.city,
    typeOf_street: req.body.typeOf_street,
    street: req.body.street,
    numberOf_house: req.body.numberOf_house,
    numberOf_app: req.body.numberOf_app,

    EDRPOU: req.body.EDRPOU,
    ibanOwn: req.body.ibanOwn,
    ibanGazBank: req.body.ibanGazBank,

    firstPersonPosition: req.body.firstPersonPosition,
    firstPersonSurname: req.body.firstPersonSurname,
    firstPersonName: req.body.firstPersonName,
    firstPersonMiddleName: req.body.firstPersonMiddleName,
    firstPersonSurnameRoditelPadej: req.body.firstPersonSurnameRoditelPadej,
    firstPersonNameRoditelPadej: req.body.firstPersonNameRoditelPadej,
    firstPersonMiddleNameRoditelPadej:
      req.body.firstPersonMiddleNameRoditelPadej,
    shortName: req.body.shortName,

    actsOnBasisOf: req.body.actsOnBasisOf,
    actsOnBasisOf_Number: req.body.actsOnBasisOf_Number,
    issuedBy: req.body.issuedBy,
    taxPayerOn: req.body.taxPayerOn,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    creator: req.user.id
  });

  await newClient.save();

  res.status(200).json({
    success: true,
    data: newClient
  });
});

//@desc   Update a Client
//@route  PUT /api/v1/accountant/client/:id
//@access Private
exports.updateClient = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newClient = {
    firmName: req.body.firmName,
    typeOfFirm: req.body.typeOfFirm,
    postCode: req.body.postCode,
    oblast: req.body.oblast,
    rayon: req.body.rayon,
    typeOf_settlement: req.body.typeOf_settlement,
    city: req.body.city,
    typeOf_street: req.body.typeOf_street,
    street: req.body.street,
    numberOf_house: req.body.numberOf_house,
    numberOf_app: req.body.numberOf_app,
    EDRPOU: req.body.EDRPOU,
    ibanOwn: req.body.ibanOwn,
    ibanGazBank: req.body.ibanGazBank,
    firstPersonPosition: req.body.firstPersonPosition,
    firstPersonSurname: req.body.firstPersonSurname,
    firstPersonName: req.body.firstPersonName,
    firstPersonMiddleName: req.body.firstPersonMiddleName,
    firstPersonSurnameRoditelPadej: req.body.firstPersonSurnameRoditelPadej,
    firstPersonNameRoditelPadej: req.body.firstPersonNameRoditelPadej,
    firstPersonMiddleNameRoditelPadej:
      req.body.firstPersonMiddleNameRoditelPadej,
    shortName: req.body.shortName,
    actsOnBasisOf: req.body.actsOnBasisOf,
    actsOnBasisOf_Number: req.body.actsOnBasisOf_Number,
    issuedBy: req.body.issuedBy,
    taxPayerOn: req.body.taxPayerOn,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  };

  const updatedClient = await Client.findByIdAndUpdate(
    req.params.id,
    newClient,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedClient
  });
});

//@desc   Get all Clients
//@route  GET /api/v1/accountant/client
//@access Private
exports.getAllClients = asyncHandler(async (req, res, next) => {
  const allClients = await Client.find()
    .sort({
      firmName: 1
    })
    .populate({ path: 'typeOf_settlement', select: 'typeOf_SettlementShort' })
    .populate({ path: 'typeOfFirm', select: 'TypeOf_FirmShort' })
    .populate({ path: 'city', select: 'cityName' })
    .populate({ path: 'typeOf_street', select: 'typeOf_StreetShort' })
    .populate({ path: 'street', select: 'streetName' })
    .populate({ path: 'rayon', select: 'rayonName' })
    .populate({ path: 'oblast', select: 'oblastName' })
    .populate({ path: 'firstPersonPosition', select: 'position' })
    .populate({ path: 'actsOnBasisOf', select: 'actOnBasisOf' })
    .populate({ path: 'taxPayerOn', select: 'typeOf_TaxPayerOn' });
  //Check if  exists response
  if (!allClients) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allClients
  });
});

//@desc   Get one Client
//@route  GET /api/v1/accountant/client/:id
//@access Private
exports.getOneClient = asyncHandler(async (req, res, next) => {
  const oneClient = await Client.findById(req.params.id);
  // .populate({
  //   path: 'typeOfFirm',
  //   select: 'TypeOf_FirmLong TypeOf_FirmShort'
  // })
  // .populate({ path: 'typeOf_settlement', select: 'typeOf_SettlementShort' })
  // .populate({ path: 'typeOf_street', select: 'typeOf_StreetShort' })
  // .populate({
  //   path: 'firstPersonPosition',
  //   select: 'position positionRoditPadej'
  // })
  // .populate({ path: 'actsOnBasisOf', select: 'actOnBasisOf' })
  // .populate({ path: 'taxPayerOn', select: 'typeOf_TaxPayerOn' })
  // .populate({
  //   path: 'typeOfFirm',
  //   select: 'TypeOf_FirmLong TypeOf_FirmShort'
  // });
  //Check if  exists response
  if (!oneClient) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneClient
  });
});

//@desc   DELETE one Client
//@route  DELETE /api/v1/accountant/client/:id
//@access Private
exports.deleteClient = asyncHandler(async (req, res, next) => {
  const oneClient = await Client.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneClient) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
