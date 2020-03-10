const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addWorker,
  updateWorker,
  getAllWorkers,
  getOneWorker,
  deleteWorker
} = require('../../../controllers/accountant/referenceData/worker');

router
  .route('/')
  .get(getAllWorkers)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addWorker
  );

router
  .route('/:id')
  .get(getOneWorker)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateWorker
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteWorker
  );

module.exports = router;
