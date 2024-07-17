const DbTransaction = require("../../models/transaction.model");

async function createPayment(transaction) {
  try {
    const newTransaction = await DbTransaction.create(transaction)
    return newTransaction
  } catch (error) {
    console.log(error);
  }
}

const PaymentRepository = {
  createPayment
}
module.exports = PaymentRepository