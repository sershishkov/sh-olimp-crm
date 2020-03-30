const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const TypeOf_Unit = require('../../../models/accountant/referenceData/TypeOf_Unit');
const Unit = require('../../../models/accountant/referenceData/Unit');

//@desc   Add a TypeOf_Unit
//@route  POST /api/v1/accountant/type-of-unit
//@access Private
exports.addTypeOf_Unit = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { typeOf_Unit } = req.body;
  const newTypeOf_Unit = new TypeOf_Unit({
    typeOf_Unit
  });

  await newTypeOf_Unit.save();

  res.status(200).json({
    success: true,
    data: newTypeOf_Unit
  });
});

//@desc   Update a TypeOf_Unit
//@route  PUT /api/v1/accountant/type-of-unit/:id
//@access Private
exports.updateTypeOf_Unit = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newTypeOf_Unit = {
    typeOf_Unit: req.body.typeOf_Unit
  };

  const updatedTypeOf_Unit = await TypeOf_Unit.findByIdAndUpdate(
    req.params.id,
    newTypeOf_Unit,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedTypeOf_Unit
  });
});

//@desc   Get all TypeOf_Units
//@route  GET /api/v1/accountant/type-of-unit
//@access Private
exports.getAllTypeOf_Units = asyncHandler(async (req, res, next) => {
  const allTypeOf_Units = await TypeOf_Unit.find().sort({
    typeOf_Unit: 1
  });
  //Check if  exists response
  if (!allTypeOf_Units) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allTypeOf_Units
  });
});

//@desc   Get one TypeOf_Unit
//@route  GET /api/v1/accountant/type-of-unit/:id
//@access Private
exports.getOneTypeOf_Unit = asyncHandler(async (req, res, next) => {
  const oneTypeOf_Unit = await TypeOf_Unit.findById(req.params.id);
  //Check if  exists response
  if (!oneTypeOf_Unit) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneTypeOf_Unit
  });
});

//@desc   DELETE one TypeOf_Unit
//@route  DELETE /api/v1/accountant/type-of-unit/:id
//@access Private
exports.deleteTypeOf_Unit = asyncHandler(async (req, res, next) => {
  const relatedElement = await Unit.findOne({ unitType: req.params.id }, '_id');

  if (relatedElement) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneTypeOf_Unit = await TypeOf_Unit.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!oneTypeOf_Unit) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
