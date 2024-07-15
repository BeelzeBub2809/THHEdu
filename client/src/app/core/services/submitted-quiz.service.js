import { ApiService } from "./api.service";
import { api } from "../constants/api";
import { UltisService } from "./utils.service";

export class SubmittedQuizService{

    static async submitQuiz(createConditions){
        return await ApiService.post(api.submitQuiz, createConditions)
            .then((response) => {
                return response
            })
            .catch((error) => {
                throw error;
            })
    }

}