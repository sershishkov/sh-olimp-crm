const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Entered_CertificateOf_Completion = require('../../../models/accountant/enteredMainData/Entered_CertificateOf_Completion');

//@desc   Add a Entered_CertificateOf_Completion
//@route  POST /api/v1/accountant/entered-certificate-of-completion
//@access Private
exports.addEntered_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }

    const newEntered_CertificateOf_Completion = new Entered_CertificateOf_Completion(
      {
        certificatNumber: req.body.certificatNumber,
        cerificateDate: req.body.cerificateDate,
        ourFirm: req.body.ourFirm,
        client: req.body.client,
        serviceJobs: req.body.serviceJobs,
        active: req.body.active,
        cashPayment: req.body.cashPayment
      }
    );

    await newEntered_CertificateOf_Completion.save();

    res.status(200).json({
      success: true,
      data: newEntered_CertificateOf_Completion
    });
  }
);

//@desc   Update a Entered_CertificateOf_Completion
//@route  PUT /api/v1/accountant/entered-certificate-of-completion/:id
//@access Private
exports.updateEntered_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }
    const newEntered_CertificateOf_Completion = {
      certificatNumber: req.body.certificatNumber,
      cerificateDate: req.body.cerificateDate,
      ourFirm: req.body.ourFirm,
      client: req.body.client,
      serviceJobs: req.body.serviceJobs,
      active: req.body.active,
      cashPayment: req.body.cashPayment
    };

    const updatedEntered_CertificateOf_Completion = await Entered_CertificateOf_Completion.findByIdAndUpdate(
      req.params.id,
      newEntered_CertificateOf_Completion,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedEntered_CertificateOf_Completion
    });
  }
);

//@desc   Get all Entered_CertificateOf_Completions
//@route  GET /api/v1/accountant/entered-certificate-of-completion
//@access Private
exports.getAllEntered_CertificateOf_Completions = asyncHandler(
  async (req, res, next) => {
    const allEntered_CertificateOf_Completions = await Entered_CertificateOf_Completion.find().sort(
      {
        cerificateDate: -1
      }
    );
    //Check if  exists response
    if (!allEntered_CertificateOf_Completions) {
      return next(
        new ErrorResponse('На данный момент ничего в базе нет ', 400)
      );
    }

    res.status(200).json({
      success: true,
      data: allEntered_CertificateOf_Completions
    });
  }
);

//@desc   Get one Entered_CertificateOf_Completion
//@route  GET /api/v1/accountant/entered-certificate-of-completion/:id
//@access Private
exports.getOneEntered_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    const oneEntered_CertificateOf_Completion = await Entered_CertificateOf_Completion.findById(
      req.params.id
    )
      .populate({ path: 'ourFirm', select: 'firmName' })
      .populate({ path: 'client', select: 'firmName' })
      .populate({ path: 'serviceJobs.serviceJob', select: 'serviceName' });

    //Check if  exists response
    if (!oneEntered_CertificateOf_Completion) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: oneEntered_CertificateOf_Completion
    });
  }
);

//@desc   DELETE one Entered_CertificateOf_Completion
//@route  DELETE /api/v1/accountant/entered-certificate-of-completion/:id
//@access Private
exports.deleteEntered_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    const oneEntered_CertificateOf_Completion = await Entered_CertificateOf_Completion.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneEntered_CertificateOf_Completion) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
);
