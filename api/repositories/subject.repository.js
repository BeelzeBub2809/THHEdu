const { DbSubject, DbUser } = require('../models/index.js')

async function getAllSubjects({queryAllSubjects}) {
    const listSubjects = await DbSubject.find(queryAllSubjects).populate('manager').populate('createBy');
    if(!listSubjects){
        return null;
    }

    return listSubjects.map( subject => ({
        ...subject.toObject(),
        manager: {_id: subject.manager._id, fullname: subject.manager.fullname},
        createBy: {_id: subject.createBy._id, fullname: subject.createBy.fullname},
    }))
}

async function getDetailSubject(subjectId) {
    const subject = await DbSubject.findById(subjectId).populate('manager').populate('createBy')
    if (!subject) {
        return null;
    }
    const mappedSubject = {
        ...subject.toObject(),
        manager: subject.manager.fullname,
        createBy: subject.createBy.fullname,
    }
    return mappedSubject
}

async function updateSubject({subjectId, ...updateCondition}) {
    const updateSubject = await DbSubject.findByIdAndUpdate(
        subjectId,
        {
            $set: {
                subjectCode: updateCondition.subjectCode,
                subjectName: updateCondition.subjectName,
                description: updateCondition.description,
                isActive: updateCondition.isActive,
                price: updateCondition.price,
            }
        },
        {new: true, runValidators: true}
    )
    return updateSubject
}

const SubjectRepo = {
    getAllSubjects, getDetailSubject, updateSubject
}
module.exports = SubjectRepo