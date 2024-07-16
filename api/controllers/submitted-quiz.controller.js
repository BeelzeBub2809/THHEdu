const mongoose = require('mongoose');
const { DbSubmittedQuiz, DbQuiz } = require('../models');
const { questionType } = require('../constants/types');

async function submitQuiz(req,res,next){
    try {
        const { quizId, choice, traineeId} = req.body;
            if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ message: 'Invalid quiz' });
            }
            const quiz = await DbQuiz.findById(quizId).populate({
                path: 'questionId',
                select: '_id answer type'
            });
          
            if (!quiz) {
                return { status: 404, message: 'Quiz not found' };
            }
          
              // Trả về dữ liệu câu hỏi và câu trả lời
            const questionsAndAnswers = quiz.questionId.map(question => ({
                _id: question._id,
                type: question.type,
                answer: question.answer.map(a => ({answerContent: a.answerContent, isCorrected: a.isCorrected}))
            }));

            let mark = 0;

            choice.forEach(c => {
                let answerInQuiz = questionsAndAnswers.filter( q => c.questionId == q._id.toString())[0].answer;
                
                if(c.type !== questionType.MCQ){
                    let oneChoose = c.choicePerQuestion.length > 0 ? c.choicePerQuestion[0] : '';

                    let isCorrectMapped = answerInQuiz.filter(a => {
                        if(a.answerContent === oneChoose){
                            return a.isCorrected;
                        }
                    });
                    mark += isCorrectMapped.length > 0 && isCorrectMapped[0] ? 1 : 0;
                } else {
                    let mappedCount = 0;
                    c.choicePerQuestion.map( cp => {
                        if( answerInQuiz.filter( a => a.answerContent === cp && a.isCorrected).length != 0 ){
                            mappedCount += 1;
                        }
                    })
                    if( answerInQuiz.map(a => a.isCorrected).length === mappedCount){
                        mark += 1;
                    }
                }
            });
            
            if(quiz){
                res.status(201)
                const response = await DbSubmittedQuiz.create({quizId, choice, traineeId, mark})

                res.status(201).json(response)
            }
        } catch (error) {
            next(error)
    }

}

const SubmittedQuizController = {
    submitQuiz
}
module.exports = SubmittedQuizController