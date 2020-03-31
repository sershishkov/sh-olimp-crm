const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_WorkersSalary,
  updateOur_WorkersSalary,
  getAllOur_WorkersSalarys,
  getOneOur_WorkersSalary,
  deleteOur_WorkersSalary
} = require('../../../controllers/accountant/ourMainData/our_WorkersSalary');

router
  .route('/')
  .get(getAllOur_WorkersSalarys)
  .post(
    protect,
    authorize('accountant', 'boss', 'admin'),
    addOur_WorkersSalary
  );

router
  .route('/:id')
  .get(getOneOur_WorkersSalary)
  .put(
    protect,
    authorize('accountant', 'boss', 'admin'),
    updateOur_WorkersSalary
  )
  .delete(
    protect,
    authorize('accountant', 'boss', 'admin'),
    deleteOur_WorkersSalary
  );

module.exports = router;
