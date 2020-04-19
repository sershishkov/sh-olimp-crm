const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const GroupOf_ServiceJob = require('../../../models/accountant/referenceData/GroupOf_ServiceJob');
const ServiceJob = require('../../../models/accountant/referenceData/ServiceJob');

//@desc   Add a GroupOf_ServiceJob
//@route  POST /api/v1/accountant/group-of-servicejob
//@access Private
exports.addGroupOf_ServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { serviceJobGroup } = req.body;
  const newGroupOf_ServiceJob = new GroupOf_ServiceJob({
    serviceJobGroup
  });

  await newGroupOf_ServiceJob.save();

  res.status(200).json({
    success: true,
    data: newGroupOf_ServiceJob
  });
});

//@desc   Update a GroupOf_ServiceJob
//@route  PUT /api/v1/accountant/group-of-servicejob/:id
//@access Private
exports.updateGroupOf_ServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newGroupOf_ServiceJob = {
    serviceJobGroup: req.body.serviceJobGroup
  };

  const updatedGroupOf_ServiceJob = await GroupOf_ServiceJob.findByIdAndUpdate(
    req.params.id,
    newGroupOf_ServiceJob,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedGroupOf_ServiceJob
  });
});

//@desc   Get all GroupOf_ServiceJobs
//@route  GET /api/v1/accountant/group-of-servicejob
//@access Private
exports.getAllGroupOf_ServiceJobs = asyncHandler(async (req, res, next) => {
  const allGroupOf_ServiceJobs = await GroupOf_ServiceJob.find().sort({
    serviceJobGroup: 1
  });
  //Check if  exists response
  if (!allGroupOf_ServiceJobs) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allGroupOf_ServiceJobs
  });
});

//@desc   Get one GroupOf_ServiceJob
//@route  GET /api/v1/accountant/group-of-servicejob/:id
//@access Private
exports.getOneGroupOf_ServiceJob = asyncHandler(async (req, res, next) => {
  const oneGroupOf_ServiceJob = await GroupOf_ServiceJob.findById(
    req.params.id
  );
  //Check if  exists response
  if (!oneGroupOf_ServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneGroupOf_ServiceJob
  });
});

//@desc   DELETE one GroupOf_ServiceJob
//@route  DELETE /api/v1/accountant/group-of-servicejob/:id
//@access Private
exports.deleteGroupOf_ServiceJob = asyncHandler(async (req, res, next) => {
  const relatedElement = await ServiceJob.findOne(
    { serviceJobGroup: req.params.id },
    '_id'
  );

  if (relatedElement) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const groupOf_ServiceJob = await GroupOf_ServiceJob.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!groupOf_ServiceJob) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
