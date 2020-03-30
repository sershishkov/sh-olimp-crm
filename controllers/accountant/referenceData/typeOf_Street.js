const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const TypeOf_Street = require('../../../models/accountant/referenceData/TypeOf_Street');
const Client = require('../../../models/accountant/referenceData/Client');
const OurFirm = require('../../../models/accountant/referenceData/OurFirm');
const Supplier = require('../../../models/accountant/referenceData/Supplier');
const Worker = require('../../../models/accountant/referenceData/Worker');

//@desc   Add a TypeOf_Street
//@route  POST /api/v1/accountant/type-of-street
//@access Private
exports.addTypeOf_Street = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { typeOf_StreetLong, typeOf_StreetShort } = req.body;
  const newTypeOf_Street = new TypeOf_Street({
    typeOf_StreetLong,
    typeOf_StreetShort
  });

  await newTypeOf_Street.save();

  res.status(200).json({
    success: true,
    data: newTypeOf_Street
  });
});

//@desc   Update a TypeOf_Street
//@route  PUT /api/v1/accountant/type-of-street/:id
//@access Private
exports.updateTypeOf_Street = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newTypeOf_Street = {
    typeOf_StreetLong: req.body.typeOf_StreetLong,
    typeOf_StreetShort: req.body.typeOf_StreetShort
  };

  const updatedTypeOf_Street = await TypeOf_Street.findByIdAndUpdate(
    req.params.id,
    newTypeOf_Street,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedTypeOf_Street
  });
});

//@desc   Get all TypeOf_Streets
//@route  GET /api/v1/accountant/type-of-street
//@access Private
exports.getAllTypeOf_Streets = asyncHandler(async (req, res, next) => {
  const allTypeOf_Streets = await TypeOf_Street.find().sort({
    typeOf_StreetShort: 1
  });
  //Check if  exists response
  if (!allTypeOf_Streets) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allTypeOf_Streets
  });
});

//@desc   Get one TypeOf_Street
//@route  GET /api/v1/accountant/type-of-street/:id
//@access Private
exports.getOneTypeOf_Street = asyncHandler(async (req, res, next) => {
  const oneTypeOf_Street = await TypeOf_Street.findById(req.params.id);
  //Check if  exists response
  if (!oneTypeOf_Street) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneTypeOf_Street
  });
});

//@desc   DELETE one TypeOf_Street
//@route  DELETE /api/v1/accountant/type-of-street/:id
//@access Private
exports.deleteTypeOf_Street = asyncHandler(async (req, res, next) => {
  const relatedClient = await Client.findOne(
    { typeOf_street: req.params.id },
    '_id'
  );
  const relatedOurFirm = await OurFirm.findOne(
    { typeOf_street: req.params.id },
    '_id'
  );
  const relatedSupplier = await Supplier.findOne(
    { typeOf_street: req.params.id },
    '_id'
  );
  const relatedWorker = await Worker.findOne(
    { typeOf_street: req.params.id },
    '_id'
  );

  const forbiddenToDelete =
    relatedClient || relatedOurFirm || relatedSupplier || relatedWorker;

  if (forbiddenToDelete) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneTypeOf_Street = await TypeOf_Street.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneTypeOf_Street) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
