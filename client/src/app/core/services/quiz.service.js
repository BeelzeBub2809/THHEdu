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
}