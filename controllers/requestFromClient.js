const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const RequestFromClient = require('../models/RequestFromClient');

//@desc   Add a RequestFromClient
//@route  POST /api/v1/request-from-client
//@access Private
exports.addRequestFromClient = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newRequestFromClient = new RequestFromClient({
    clientName: req.body.clientName,
    requestFromClient: req.body.requestFromClient,
    operatorCode: req.body.operatorCode,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  });

  await newRequestFromClient.save();

  res.status(200).json({
    success: true,
    data: newRequestFromClient
  });
});

//@desc   Update a RequestFromClient
//@route  PUT /api/v1/request-from-client/:id
//@access Private
exports.updateRequestFromClient = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const newRequestFromClient = {
    clientName: req.body.clientName,
    requestFromClient: req.body.requestFromClient,
    operatorCode: req.body.operatorCode,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  };

  const updatedRequestFromClient = await RequestFromClient.findByIdAndUpdate(
    req.params.id,
    newRequestFromClient,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedRequestFromClient
  });
});

//@desc   Get all RequestFromClients
//@route  GET /api/v1/request-from-client
//@access Private
exports.getAllRequestFromClients = asyncHandler(async (req, res, next) => {
  const allRequestFromClients = await RequestFromClient.find()
    .populate({ path: 'operatorCode', select: 'operatorCode' })
    .sort({
      createdAt: -1
    });
  //Check if  exists response
  if (!allRequestFromClients) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allRequestFromClients
  });
});

//@desc   Get one RequestFromClient
//@route  GET /api/v1/request-from-client/:id
//@access Private
exports.getOneRequestFromClient = asyncHandler(async (req, res, next) => {
  const oneRequestFromClient = await RequestFromClient.findById(req.params.id);
  // .populate({ path: 'operatorCode', select: 'operatorCode' });
  //Check if  exists response
  if (!oneRequestFromClient) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneRequestFromClient
  });
});

//@desc   DELETE one RequestFromClient
//@route  DELETE /api/v1/request-from-client/:id
//@access Private
exports.deleteRequestFromClient = asyncHandler(async (req, res, next) => {
  const oneRequestFromClient = await RequestFromClient.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!oneRequestFromClient) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
