const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  uploadWorkPhoto,
  resizeWorkPhoto,
  addPhoto,
  getAllPhotos,
  getOnePhoto,
  deletePhoto
} = require('../controllers/photoWorks');

router
  .route('/')
  .get(getAllPhotos)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    uploadWorkPhoto,
    resizeWorkPhoto,
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
