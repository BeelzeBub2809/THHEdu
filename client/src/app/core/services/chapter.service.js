import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";
import { role } from "../constants/config";

export class ChapterService{

    static async createChapterBySubject(createCondition){
        return await ApiService.post(UltisService.setUrlValueParams(api.createChapterBySubject, { subjectId: createCondition.subjectId}),createCondition)
            .then((response) => {
                return response;
            })
    }

    static async getChaptersBySubject(subjectId, searchCondition){
        return await ApiService.post(UltisService.setUrlValueParams(api.getChapterBySubject, { subjectId: subjectId }), searchCondition)
            .then((response) => {
                return response
            });
    }
}