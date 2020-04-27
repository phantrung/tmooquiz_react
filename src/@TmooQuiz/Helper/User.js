import Identify from "../../@Core/Helper/Identify";
import axios from "axios";
import env from 'envApi.json'
class UserHelper extends Identify{

    static setUserToken(data){
        const {access_token,expires_in} = data
        let expired_time = new Date().getTime() + expires_in*1000 - 30000
        let expired_date = this.formatDate(expired_time,'H:i:s d/m/Y')
        console.log(`===========> access_token`,access_token)
        localStorage.setItem('access_token',access_token)
        localStorage.setItem('expired_time',expired_time)
        localStorage.setItem('expired_date',expired_date)
    }

    static  refresh_token(){
        const api = env.BE_SERVICE + '/api/v1/auth/refresh'
        let access_token = this.getDataSession(Identify.LOCAL_STORAGE,'access_token')
        return new Promise((resolve, reject) => {
            axios.post(api,{},{
                headers : {
                    'Authorization' : `Bearer ${access_token}`
                }
            })
                .then(response => {
                    const {data} = response
                    if(data instanceof Object && data.hasOwnProperty('access_token') && data.access_token){
                        this.setUserToken(data)
                        resolve(true)
                    }else{
                        reject(false)
                    }
                })
                .catch(error => {
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.replace('/login')
                })
        })
    }
}
export default UserHelper