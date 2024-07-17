const TransactionRepository = require("../../repositories/admin/transaction.repositories")

async function getAllTransaction(req, res, next) {
  try {
    const listTransaction = await TransactionRepository.getAllTransaction()
    return res.status(200).json(listTransaction)
  } catch (error) {
    next(error)
  }
}
const TransactionController = {
  getAllTransaction
}
module.exports = TransactionController