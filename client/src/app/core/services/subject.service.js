import { ApiService } from "./api.service";
import { api } from "../constants/api";
import { UltisService } from "./utils.service";

export class SubjectService{

    static async getAllSubjects(searchConditions){
        return await ApiService.post(api.getSubjects, searchConditions)
            .then((response) => {
                return response
            })
            .catch((error) => {
                throw error;
            })
    }

    static async createSubject(createConditions){
        return await ApiService.post(api.createSubject, createConditions)
            .then((response) => {
                return response
            })
            .catch((error) => {
                throw error;
            })
    }

    static async updateSubject(updateConditions){
        return await ApiService.put(UltisService.setUrlValueParams(api.updateSubject, {id: updateConditions._id}), updateConditions)
            .then((response) => {
                return response
            })
            .catch((error) => {
                throw error;
            })
    }
}