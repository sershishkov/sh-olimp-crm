const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const TypeOf_ActsOnBasisOf = require('../../../models/accountant/referenceData/TypeOf_ActsOnBasisOf');

//@desc   Add a TypeOf_ActsOnBasisOf
//@route  POST /api/v1/accountant/type-of-acts-on-basis-of
//@access Private
exports.addTypeOf_ActsOnBasisOf = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { actOnBasisOf } = req.body;
  const newTypeOf_ActsOnBasisOf = new TypeOf_ActsOnBasisOf({
    actOnBasisOf
  });

  await newTypeOf_ActsOnBasisOf.save();

  res.status(200).json({
    success: true,
    data: newTypeOf_ActsOnBasisOf
  });
});

//@desc   Update a TypeOf_ActsOnBasisOf
//@route  PUT /api/v1/accountant/type-of-acts-on-basis-of/:id
//@access Private
exports.updateTypeOf_ActsOnBasisOf = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newTypeOf_ActsOnBasisOf = {
    actOnBasisOf: req.body.actOnBasisOf
  };

  const updatedTypeOf_ActsOnBasisOf = await TypeOf_ActsOnBasisOf.findByIdAndUpdate(
    req.params.id,
    newTypeOf_ActsOnBasisOf,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedTypeOf_ActsOnBasisOf
  });
});

//@desc   Get all TypeOf_ActsOnBasisOfs
//@route  GET /api/v1/accountant/type-of-acts-on-basis-of
//@access Private
exports.getAllTypeOf_ActsOnBasisOfs = asyncHandler(async (req, res, next) => {
  const allTypeOf_ActsOnBasisOfs = await TypeOf_ActsOnBasisOf.find().sort({
    actOnBasisOf: 1
  });
  //Check if  exists response
  if (!allTypeOf_ActsOnBasisOfs) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allTypeOf_ActsOnBasisOfs
  });
});

//@desc   Get one TypeOf_ActsOnBasisOf
//@route  GET /api/v1/accountant/type-of-acts-on-basis-of/:id
//@access Private
exports.getOneTypeOf_ActsOnBasisOf = asyncHandler(async (req, res, next) => {
  const oneTypeOf_ActsOnBasisOf = await TypeOf_ActsOnBasisOf.findById(
    req.params.id
  );
  //Check if  exists response
  if (!oneTypeOf_ActsOnBasisOf) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneTypeOf_ActsOnBasisOf
  });
});

//@desc   DELETE one TypeOf_ActsOnBasisOf
//@route  DELETE /api/v1/accountant/type-of-acts-on-basis-of/:id
//@access Private
exports.deleteTypeOf_ActsOnBasisOf = asyncHandler(async (req, res, next) => {
  const oneTypeOf_ActsOnBasisOf = await TypeOf_ActsOnBasisOf.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneTypeOf_ActsOnBasisOf) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
