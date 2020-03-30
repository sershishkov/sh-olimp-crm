const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Product = require('../../../models/accountant/referenceData/Product');

const Our_SalesInvoiceNakladnaya = require('../../../models/accountant/ourMainData/Our_SalesInvoiceNakladnaya');
const Our_InvoiceMixed = require('../../../models/accountant/ourMainData/Our_InvoiceMixed');
const Our_InvoiceProduct = require('../../../models/accountant/ourMainData/Our_InvoiceProduct');
const Entered_SalesInvoiceNakladnaya = require('../../../models/accountant/enteredMainData/Entered_SalesInvoiceNakladnaya');
const Entered_InvoiceMixed = require('../../../models/accountant/enteredMainData/Entered_InvoiceMixed');
const Entered_InvoiceProduct = require('../../../models/accountant/enteredMainData/Entered_InvoiceProduct');

//@desc   Add a Product
//@route  POST /api/v1/accountant/our-firm
//@access Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newProduct = new Product({
    productName: req.body.productName,
    unit: req.body.unit,
    productGroup: req.body.productGroup,
    amountInPackage: req.body.amountInPackage,
    suppliers: req.body.suppliers,
    ratePerUnit: req.body.ratePerUnit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    weight: req.body.weight
  });

  await newProduct.save();

  res.status(200).json({
    success: true,
    data: newProduct
  });
});

//@desc   Update a Product
//@route  PUT /api/v1/accountant/our-firm/:id
//@access Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newProduct = {
    productName: req.body.productName,
    unit: req.body.unit,
    productGroup: req.body.productGroup,
    amountInPackage: req.body.amountInPackage,
    suppliers: req.body.suppliers,
    ratePerUnit: req.body.ratePerUnit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    weight: req.body.weight
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    newProduct,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedProduct
  });
});

//@desc   Get all Products
//@route  GET /api/v1/accountant/our-firm
//@access Private
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find()
    .sort({
      productName: 1
    })
    .populate({ path: 'unit', select: 'unitNameShort' })
    .populate({ path: 'productGroup', select: 'productGroup' })
    .populate({ path: 'suppliers', select: 'supplierName' });
  //Check if  exists response
  if (!allProducts) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: allProducts
  });
});

//@desc   Get one Product
//@route  GET /api/v1/accountant/our-firm/:id
//@access Private
exports.getOneProduct = asyncHandler(async (req, res, next) => {
  const oneProduct = await Product.findById(req.params.id);
  // .populate({
  //   path: 'unit',
  //   select: 'unitNameLong unitNameShort'
  // })
  // .populate({ path: 'productGroup', select: 'productGroup' })
  // .populate({ path: 'suppliers', select: 'supplierName' });
  //Check if  exists response
  if (!oneProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: oneProduct
  });
});

//@desc   DELETE one Product
//@route  DELETE /api/v1/accountant/our-firm/:id
//@access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const relatedOur_SalesInvoiceNakladnaya = await Our_SalesInvoiceNakladnaya.findOne(
    { 'products.product': req.params.id },
    '_id'
  );
  const relatedOur_InvoiceMixed = await Our_InvoiceMixed.findOne(
    { 'products.product': req.params.id },
    '_id'
  );
  const relatedOur_InvoiceProduct = await Our_InvoiceProduct.findOne(
    { 'products.product': req.params.id },
    '_id'
  );
  const relatedEntered_SalesInvoiceNakladnaya = await Entered_SalesInvoiceNakladnaya.findOne(
    { 'products.product': req.params.id },
    '_id'
  );
  const relateEntered_InvoiceMixed = await Entered_InvoiceMixed.findOne(
    { 'products.product': req.params.id },
    '_id'
  );
  const relatedEntered_InvoiceProduct = await Entered_InvoiceProduct.findOne(
    { 'products.product': req.params.id },
    '_id'
  );

  const forbiddenToDelete =
    relatedOur_SalesInvoiceNakladnaya ||
    relatedOur_InvoiceMixed ||
    relatedOur_InvoiceProduct ||
    relatedEntered_SalesInvoiceNakladnaya ||
    relateEntered_InvoiceMixed ||
    relatedEntered_InvoiceProduct;

  if (forbiddenToDelete) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const oneProduct = await Product.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!oneProduct) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  }
});
