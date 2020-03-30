const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const City = require('../../../models/accountant/referenceData/City');
const Client = require('../../../models/accountant/referenceData/Client');
const OurFirm = require('../../../models/accountant/referenceData/OurFirm');
const Supplier = require('../../../models/accountant/referenceData/Supplier');
const Worker = require('../../../models/accountant/referenceData/Worker');

//@desc   Add a City
//@route  POST /api/v1/accountant/city
//@access Private
exports.addCity = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { cityName } = req.body;
  const newCity = new City({
    cityName
  });

  await newCity.save();

  res.status(200).json({
    success: true,
    data: newCity
  });
});

//@desc   Update a City
//@route  PUT /api/v1/accountant/city/:id
//@access Private
exports.updateCity = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newCity = {
    cityName: req.body.cityName
  };

  const updatedCity = await City.findByIdAndUpdate(req.params.id, newCity, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: updatedCity
  });
});

//@desc   Get all Citys
//@route  GET /api/v1/accountant/city
//@access Private
exports.getAllCitys = asyncHandler(async (req, res, next) => {
  const allCitys = await City.find().sort({
    cityName: 1
  });
  //Check if  exists response
  if (!allCitys) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allCitys
  });
});

//@desc   Get one City
//@route  GET /api/v1/accountant/city/:id
//@access Private
exports.getOneCity = asyncHandler(async (req, res, next) => {
  const oneCity = await City.findById(req.params.id);
  //Check if  exists response
  if (!oneCity) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneCity
  });
});

//@desc   DELETE one City
//@route  DELETE /api/v1/accountant/city/:id
//@access Private
exports.deleteCity = asyncHandler(async (req, res, next) => {
  const relatedClient = await Client.findOne({ city: req.params.id }, '_id');
  const relatedOurFirm = await OurFirm.findOne({ city: req.params.id }, '_id');
  const relatedSupplier = await Supplier.findOne(
    { city: req.params.id },
    '_id'
  );
  const relatedWorker = await Worker.findOne({ city: req.params.id }, '_id');

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
    const oneCity = await City.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!oneCity) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
