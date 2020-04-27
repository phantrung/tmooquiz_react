import ModelAbstract from "../../../@Core/Api/ModelAbstract";
import {API_ADMIN_USER, API_LOGIN, API_LOGOUT, API_USER_INFO} from "./constants";
import UserHelper from "../../Helper/User";

class User extends ModelAbstract{

    constructor(props) {
        super(props);
        this.BASE_ENDPOINT = API_ADMIN_USER
        this.apiNotAuth = [API_LOGIN]
        this.setRequest()
    }


    login = async (data) => {
        let response = await this.request.post(API_LOGIN,data)
        return new Promise((resolve, reject) => {
            if(response instanceof Object && response.access_token){
                UserHelper.setUserToken(response)
                this.getInfo()
                    .then(res => {
                        let user = res.user
                        user = {
                            ...user,
                            // id : user.id ? user.id : 1,
                            role : 'admin',
                            data : {
                                email : user.email,
                                displayName : user.name,
                                photoURL : 'https://t4.ftcdn.net/jpg/02/04/77/31/500_F_204773130_IUJbxD8fjrGBBOU6ypGm2r1X1PN2pqiy.jpg'
                            }
                        }
                        UserHelper.setDataSession(UserHelper.SESSION_STORAGE,'user',user)
                        resolve(user)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }else{
                reject(response)
            }
        })
    }

    getInfo = async () => {
        return await this.request.post(API_USER_INFO)
    }

    logout = async () => {
        return await this.request.post(API_LOGOUT)
    }
}
const UserModel = new User()
export default UserModel