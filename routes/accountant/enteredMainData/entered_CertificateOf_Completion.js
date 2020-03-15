const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addEntered_CertificateOf_Completion,
  updateEntered_CertificateOf_Completion,
  getAllEntered_CertificateOf_Completions,
  getOneEntered_CertificateOf_Completion,
  deleteEntered_CertificateOf_Completion
} = require('../../../controllers/accountant/enteredMainData/entered_CertificateOf_Completion');

router
  .route('/')
  .get(getAllEntered_CertificateOf_Completions)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addEntered_CertificateOf_Completion
  );

router
  .route('/:id')
  .get(getOneEntered_CertificateOf_Completion)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateEntered_CertificateOf_Completion
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteEntered_CertificateOf_Completion
  );

module.exports = router;
