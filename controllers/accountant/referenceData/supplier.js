const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Supplier = require('../../../models/accountant/referenceData/Supplier');

const Entered_CertificateOf_Completion = require('../../../models/accountant/enteredMainData/Entered_CertificateOf_Completion');
const Entered_InvoiceMixed = require('../../../models/accountant/enteredMainData/Entered_InvoiceMixed');
const Entered_InvoiceProduct = require('../../../models/accountant/enteredMainData/Entered_InvoiceProduct');
const Entered_InvoiceServiceJob = require('../../../models/accountant/enteredMainData/Entered_InvoiceServiceJob');
const Entered_SalesInvoiceNakladnaya = require('../../../models/accountant/enteredMainData/Entered_SalesInvoiceNakladnaya');
const Our_Payment = require('../../../models/accountant/ourMainData/Our_Payment');

//@desc   Add a Supplier
//@route  POST /api/v1/accountant/supplier
//@access Private
exports.addSupplier = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newSupplier = new Supplier({
    supplierName: req.body.supplierName,
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
    groupOf_product: req.body.groupOf_product,
    creator: req.user.id
  });

  await newSupplier.save();

  res.status(200).json({
    success: true,
    data: newSupplier
  });
});

//@desc   Update a Supplier
//@route  PUT /api/v1/accountant/supplier/:id
//@access Private
exports.updateSupplier = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newSupplier = {
    supplierName: req.body.supplierName,
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
    groupOf_product: req.body.groupOf_product
  };

  const updatedSupplier = await Supplier.findByIdAndUpdate(
    req.params.id,
    newSupplier,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedSupplier
  });
});

//@desc   Get all Suppliers
//@route  GET /api/v1/accountant/supplier
//@access Private
exports.getAllSuppliers = asyncHandler(async (req, res, next) => {
  const allSuppliers = await Supplier.find()
    .sort({
      supplierName: 1
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
  if (!allSuppliers) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allSuppliers
  });
});

//@desc   Get one Supplier
//@route  GET /api/v1/accountant/supplier/:id
//@access Private
exports.getOneSupplier = asyncHandler(async (req, res, next) => {
  const oneSupplier = await Supplier.findById(req.params.id);
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
  // .populate({ path: 'groupOf_product', select: 'productGroup' });

  //Check if  exists response
  if (!oneSupplier) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneSupplier
  });
});

//@desc   DELETE one Supplier
//@route  DELETE /api/v1/accountant/supplier/:id
//@access Private
exports.deleteSupplier = asyncHandler(async (req, res, next) => {
  const relatedEntered_CertificateOf_Completion = await Entered_CertificateOf_Completion.findOne(
    { supplier: req.params.id },
    '_id'
  );
  const relatedEntered_InvoiceMixed = await Entered_InvoiceMixed.findOne(
    { supplier: req.params.id },
    '_id'
  );
  const relatedEntered_InvoiceProduct = await Entered_InvoiceProduct.findOne(
    { supplier: req.params.id },
    '_id'
  );
  const relatedEntered_InvoiceServiceJob = await Entered_InvoiceServiceJob.findOne(
    { supplier: req.params.id },
    '_id'
  );
  const relatedEntered_SalesInvoiceNakladnaya = await Entered_SalesInvoiceNakladnaya.findOne(
    { supplier: req.params.id },
    '_id'
  );
  const relatedOur_Payment = await Our_Payment.findOne(
    { supplier: req.params.id },
    '_id'
  );

  const forbiddenToDelete =
    relatedEntered_CertificateOf_Completion ||
    relatedEntered_InvoiceMixed ||
    relatedEntered_InvoiceProduct ||
    relatedEntered_InvoiceServiceJob ||
    relatedEntered_SalesInvoiceNakladnaya ||
    relatedOur_Payment;

  if (forbiddenToDelete) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneSupplier = await Supplier.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!oneSupplier) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
