const { DbUser } = require('../models/index')

async function checkDuplicateEmail(req,res,next){
  try {
    const isExistEmail = await DbUser.findOne({ email: req.body.email })
    if(isExistEmail && isExistEmail._id.toString() !== req.params.id){
      return res.status(409).json({message: 'Email already exists'})
    }
    next()
  } catch (error) {
    next(error)
  }
}

const userMiddlewares = {
  checkDuplicateEmail
}

module.exports = userMiddlewares