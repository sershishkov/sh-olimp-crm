const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOur_CertificateOf_Completion,
  updateOur_CertificateOf_Completion,
  getAllOur_CertificateOf_Completions,
  getOneOur_CertificateOf_Completion,
  deleteOur_CertificateOf_Completion
} = require('../../../controllers/accountant/ourMainData/our_CertificateOf_Completion');

router
  .route('/')
  .get(getAllOur_CertificateOf_Completions)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOur_CertificateOf_Completion
  );

router
  .route('/:id')
  .get(getOneOur_CertificateOf_Completion)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOur_CertificateOf_Completion
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOur_CertificateOf_Completion
  );

module.exports = router;
