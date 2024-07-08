import { environment } from '../../../environment/enviroment'

export class ApiService {

    static formatErrors (error){
        throw (error.error);
    }

    static async get(path){
        return await fetch(`${environment.apiUrl}${path}`, {
            method: "GET"
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            ApiService.formatErrors(error);
        });
    }

    static async post(path){
        return await fetch(`${environment.apiUrl}${path}`, {
            method: "POST"
        })
        .then((response) => {
            return response;
        }) 
        .catch((error) => {
            ApiService.formatErrors(error);
        });

    }
}
