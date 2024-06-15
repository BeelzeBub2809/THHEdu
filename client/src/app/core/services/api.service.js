import { environment } from '../../../environment/enviroment'

export class ApiService {
    static async post(path){
        return await fetch(`${environment.apiUrl}${path}`, {
            method: "POST"
        })
        .then((response) => {
            return response;
        });

    }
}
