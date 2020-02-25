const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const PhotoOf_Roof = require('../models/PhotoOf_Roof');

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

exports.uploadPhoto = upload.single('photoWork');

exports.resizePhoto = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    // .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 50 })
    .toFile(`uploads/${req.file.filename}`);

  next();
});

//@desc   Add photo
//@route  POST /api/v1/photo/roof
//@access Private
exports.addPhoto = asyncHandler(async (req, res, next) => {
  //Check if photo exists
  if (!req.file) {
    return next(new ErrorResponse('New photo does not exist', 400));
  }
  const image = new PhotoOf_Roof({ image: `/uploads/${req.file.filename}` });

  await image.save();

  res.status(200).json({
    success: true,
    data: image
  });
});

//@desc   Get all photos
//@route  GET /api/v1/photo/roof
//@access Private
exports.getAllPhotos = asyncHandler(async (req, res, next) => {
  const allPhoto = await PhotoOf_Roof.find();
  //Check if photo exists
  if (!allPhoto) {
    return next(new ErrorResponse('На данный момент нет фото в галлерее', 400));
  }

  res.status(200).json({
    success: true,
    data: allPhoto
  });
});

//@desc   Get one photo
//@route  GET /api/v1/photo//roof/:id
//@access Private
exports.getOnePhoto = asyncHandler(async (req, res, next) => {
  const onePhoto = await PhotoOf_Roof.findById(req.params.id);
  //Check if photo exists
  if (!onePhoto) {
    return next(new ErrorResponse('Нет этого фото в галлерее', 400));
  }

  res.status(200).json({
    success: true,
    data: onePhoto
  });
});

//@desc   DELETE one photo
//@route  DELETE /api/v1/photo//roof/:id
//@access Private
exports.deletePhoto = asyncHandler(async (req, res, next) => {
  const onePhoto = await PhotoOf_Roof.findByIdAndDelete(req.params.id);

  //Check if photo exists
  if (!onePhoto) {
    return next(new ErrorResponse('Нет этого фото в галлерее', 400));
  }

  fs.unlink(`.${onePhoto.image}`, err => {
    console.log(err);
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});
