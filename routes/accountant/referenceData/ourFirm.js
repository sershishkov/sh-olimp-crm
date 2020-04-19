const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addOurFirm,
  updateOurFirm,
  getAllOurFirms,
  getOneOurFirm,
  deleteOurFirm
} = require('../../../controllers/accountant/referenceData/ourFirm');

router
  .route('/')
  .get(getAllOurFirms)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addOurFirm
  );

router
  .route('/:id')
  .get(getOneOurFirm)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateOurFirm
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteOurFirm
  );

module.exports = router;
