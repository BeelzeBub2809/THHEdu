const mongoose = require('mongoose');
const { DbSubmittedQuiz } = require('../models');

async function submitQuiz(req,res,next){
    try {
        const { quizId, choice, time} = req.body;
            if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz' });
            }
            
            const response = await DbSubmittedQuiz.create({quizId, choice, time})
            
            res.status(201).json(response)
        } catch (error) {
            next(error)
    }

}

const SubmittedQuizController = {
    submitQuiz
}
module.exports = SubmittedQuizController