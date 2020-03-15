const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_CertificateOf_Completion = require('../../../models/accountant/ourMainData/Our_CertificateOf_Completion');

//@desc   Add a Our_CertificateOf_Completion
//@route  POST /api/v1/accountant/our-certificate-of-completion
//@access Private
exports.addOur_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }

    const newOur_CertificateOf_Completion = new Our_CertificateOf_Completion({
      certificatNumber: req.body.certificatNumber,
      cerificateDate: req.body.cerificateDate,
      ourFirm: req.body.ourFirm,
      client: req.body.client,
      serviceJobs: req.body.serviceJobs,
      active: req.body.active
    });

    await newOur_CertificateOf_Completion.save();

    res.status(200).json({
      success: true,
      data: newOur_CertificateOf_Completion
    });
  }
);

//@desc   Update a Our_CertificateOf_Completion
//@route  PUT /api/v1/accountant/our-certificate-of-completion/:id
//@access Private
exports.updateOur_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }
    const newOur_CertificateOf_Completion = {
      certificatNumber: req.body.certificatNumber,
      cerificateDate: req.body.cerificateDate,
      ourFirm: req.body.ourFirm,
      client: req.body.client,
      serviceJobs: req.body.serviceJobs,
      active: req.body.active
    };

    const updatedOur_CertificateOf_Completion = await Our_CertificateOf_Completion.findByIdAndUpdate(
      req.params.id,
      newOur_CertificateOf_Completion,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedOur_CertificateOf_Completion
    });
  }
);

//@desc   Get all Our_CertificateOf_Completions
//@route  GET /api/v1/accountant/our-certificate-of-completion
//@access Private
exports.getAllOur_CertificateOf_Completions = asyncHandler(
  async (req, res, next) => {
    const allOur_CertificateOf_Completions = await Our_CertificateOf_Completion.find().sort(
      {
        cerificateDate: -1
      }
    );
    //Check if  exists response
    if (!allOur_CertificateOf_Completions) {
      return next(
        new ErrorResponse('На данный момент ничего в базе нет ', 400)
      );
    }

    res.status(200).json({
      success: true,
      data: allOur_CertificateOf_Completions
    });
  }
);

//@desc   Get one Our_CertificateOf_Completion
//@route  GET /api/v1/accountant/our-certificate-of-completion/:id
//@access Private
exports.getOneOur_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    const oneOur_CertificateOf_Completion = await Our_CertificateOf_Completion.findById(
      req.params.id
    )
      .populate({ path: 'ourFirm', select: 'firmName' })
      .populate({ path: 'client', select: 'firmName' })
      .populate({ path: 'serviceJobs.serviceJob', select: 'serviceName' });

    //Check if  exists response
    if (!oneOur_CertificateOf_Completion) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: oneOur_CertificateOf_Completion
    });
  }
);

//@desc   DELETE one Our_CertificateOf_Completion
//@route  DELETE /api/v1/accountant/our-certificate-of-completion/:id
//@access Private
exports.deleteOur_CertificateOf_Completion = asyncHandler(
  async (req, res, next) => {
    const oneOur_CertificateOf_Completion = await Our_CertificateOf_Completion.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneOur_CertificateOf_Completion) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
);
