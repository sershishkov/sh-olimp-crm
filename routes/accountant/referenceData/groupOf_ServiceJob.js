const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addGroupOf_ServiceJob,
  updateGroupOf_ServiceJob,
  getAllGroupOf_ServiceJobs,
  getOneGroupOf_ServiceJob,
  deleteGroupOf_ServiceJob
} = require('../../../controllers/accountant/referenceData/groupOf_ServiceJob');

router
  .route('/')
  .get(getAllGroupOf_ServiceJobs)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addGroupOf_ServiceJob
  );

router
  .route('/:id')
  .get(getOneGroupOf_ServiceJob)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateGroupOf_ServiceJob
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteGroupOf_ServiceJob
  );

module.exports = router;
