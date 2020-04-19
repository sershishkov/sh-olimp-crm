const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Our_SalesInvoiceNakladnaya = require('../../../models/accountant/ourMainData/Our_SalesInvoiceNakladnaya');

//@desc   Add a Our_SalesInvoiceNakladnaya
//@route  POST /api/v1/accountant/our-service-invoice-nakl
//@access Private
exports.addOur_SalesInvoiceNakladnaya = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newOur_SalesInvoiceNakladnaya = new Our_SalesInvoiceNakladnaya({
    naklNumber: req.body.naklNumber,
    naclDate: req.body.naclDate,
    ourFirm: req.body.ourFirm,
    client: req.body.client,
    products: req.body.products,
    active: req.body.active,
    cashPayment: req.body.cashPayment
  });

  await newOur_SalesInvoiceNakladnaya.save();

  res.status(200).json({
    success: true,
    data: newOur_SalesInvoiceNakladnaya
  });
});

//@desc   Update a Our_SalesInvoiceNakladnaya
//@route  PUT /api/v1/accountant/our-service-invoice-nakl/:id
//@access Private
exports.updateOur_SalesInvoiceNakladnaya = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }
    const newOur_SalesInvoiceNakladnaya = {
      naklNumber: req.body.naklNumber,
      naclDate: req.body.naclDate,
      ourFirm: req.body.ourFirm,
      client: req.body.client,
      products: req.body.products,
      active: req.body.active,
      cashPayment: req.body.cashPayment
    };

    const updatedOur_SalesInvoiceNakladnaya = await Our_SalesInvoiceNakladnaya.findByIdAndUpdate(
      req.params.id,
      newOur_SalesInvoiceNakladnaya,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedOur_SalesInvoiceNakladnaya
    });
  }
);

//@desc   Get all Our_SalesInvoiceNakladnayas
//@route  GET /api/v1/accountant/our-service-invoice-nakl
//@access Private
exports.getAllOur_SalesInvoiceNakladnayas = asyncHandler(
  async (req, res, next) => {
    const allOur_SalesInvoiceNakladnayas = await Our_SalesInvoiceNakladnaya.find()
      .sort({
        naclDate: -1
      })
      .populate({ path: 'ourFirm', select: 'firmName' })
      .populate({ path: 'client', select: 'firmName' })
      .populate({
        path: 'products.product',
        select: 'productName _id'
      });
    //Check if  exists response
    if (!allOur_SalesInvoiceNakladnayas) {
      return next(
        new ErrorResponse('На данный момент ничего в базе нет ', 400)
      );
    }

    res.status(200).json({
      success: true,
      data: allOur_SalesInvoiceNakladnayas
    });
  }
);

//@desc   Get one Our_SalesInvoiceNakladnaya
//@route  GET /api/v1/accountant/our-service-invoice-nakl/:id
//@access Private
exports.getOneOur_SalesInvoiceNakladnaya = asyncHandler(
  async (req, res, next) => {
    const oneOur_SalesInvoiceNakladnaya = await Our_SalesInvoiceNakladnaya.findById(
      req.params.id
    );
    // .populate({ path: 'ourFirm', select: 'firmName' })
    // .populate({ path: 'client', select: 'firmName' })
    // .populate({ path: 'products.product', select: 'productName' });

    //Check if  exists response
    if (!oneOur_SalesInvoiceNakladnaya) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: oneOur_SalesInvoiceNakladnaya
    });
  }
);

//@desc   DELETE one Our_SalesInvoiceNakladnaya
//@route  DELETE /api/v1/accountant/our-service-invoice-nakl/:id
//@access Private
exports.deleteOur_SalesInvoiceNakladnaya = asyncHandler(
  async (req, res, next) => {
    const oneOur_SalesInvoiceNakladnaya = await Our_SalesInvoiceNakladnaya.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneOur_SalesInvoiceNakladnaya) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
);
