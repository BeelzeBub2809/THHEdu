const { DbSubject } = require('../models/index')

async function checkDuplicateSubjectName(req,res,next){
  try {
    const { subjectCode, subjectName} = req.body
    const isExistCodeName = await DbSubject.findOne({ $or: [
      {subjectName: subjectName}, 
      {subjectCode: subjectCode}
    ] })
    if(isExistCodeName){
      return res.status(404).json({message: 'This subject already exists'})
    }
    next()
  } catch (error) {
    next(error)
  }
}

const subjectMiddlewares = {
    checkDuplicateSubjectName
}

module.exports = subjectMiddlewares