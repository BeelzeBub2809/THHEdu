import { ApiService } from "./api.service";
import { api } from "../constants/api";
import { UltisService } from "./utils.service";

export class SubmittedQuizService{

    static async submitQuiz(submitCondition){
        return await ApiService.post(api.submitQuiz, submitCondition)
            .then((response) => {
                return response
            })
    }
}