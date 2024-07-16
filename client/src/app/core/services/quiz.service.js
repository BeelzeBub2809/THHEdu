import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";
import { role } from "../constants/config";

export class QuizService{

    static async getInfoQuiz(fetchCondition){
        return await ApiService.get(UltisService.setUrlValueParams(api.learningQuiz, fetchCondition))
            .then((response) => {
                return response
            });
    }

    static async getQuizBySubject(subjectId){
        return await ApiService.get(UltisService.setUrlValueParams(api.getQuizBySubject, { subjectId: subjectId}))
            .then((response) => {
                return response
            });
    }

    static async createQuizBySubject(createCondition){
        return await ApiService.post(UltisService.setUrlValueParams(api.createQuizBySubject, { subjectId: createCondition.subjectId}), createCondition)
            .then((response) => {
                return response;
            })
    }

    static async getQuestionByQuiz(quizId){
        return await ApiService.get(UltisService.setUrlValueParams(api.getQuestionByQuiz, { quizId: quizId}))
            .then((response) => {
                return response
            });
    }

    static async getQuizByChapter(chapterId){
        return await ApiService.get(UltisService.setUrlValueParams(api.getQuizByChapter, { chapterId: chapterId}))
            .then((response) => {
                return response
            });
    }
}