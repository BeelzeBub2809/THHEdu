import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";

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

    static async editChapter(chapterId, editCondition){
        return await ApiService.put(UltisService.setUrlValueParams(api.updateChapter, { chapterId: chapterId }), editCondition)
            .then((response) => {
                return response
            });
    }
}