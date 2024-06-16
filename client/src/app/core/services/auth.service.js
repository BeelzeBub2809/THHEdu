import { ApiService } from "./api.service";
import { UltisService } from "./utils.service";
import { api } from "../constants/api";
import { role } from "../constants/config";

export class AuthService{

    static userDetail = null;

    static async login(login) {
        return await ApiService.post(UltisService.setUrlValueParams(api.login, login))
            .then((response) => {
                if(response.success){
                    response.data.roleId = role.MANAGER;
                    localStorage.setItem(this.userDetail, JSON.stringify(response));
                }
                return response;
            })
    }

    static getRole() {
        const user = localStorage.getItem(this.userDetail);
        if (!user) {
            return null;
        }
        const userDetail = JSON.parse(user);
        return userDetail.data.roleId;
    }
}