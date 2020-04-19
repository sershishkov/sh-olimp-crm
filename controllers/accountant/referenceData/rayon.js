const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Rayon = require('../../../models/accountant/referenceData/Rayon');
const Client = require('../../../models/accountant/referenceData/Client');
const OurFirm = require('../../../models/accountant/referenceData/OurFirm');
const Supplier = require('../../../models/accountant/referenceData/Supplier');
const Worker = require('../../../models/accountant/referenceData/Worker');

//@desc   Add a Rayon
//@route  POST /api/v1/accountant/rayon
//@access Private
exports.addRayon = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { rayonName } = req.body;
  const newRayon = new Rayon({
    rayonName
  });

  await newRayon.save();

  res.status(200).json({
    success: true,
    data: newRayon
  });
});

//@desc   Update a Rayon
//@route  PUT /api/v1/accountant/rayon/:id
//@access Private
exports.updateRayon = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newRayon = {
    rayonName: req.body.rayonName
  };

  const updatedRayon = await Rayon.findByIdAndUpdate(req.params.id, newRayon, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: updatedRayon
  });
});

//@desc   Get all Rayons
//@route  GET /api/v1/accountant/rayon
//@access Private
exports.getAllRayons = asyncHandler(async (req, res, next) => {
  const allRayons = await Rayon.find().sort({
    rayonName: 1
  });
  //Check if  exists response
  if (!allRayons) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allRayons
  });
});

//@desc   Get one Rayon
//@route  GET /api/v1/accountant/rayon/:id
//@access Private
exports.getOneRayon = asyncHandler(async (req, res, next) => {
  const oneRayon = await Rayon.findById(req.params.id);
  //Check if  exists response
  if (!oneRayon) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneRayon
  });
});

//@desc   DELETE one Rayon
//@route  DELETE /api/v1/accountant/rayon/:id
//@access Private
exports.deleteRayon = asyncHandler(async (req, res, next) => {
  const relatedClient = await Client.findOne({ rayon: req.params.id }, '_id');
  const relatedOurFirm = await OurFirm.findOne({ rayon: req.params.id }, '_id');
  const relatedSupplier = await Supplier.findOne(
    { rayon: req.params.id },
    '_id'
  );
  const relatedWorker = await Worker.findOne({ rayon: req.params.id }, '_id');

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
    const oneRayon = await Rayon.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!oneRayon) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
