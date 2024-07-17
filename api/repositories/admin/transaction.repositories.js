const DbTransaction = require("../../models/transaction.model");

async function getAllTransaction() {
  try {
    const listTransaction = await DbTransaction.find({})
    return listTransaction
  } catch (error) {
    console.log(error);
  }
}

const TransactionRepository = {
  getAllTransaction
}
module.exports = TransactionRepository