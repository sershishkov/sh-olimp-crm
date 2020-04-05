const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Individual_PhotoWork = require('../../../models/mainInformation/individuals/Individual_PhotoWork');

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
  fileFilter: multerFilter,
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
//@route  POST /api/v1/individual-photo
//@access Private
exports.addPhoto = asyncHandler(async (req, res, next) => {
  //Check if photo exists
  if (!req.file) {
    return next(new ErrorResponse('New photo does not exist', 400));
  }
  const newPhoto = new Individual_PhotoWork({
    imageUrl: `/uploads/${req.file.filename}`,
    imageGroup: req.body.imageGroup,
    description: req.body.description,
  });

  await newPhoto.save();

  res.status(200).json({
    success: true,
    data: newPhoto,
  });
});

//@desc   Update photo
//@route  PUT /api/v1/individual-photo/:id
//@access Private
exports.updatePhoto = asyncHandler(async (req, res, next) => {
  //Check if photo exists
  if (!req.body || !req.params.id) {
    return next(new ErrorResponse('Параметры не переданы', 400));
  }

  const newPhoto = {
    imageGroup: req.body.imageGroup,
    description: req.body.description,
  };

  if (req.file) {
    const oldObj = await Individual_PhotoWork.findById(req.params.id);
    fs.unlink(`.${oldObj.imageUrl}`, (err) => {
      console.log(err);
    });
    newPhoto.imageUrl = `/uploads/${req.file.filename}`;
  }

  const updatedPhoto = await Individual_PhotoWork.findByIdAndUpdate(
    req.params.id,
    newPhoto,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updatedPhoto,
  });
});

//@desc   Get all photos
//@route  GET /api/v1/individual-photo
//@access Private
exports.getAllPhotos = asyncHandler(async (req, res, next) => {
  const allPhoto = await Individual_PhotoWork.find().populate({
    path: 'imageGroup',
    select: 'imageGroup',
  });
  //Check if photo exists
  if (!allPhoto) {
    return next(new ErrorResponse('На данный момент нет фото в галлерее', 400));
  }

  res.status(200).json({
    success: true,
    data: allPhoto,
  });
});

//@desc   Get one photo
//@route  GET /api/v1/individual-photo/:id
//@access Private
exports.getOnePhoto = asyncHandler(async (req, res, next) => {
  const onePhoto = await Individual_PhotoWork.findById(req.params.id);

  //Check if photo exists
  if (!onePhoto) {
    return next(new ErrorResponse('Нет этого фото в галлерее', 400));
  }

  res.status(200).json({
    success: true,
    data: onePhoto,
  });
});

//@desc   DELETE one photo
//@route  DELETE /api/v1/individual-photo/:id
//@access Private
exports.deletePhoto = asyncHandler(async (req, res, next) => {
  const onePhoto = await Individual_PhotoWork.findByIdAndDelete(req.params.id);

  //Check if photo exists
  if (!onePhoto) {
    return next(new ErrorResponse('Нет этого фото в галлерее', 400));
  }

  fs.unlink(`.${onePhoto.imageUrl}`, (err) => {
    console.log(err);
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
