const { DbSubject, DbUser } = require('../models/index.js')
const  SubjectRepo = require('../repositories/subject.repository')
const {userAdminRepo} = require('../repositories/admin/admin.repositories.js')
const mongoose = require('mongoose')

async function getAllSubjects(req,res,next){
  try {
    let {page=1, size=15, ...searchConditions} = req.body;
    size = parseInt(size) >= 20 ? 20 : parseInt(size);
    page = parseInt(page);
    
    let queryUserId  = { fullname: { $regex: `.*${searchConditions.searchString}.*`, $options: 'i'}};
    const listUserId = await userAdminRepo.getUserIdByQuery(queryUserId);
    
    let queryAllSubjects = {}; 
    if (searchConditions.searchString) {
      queryAllSubjects.$or = [
        { subjectName: { $regex: `.*${searchConditions.searchString}.*`, $options: 'i' } },
        { subjectCode: { $regex: `.*${searchConditions.searchString}.*`, $options: 'i' } },
        { manager : { $in : listUserId }}
      ]
    }
    let listSubjects = await SubjectRepo.getAllSubjects({page, size, queryAllSubjects});
    let maxPage = Math.ceil(listSubjects.length/size);

    res.status(200).json({
      subjects: listSubjects.slice((page - 1) * size, page * size),
      pagination: {
        size: size,
        maxPage: maxPage,
      }
    })
  } catch (error) {
    next(error)
  }
}

async function createSubject(req, res, next){
  try {
    const {
      subjectCode,
      subjectName,
      description,
      isActive,
      price,
      createBy
    } = req.body;

    const newSubject = await DbSubject.create({ subjectCode, subjectName, description,isActive, manager: createBy, price, createBy: createBy })
    res.status(201).json(newSubject)
  } catch (error) {
    next(error)
  }
}

async function getDetailSubject(req,res,next){
  try {
    const subjectId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ message: 'Invalid subject' });
    }
    const subject = await SubjectRepo.getDetailSubject(subjectId)
    if(subject){
      return res.status(200).json(subject)
    }
    return res.status(404).json({message: 'Cannot find this subject'})
  } catch (error) {
    next(error)
  }
}

async function updateSubject(req,res,next){
  try {
    const subjectId = req.params.id;
    const { subjectCode, subjectName, description, isActive, price } = req.body;

    const updateSubject = await SubjectRepo.updateSubject({ subjectId, subjectCode, subjectName, description, isActive, price });
    res.status(201).json(updateSubject);
  } catch (error) {
    next(error)
  }
}

const SubjectController = {
  getAllSubjects, createSubject, getDetailSubject, updateSubject
}
module.exports = SubjectController