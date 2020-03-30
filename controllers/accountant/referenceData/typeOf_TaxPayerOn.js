const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const TypeOf_TaxPayerOn = require('../../../models/accountant/referenceData/TypeOf_TaxPayerOn');
const Client = require('../../../models/accountant/referenceData/Client');
const OurFirm = require('../../../models/accountant/referenceData/OurFirm');
const Supplier = require('../../../models/accountant/referenceData/Supplier');

//@desc   Add a TypeOf_TaxPayerOn
//@route  POST /api/v1/accountant/type-of-tax-payer-on
//@access Private
exports.addTypeOf_TaxPayerOn = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { typeOf_TaxPayerOn } = req.body;
  const newTypeOf_TaxPayerOn = new TypeOf_TaxPayerOn({
    typeOf_TaxPayerOn
  });

  await newTypeOf_TaxPayerOn.save();

  res.status(200).json({
    success: true,
    data: newTypeOf_TaxPayerOn
  });
});

//@desc   Update a TypeOf_TaxPayerOn
//@route  PUT /api/v1/accountant/type-of-tax-payer-on/:id
//@access Private
exports.updateTypeOf_TaxPayerOn = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newTypeOf_TaxPayerOn = {
    typeOf_TaxPayerOn: req.body.typeOf_TaxPayerOn
  };

  const updatedTypeOf_TaxPayerOn = await TypeOf_TaxPayerOn.findByIdAndUpdate(
    req.params.id,
    newTypeOf_TaxPayerOn,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedTypeOf_TaxPayerOn
  });
});

//@desc   Get all TypeOf_TaxPayerOns
//@route  GET /api/v1/accountant/type-of-tax-payer-on
//@access Private
exports.getAllTypeOf_TaxPayerOns = asyncHandler(async (req, res, next) => {
  const allTypeOf_TaxPayerOns = await TypeOf_TaxPayerOn.find().sort({
    typeOf_TaxPayerOn: 1
  });
  //Check if  exists response
  if (!allTypeOf_TaxPayerOns) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allTypeOf_TaxPayerOns
  });
});

//@desc   Get one TypeOf_TaxPayerOn
//@route  GET /api/v1/accountant/type-of-tax-payer-on/:id
//@access Private
exports.getOneTypeOf_TaxPayerOn = asyncHandler(async (req, res, next) => {
  const oneTypeOf_TaxPayerOn = await TypeOf_TaxPayerOn.findById(req.params.id);
  //Check if  exists response
  if (!oneTypeOf_TaxPayerOn) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneTypeOf_TaxPayerOn
  });
});

//@desc   DELETE one TypeOf_TaxPayerOn
//@route  DELETE /api/v1/accountant/type-of-tax-payer-on/:id
//@access Private
exports.deleteTypeOf_TaxPayerOn = asyncHandler(async (req, res, next) => {
  const relatedClient = await Client.findOne(
    { taxPayerOn: req.params.id },
    '_id'
  );
  const relatedOurFirm = await OurFirm.findOne(
    { taxPayerOn: req.params.id },
    '_id'
  );
  const relatedSupplier = await Supplier.findOne(
    { taxPayerOn: req.params.id },
    '_id'
  );

  const forbiddenToDelete = relatedClient || relatedOurFirm || relatedSupplier;

  if (forbiddenToDelete) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneTypeOf_TaxPayerOn = await TypeOf_TaxPayerOn.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneTypeOf_TaxPayerOn) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
