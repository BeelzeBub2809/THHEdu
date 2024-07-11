import { environment } from '../../../environment/enviroment'
import { UltisService } from './utils.service';
export class ApiService {

    static formatErrors (error){
        throw (error.error);
    }

    static async get(path){
        return await fetch(`${environment.apiUrl}${path}`, {
            method: "GET"
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .catch((error) => {
            ApiService.formatErrors(error);
        });
    }

    static async post(path, body){
        return await fetch(`${environment.apiUrl}${path}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response.json();
        }) 
        .catch((error) => {
            ApiService.formatErrors(error);
        });
    }

    static async put(path, body){
        return await fetch(`${environment.apiUrl}${path}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response.json();
        }) 
        .catch((error) => {
            ApiService.formatErrors(error);
        });
    }

    static async delete(path, body){
        return await fetch(`${environment.apiUrl}${path}`, {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response.json();
        }) 
        .catch((error) => {
            ApiService.formatErrors(error);
        });
    }
}
