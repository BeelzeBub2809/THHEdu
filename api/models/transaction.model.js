const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  partnerCode: { type: String },
  orderId: { type: String },
  requestId: { type: String },
  amount: { type: Number },
  orderInfo: { type: String },
  orderType: { type: String },
  transId: { type: Number },
  resultCode: { type: Number },
  message: { type: String },
  payType: { type: String },
  responseTime: { type: Number },
  extraData: { type: String, default: '' },
  signature: { type: String },
});

const DbTransaction = mongoose.model('Transaction', transactionSchema);
module.exports = DbTransaction;
