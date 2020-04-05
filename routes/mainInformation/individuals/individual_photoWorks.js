const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  uploadPhoto,
  resizePhoto,
  addPhoto,
  updatePhoto,
  getAllPhotos,
  getOnePhoto,
  deletePhoto,
} = require('../../../controllers/mainInformation/individuals/individual_photoWorks');

router
  .route('/')
  .get(getAllPhotos)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    uploadPhoto,
    resizePhoto,
    addPhoto
  );

router
  .route('/:id')
  .get(getOnePhoto)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    uploadPhoto,
    resizePhoto,
    updatePhoto
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deletePhoto
  );

module.exports = router;
