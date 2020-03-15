const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Entered_SalesInvoiceNakladnaya = require('../../../models/accountant/enteredMainData/Entered_SalesInvoiceNakladnaya');

//@desc   Add a Entered_SalesInvoiceNakladnaya
//@route  POST /api/v1/accountant/entered-service-invoice-nakl
//@access Private
exports.addEntered_SalesInvoiceNakladnaya = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }

    const newEntered_SalesInvoiceNakladnaya = new Entered_SalesInvoiceNakladnaya(
      {
        naklNumber: req.body.naklNumber,
        naclDate: req.body.naclDate,
        ourFirm: req.body.ourFirm,
        client: req.body.client,
        products: req.body.products,
        active: req.body.active,
        cashPayment: req.body.cashPayment
      }
    );

    await newEntered_SalesInvoiceNakladnaya.save();

    res.status(200).json({
      success: true,
      data: newEntered_SalesInvoiceNakladnaya
    });
  }
);

//@desc   Update a Entered_SalesInvoiceNakladnaya
//@route  PUT /api/v1/accountant/entered-service-invoice-nakl/:id
//@access Private
exports.updateEntered_SalesInvoiceNakladnaya = asyncHandler(
  async (req, res, next) => {
    //Check if  exists something in body
    if (!req.body) {
      return next(new ErrorResponse('Не переданы значения', 400));
    }
    const newEntered_SalesInvoiceNakladnaya = {
      naklNumber: req.body.naklNumber,
      naclDate: req.body.naclDate,
      ourFirm: req.body.ourFirm,
      client: req.body.client,
      products: req.body.products,
      active: req.body.active,
      cashPayment: req.body.cashPayment
    };

    const updatedEntered_SalesInvoiceNakladnaya = await Entered_SalesInvoiceNakladnaya.findByIdAndUpdate(
      req.params.id,
      newEntered_SalesInvoiceNakladnaya,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedEntered_SalesInvoiceNakladnaya
    });
  }
);

//@desc   Get all Entered_SalesInvoiceNakladnayas
//@route  GET /api/v1/accountant/entered-service-invoice-nakl
//@access Private
exports.getAllEntered_SalesInvoiceNakladnayas = asyncHandler(
  async (req, res, next) => {
    const allEntered_SalesInvoiceNakladnayas = await Entered_SalesInvoiceNakladnaya.find().sort(
      {
        naclDate: -1
      }
    );
    //Check if  exists response
    if (!allEntered_SalesInvoiceNakladnayas) {
      return next(
        new ErrorResponse('На данный момент ничего в базе нет ', 400)
      );
    }

    res.status(200).json({
      success: true,
      data: allEntered_SalesInvoiceNakladnayas
    });
  }
);

//@desc   Get one Entered_SalesInvoiceNakladnaya
//@route  GET /api/v1/accountant/entered-service-invoice-nakl/:id
//@access Private
exports.getOneEntered_SalesInvoiceNakladnaya = asyncHandler(
  async (req, res, next) => {
    const oneEntered_SalesInvoiceNakladnaya = await Entered_SalesInvoiceNakladnaya.findById(
      req.params.id
    )
      .populate({ path: 'ourFirm', select: 'firmName' })
      .populate({ path: 'client', select: 'firmName' })
      .populate({ path: 'products.product', select: 'productName' });

    //Check if  exists response
    if (!oneEntered_SalesInvoiceNakladnaya) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: oneEntered_SalesInvoiceNakladnaya
    });
  }
);

//@desc   DELETE one Entered_SalesInvoiceNakladnaya
//@route  DELETE /api/v1/accountant/entered-service-invoice-nakl/:id
//@access Private
exports.deleteEntered_SalesInvoiceNakladnaya = asyncHandler(
  async (req, res, next) => {
    const oneEntered_SalesInvoiceNakladnaya = await Entered_SalesInvoiceNakladnaya.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!oneEntered_SalesInvoiceNakladnaya) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
);
