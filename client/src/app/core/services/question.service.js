import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";

export class QuestionService{

    static async createQuestionBySubject(createCondition){
        return await ApiService.post(UltisService.setUrlValueParams(api.createQuestionBySubject, { subjectId: createCondition.subjectId}),createCondition)
            .then((response) => {
                return response;
            })
    }

    static async getQuestionsBySubject(subjectId, searchCondition){
        return await ApiService.post(UltisService.setUrlValueParams(api.getQuestionBySubject, { subjectId: subjectId }), searchCondition)
            .then((response) => {
                return response
            });
    }
}