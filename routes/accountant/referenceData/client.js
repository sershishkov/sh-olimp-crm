const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../../middleware/auth');

const {
  addClient,
  updateClient,
  getAllClients,
  getOneClient,
  deleteClient
} = require('../../../controllers/accountant/referenceData/client');

router
  .route('/')
  .get(getAllClients)
  .post(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    addClient
  );

router
  .route('/:id')
  .get(getOneClient)
  .put(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    updateClient
  )
  .delete(
    protect,
    authorize('engineer', 'accountant', 'boss', 'admin'),
    deleteClient
  );

module.exports = router;
