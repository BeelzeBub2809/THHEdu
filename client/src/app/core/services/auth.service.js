import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";
export default class AuthService{

    static async login(login) {
        return await ApiService.post(UltisService.setUrlValueParams(api.login, login))
            .then((response) => {
                return response;
            })
    }
}