const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const TypeOf_Firm = require('../../../models/accountant/referenceData/TypeOf_Firm');
const Client = require('../../../models/accountant/referenceData/Client');
const OurFirm = require('../../../models/accountant/referenceData/OurFirm');
const Supplier = require('../../../models/accountant/referenceData/Supplier');

//@desc   Add a TypeOf_Firm
//@route  POST /api/v1/accountant/type-of-firm
//@access Private
exports.addTypeOf_Firm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { TypeOf_FirmLong, TypeOf_FirmShort } = req.body;
  const newTypeOf_Firm = new TypeOf_Firm({
    TypeOf_FirmLong,
    TypeOf_FirmShort
  });

  await newTypeOf_Firm.save();

  res.status(200).json({
    success: true,
    data: newTypeOf_Firm
  });
});

//@desc   Update a TypeOf_Firm
//@route  PUT /api/v1/accountant/type-of-firm/:id
//@access Private
exports.updateTypeOf_Firm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newTypeOf_Firm = {
    TypeOf_FirmLong: req.body.TypeOf_FirmLong,
    TypeOf_FirmShort: req.body.TypeOf_FirmShort
  };

  const updatedTypeOf_Firm = await TypeOf_Firm.findByIdAndUpdate(
    req.params.id,
    newTypeOf_Firm,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedTypeOf_Firm
  });
});

//@desc   Get all TypeOf_Firms
//@route  GET /api/v1/accountant/type-of-firm
//@access Private
exports.getAllTypeOf_Firms = asyncHandler(async (req, res, next) => {
  const allTypeOf_Firms = await TypeOf_Firm.find().sort({
    TypeOf_FirmShort: 1
  });
  //Check if  exists response
  if (!allTypeOf_Firms) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allTypeOf_Firms
  });
});

//@desc   Get one TypeOf_Firm
//@route  GET /api/v1/accountant/type-of-firm/:id
//@access Private
exports.getOneTypeOf_Firm = asyncHandler(async (req, res, next) => {
  const oneTypeOf_Firm = await TypeOf_Firm.findById(req.params.id);
  //Check if  exists response
  if (!oneTypeOf_Firm) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneTypeOf_Firm
  });
});

//@desc   DELETE one TypeOf_Firm
//@route  DELETE /api/v1/accountant/type-of-firm/:id
//@access Private
exports.deleteTypeOf_Firm = asyncHandler(async (req, res, next) => {
  const relatedClient = await Client.findOne(
    { typeOfFirm: req.params.id },
    '_id'
  );
  const relatedOurFirm = await OurFirm.findOne(
    { typeOfFirm: req.params.id },
    '_id'
  );
  const relatedSupplier = await Supplier.findOne(
    { typeOfFirm: req.params.id },
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
    const oneTypeOf_Firm = await TypeOf_Firm.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!oneTypeOf_Firm) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
