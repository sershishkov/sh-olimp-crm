const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addCity,
  updateCity,
  getAllCitys,
  getOneCity,
  deleteCity
} = require('../../../controllers/accountant/referenceData/city');

router
  .route('/')
  .get(getAllCitys)
  .post(protect, authorize('engineer', 'accountant', 'boss', 'admin'), addCity);

router
  .route('/:id')
  .get(getOneCity)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateCity
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteCity
  );

module.exports = router;
