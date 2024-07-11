import { ApiService } from "./api.service";
import { api } from "../constants/api";

export class UserService{

    static async getAllUsers(searchCondtitions){
        return await ApiService.post(api.getUsers, searchCondtitions)
            .then((response) => {
                return response
            })
    }
}