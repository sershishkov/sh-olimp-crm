const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const OurFirm = require('../../../models/accountant/referenceData/OurFirm');

//@desc   Add a OurFirm
//@route  POST /api/v1/accountant/our-firm
//@access Private
exports.addOurFirm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOurFirm = new OurFirm({
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
    iban: req.body.iban,

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
    issuedBy: req.body.issuedBy,
    taxPayerOn: req.body.taxPayerOn,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    creator: req.user.id
  });

  await newOurFirm.save();

  res.status(200).json({
    success: true,
    data: newOurFirm
  });
});

//@desc   Update a OurFirm
//@route  PUT /api/v1/accountant/our-firm/:id
//@access Private
exports.updateOurFirm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newOurFirm = {
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
    iban: req.body.iban,

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
    issuedBy: req.body.issuedBy,
    taxPayerOn: req.body.taxPayerOn,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  };

  const updatedOurFirm = await OurFirm.findByIdAndUpdate(
    req.params.id,
    newOurFirm,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedOurFirm
  });
});

//@desc   Get all OurFirms
//@route  GET /api/v1/accountant/our-firm
//@access Private
exports.getAllOurFirms = asyncHandler(async (req, res, next) => {
  const allOurFirms = await OurFirm.find()
    .sort({
      firmName: 1
    })
    .populate({ path: 'typeOf_settlement', select: 'typeOf_SettlementShort' })
    .populate({ path: 'typeOfFirm', select: 'TypeOf_FirmShort' })
    .populate({ path: 'city', select: 'cityName' })
    .populate({ path: 'typeOf_street', select: 'typeOf_StreetShort' })
    .populate({ path: 'street', select: 'streetName' })
    .populate({ path: 'oblast', select: 'oblastName' })
    .populate({ path: 'rayon', select: 'rayonName' })
    .populate({ path: 'firstPersonPosition', select: 'position' })
    .populate({ path: 'actsOnBasisOf', select: 'actOnBasisOf' })
    .populate({ path: 'taxPayerOn', select: 'typeOf_TaxPayerOn' })
    .populate({ path: 'groupOf_product', select: 'productGroup' });
  //Check if  exists response
  if (!allOurFirms) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allOurFirms
  });
});

//@desc   Get one OurFirm
//@route  GET /api/v1/accountant/our-firm/:id
//@access Private
exports.getOneOurFirm = asyncHandler(async (req, res, next) => {
  const oneOurFirm = await OurFirm.findById(req.params.id);
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
  if (!oneOurFirm) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneOurFirm
  });
});

//@desc   DELETE one OurFirm
//@route  DELETE /api/v1/accountant/our-firm/:id
//@access Private
exports.deleteOurFirm = asyncHandler(async (req, res, next) => {
  const oneOurFirm = await OurFirm.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneOurFirm) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
