const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const ServiceJob = require('../../../models/accountant/referenceData/ServiceJob');

//@desc   Add a ServiceJob
//@route  POST /api/v1/accountant/service-job
//@access Private
exports.addServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newServiceJob = new ServiceJob({
    serviceName: req.body.serviceName,
    unit: req.body.unit,
    serviceJobGroup: req.body.serviceJobGroup
  });

  await newServiceJob.save();

  res.status(200).json({
    success: true,
    data: newServiceJob
  });
});

//@desc   Update a ServiceJob
//@route  PUT /api/v1/accountant/service-job/:id
//@access Private
exports.updateServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newServiceJob = {
    serviceName: req.body.serviceName,
    unit: req.body.unit,
    serviceJobGroup: req.body.serviceJobGroup
  };

  const updatedServiceJob = await ServiceJob.findByIdAndUpdate(
    req.params.id,
    newServiceJob,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedServiceJob
  });
});

//@desc   Get all ServiceJobs
//@route  GET /api/v1/accountant/service-job
//@access Private
exports.getAllServiceJobs = asyncHandler(async (req, res, next) => {
  const allServiceJobs = await ServiceJob.find()
    .populate({ path: 'unit', select: 'unitNameShort' })
    .populate({ path: 'serviceJobGroup', select: 'serviceJobGroup' })
    .sort({
      serviceName: 1
    });
  //Check if  exists response
  if (!allServiceJobs) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allServiceJobs
  });
});

//@desc   Get one ServiceJob
//@route  GET /api/v1/accountant/service-job/:id
//@access Private
exports.getOneServiceJob = asyncHandler(async (req, res, next) => {
  const oneServiceJob = await ServiceJob.findById(req.params.id)
    .populate({ path: 'unit', select: 'unitNameShort' })
    .populate({ path: 'serviceJobGroup', select: 'serviceJobGroup' });
  //Check if  exists response
  if (!oneServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneServiceJob
  });
});

//@desc   DELETE one ServiceJob
//@route  DELETE /api/v1/accountant/service-job/:id
//@access Private
exports.deleteServiceJob = asyncHandler(async (req, res, next) => {
  const oneServiceJob = await ServiceJob.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
