import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";

export class ChapterProgressService{
    static async getStatusLearningChapters(traineeId, subjectId){
        return await ApiService.get(UltisService.setUrlValueParams(api.getStatusLearningChapter, {traineeId: traineeId, subjectId: subjectId}))
            .then((response) => {
                return response
            });
    }

    static async markStatusLearningChapter(markCondition){
        return await ApiService.post(api.markStatusLearningChapter, markCondition)
            .then((response) => {
                return response
            });
    }
}