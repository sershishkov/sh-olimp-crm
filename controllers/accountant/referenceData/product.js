const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Product = require('../../../models/accountant/referenceData/Product');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new ErrorResponse('Not an image! Please upload only images.', 400),
      false
    );
  }
};

const upload = multer({
  limits: 50000,
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPhoto = upload.single('productImage');

exports.resizePhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 50 })
    .toFile(`uploads/${req.file.filename}`);

  next();
});

//@desc   Add a Product
//@route  POST /api/v1/accountant/our-firm
//@access Private
exports.addProduct = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('New photo does not exist', 400));
  }
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }

  const newProduct = new Product({
    productName: req.body.productName,
    productImage: `/uploads/${req.file.filename}`,
    amountInPackage: req.body.amountInPackage,
    productGroup: req.body.productGroup,
    price: req.body.price,
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
    amountInPackage: req.body.amountInPackage,
    productGroup: req.body.productGroup,
    price: req.body.price,
    suppliers: req.body.suppliers,
    ratePerUnit: req.body.ratePerUnit,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    weight: req.body.weight
  };

  if (req.file) {
    const oldObj = await Product.findById(req.params.id);
    fs.unlink(`.${oldObj.productImage}`, err => {
      console.log(err);
    });
    newProduct.productImage = `/uploads/${req.file.filename}`;
  }

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
  const allProducts = await Product.find({}, 'productName ').sort({
    productName: 1
  });
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
  const oneProduct = await Product.findById(req.params.id)
    .populate({
      path: 'unit',
      select: 'unitNameLong unitNameShort'
    })
    .populate({ path: 'productGroup', select: 'productGroup' })
    .populate({ path: 'suppliers', select: 'supplierName' });
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
  const oneProduct = await Product.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!oneProduct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }
  fs.unlink(`.${oneProduct.productImage}`, err => {
    console.log(err);
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});
