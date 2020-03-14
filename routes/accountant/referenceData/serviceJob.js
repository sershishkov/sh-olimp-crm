const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addServiceJob,
  updateServiceJob,
  getAllServiceJobs,
  getOneServiceJob,
  deleteServiceJob
} = require('../../../controllers/accountant/referenceData/serviceJob');

router
  .route('/')
  .get(getAllServiceJobs)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addServiceJob
  );

router
  .route('/:id')
  .get(getOneServiceJob)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateServiceJob
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteServiceJob
  );

module.exports = router;
