const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Supplier = require('../../../models/accountant/referenceData/Supplier');

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
    phoneNumbers: req.body.phoneNumbers,
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

    phoneNumbers: req.body.phoneNumbers,
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
  const allSuppliers = await Supplier.find({}, 'supplierName').sort({
    supplierName: 1
  });
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
  const oneSupplier = await Supplier.findById(req.params.id)
    .populate({
      path: 'typeOfFirm',
      select: 'TypeOf_FirmLong TypeOf_FirmShort'
    })
    .populate({ path: 'typeOf_settlement', select: 'typeOf_SettlementShort' })
    .populate({ path: 'typeOf_street', select: 'typeOf_StreetShort' })
    .populate({
      path: 'firstPersonPosition',
      select: 'position positionRoditPadej'
    })
    .populate({ path: 'actsOnBasisOf', select: 'actOnBasisOf' })
    .populate({ path: 'taxPayerOn', select: 'typeOf_TaxPayerOn' })
    .populate({ path: 'groupOf_product', select: 'productGroup' })
    .populate({ path: 'phoneNumbers.phoneCode', select: 'operatorCode' });
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
  const oneSupplier = await Supplier.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneSupplier) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
