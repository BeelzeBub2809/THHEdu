const mongoose = require('mongoose');
const { DbSubmittedQuiz, DbQuiz } = require('../models');
const { questionType } = require('../constants/types');
const JoinedSubjectRepo = require('../repositories/trainee/joinedSubject.repository');

async function submitQuiz(req,res,next){
    try {
        const { quizId, choice, traineeId, subjectId, chapterId} = req.body;

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
        let { mark, isPassed } = calculateMark(choice, quiz, quiz.minMark);

        await DbSubmittedQuiz.create({quizId, choice, traineeId, mark, isPassed});

        if( isPassed ){
            await JoinedSubjectRepo.markLearnedChapter({traineeId, subjectId, chapterId})
        }
        res.status(201).json({ success: true});
    } catch (error) {
        next(error)
    }
}

function calculateMark(choice, quiz, minMark){
    const questionsAndAnswers = quiz.questionId.map(question => ({
        _id: question._id,
        type: question.type,
        answer: question.answer.map(a => ({answerContent: a.answerContent, isCorrected: a.isCorrected}))
    }));

    let mark = 0;
    choice.forEach((c, index) => {
        let mappedQuestionInQuiz = questionsAndAnswers.filter( q => c.questionId == q._id.toString())[0].answer;

        if(c.type !== questionType.MCQ){
            let oneChoose = c.choicePerQuestion.length > 0 ? c.choicePerQuestion[0] : '';
            let isCorrectMapped = mappedQuestionInQuiz.filter(a => {
                if(a.answerContent === oneChoose){
                    return a.isCorrected;
                }
            });
            mark += (isCorrectMapped.length > 0 && isCorrectMapped[0]) ? 1 : 0;
        } else {
            let mappedCount = 0;
            c.choicePerQuestion.map( cp => {
                if( mappedQuestionInQuiz.filter( a => a.answerContent === cp && a.isCorrected).length != 0 ){
                    mappedCount += 1;
                }
            })
            if( mappedQuestionInQuiz.map(a => a.isCorrected).length === mappedCount){
                mark += 1;
            }
        }
    });
    mark = (mark/questionsAndAnswers.length) * 100
    return {mark: mark , isPassed: mark >= minMark};
}

const SubmittedQuizController = {
    submitQuiz
}
module.exports = SubmittedQuizController