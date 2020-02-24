const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  uploadPhoto,
  resizePhoto,
  addPhoto,
  getAllPhotos,
  getOnePhoto,
  deletePhoto
} = require('../controllers/photoWorksEmergencyWork');

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
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deletePhoto
  );

module.exports = router;
