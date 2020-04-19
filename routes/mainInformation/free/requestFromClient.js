const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addRequestFromClient,
  updateRequestFromClient,
  getAllRequestFromClients,
  getOneRequestFromClient,
  deleteRequestFromClient
} = require('../../../controllers/mainInformation/free/requestFromClient');

router
  .route('/')
  .get(getAllRequestFromClients)
  .post(
    // protect,
    // authorize('engineer', 'accountant', 'boss', 'admin'),
    addRequestFromClient
  );

router
  .route('/:id')
  .get(getOneRequestFromClient)
  .put(
    protect,
    // authorize('engineer', 'accountant', 'boss', 'admin'),
    updateRequestFromClient
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteRequestFromClient
  );

module.exports = router;
