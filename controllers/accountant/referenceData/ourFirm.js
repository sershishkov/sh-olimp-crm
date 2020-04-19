const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const OurFirm = require('../../../models/accountant/referenceData/OurFirm');

const Entered_CertificateOf_Completion = require('../../../models/accountant/enteredMainData/Entered_CertificateOf_Completion');
const Entered_InvoiceMixed = require('../../../models/accountant/enteredMainData/Entered_InvoiceMixed');
const Entered_InvoiceProduct = require('../../../models/accountant/enteredMainData/Entered_InvoiceProduct');
const Entered_InvoiceServiceJob = require('../../../models/accountant/enteredMainData/Entered_InvoiceServiceJob');
const Entered_SalesInvoiceNakladnaya = require('../../../models/accountant/enteredMainData/Entered_SalesInvoiceNakladnaya');

const Our_BankIncome = require('../../../models/accountant/ourMainData/Our_BankIncome');
const Our_CertificateOf_Completion = require('../../../models/accountant/ourMainData/Our_CertificateOf_Completion');
const Our_InvoiceMixed = require('../../../models/accountant/ourMainData/Our_InvoiceMixed');
const Our_InvoiceProduct = require('../../../models/accountant/ourMainData/Our_InvoiceProduct');
const Our_InvoiceServiceJob = require('../../../models/accountant/ourMainData/Our_InvoiceServiceJob');
const Our_Payment = require('../../../models/accountant/ourMainData/Our_Payment');
const Our_SalesInvoiceNakladnaya = require('../../../models/accountant/ourMainData/Our_SalesInvoiceNakladnaya');

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
    actsOnBasisOf_Number: req.body.actsOnBasisOf_Number,
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
    actsOnBasisOf_Number: req.body.actsOnBasisOf_Number,
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
  const relatedEntered_CertificateOf_Completion = await Entered_CertificateOf_Completion.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedEntered_InvoiceMixed = await Entered_InvoiceMixed.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedEntered_InvoiceProduct = await Entered_InvoiceProduct.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedEntered_InvoiceServiceJob = await Entered_InvoiceServiceJob.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedEntered_SalesInvoiceNakladnaya = await Entered_SalesInvoiceNakladnaya.findOne(
    { ourFirm: req.params.id },
    '_id'
  );

  const relatedOur_BankIncome = await Our_BankIncome.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedOur_CertificateOf_Completion = await Our_CertificateOf_Completion.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedOur_InvoiceMixed = await Our_InvoiceMixed.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedOur_InvoiceProduct = await Our_InvoiceProduct.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedOur_InvoiceServiceJob = await Our_InvoiceServiceJob.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedOur_Payment = await Our_Payment.findOne(
    { ourFirm: req.params.id },
    '_id'
  );
  const relatedOur_SalesInvoiceNakladnaya = await Our_SalesInvoiceNakladnaya.findOne(
    { ourFirm: req.params.id },
    '_id'
  );

  const forbiddenToDelete =
    relatedEntered_CertificateOf_Completion ||
    relatedEntered_InvoiceMixed ||
    relatedEntered_InvoiceProduct ||
    relatedEntered_InvoiceServiceJob ||
    relatedEntered_SalesInvoiceNakladnaya ||
    relatedOur_BankIncome ||
    relatedOur_CertificateOf_Completion ||
    relatedOur_InvoiceMixed ||
    relatedOur_InvoiceProduct ||
    relatedOur_InvoiceServiceJob ||
    relatedOur_Payment ||
    relatedOur_SalesInvoiceNakladnaya;

  if (forbiddenToDelete) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneOurFirm = await OurFirm.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!oneOurFirm) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
