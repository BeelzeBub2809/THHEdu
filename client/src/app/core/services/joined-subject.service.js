import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";

export class JoinedSubjectService{

    static async getLearnedChapterBySubject(traineeId, subjectId){
        return await ApiService.get(UltisService.setUrlValueParams(api.getLearnedChapterBySubject, {traineeId: traineeId, subjectId: subjectId}))
            .then((response) => {
                return response;
            })
    }

    static async markLearnedChapter(traineeId, subjectId, chapterId){
        return await ApiService.post(api.markLearnedChapter, {traineeId: traineeId, subjectId: subjectId, chapterId: chapterId})
            .then((response) => {
                return response;
            })
    }
}