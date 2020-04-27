import axios from 'axios'
import Identify from "../Helper/Identify";
import uniq from 'lodash/uniq'
import UserHelper from "../../@TmooQuiz/Helper/User";
export const refreshToken = async (refresh_token = null) => {
    try{
        refresh_token = refresh_token ? refresh_token : Identify.getDataSession(Identify.LOCAL_STORAGE,'refresh_token')
        // let storeShortCode = Identify.getDataSession(Identify.LOCAL_STORAGE,'store_shortcode')
        // let bodyFormData = new FormData();
        // bodyFormData.set('refresh_token', refresh_token);
        // bodyFormData.set('grant_type', 'refresh_token');
        const API_LOGIN = Identify.getDataSession(Identify.LOCAL_STORAGE,'API_LOGIN')
        const response = await axios({
            method: 'post',
            url : API_LOGIN,
            data : {refresh_token , grant_type : 'refresh_token'  }
        })
        if(response.status === 200){
            const {data} = response
            const {uaaToken} = data
            if(uaaToken.hasOwnProperty('access_token') && uaaToken.access_token){
                Identify.setTokenData(data)
                return {
                    success : true
                }
            }
            return false
        }else{
            return  false
        }
    }catch (e) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.replace('/login')
    }
}

const  getInstance = (baseUrl = null) => {
    const options = {
        baseURL: baseUrl
    };

    const instance = axios.create(options);

    // Add a request interceptor
    instance.interceptors.request.use(
        async requestConfig => {
            let {url} = requestConfig
            let apiNotAuth = Identify.getDataSession(Identify.LOCAL_STORAGE,'apiNotAuth') || []

            // Neu url ko nam trong apiNotAuth hoac ko phai la public-api thi check authentication
            if(url.indexOf('public-api') > -1){
                return requestConfig
            }
            if(!apiNotAuth.includes(url)){

                if(!Identify.isAuthTokenValid()){
                    const isRefreshToken = await UserHelper.refresh_token()
                    // console.log(`===========> isRefreshToken`,isRefreshToken)
                    if(!isRefreshToken){
                        localStorage.clear()
                        sessionStorage.clear()
                        window.location.replace('/login')
                        return
                    }
                }
                // const additionalToken = Identify.getDataSession(Identify.LOCAL_STORAGE,'additionalToken')
                const access_token = localStorage.getItem('access_token')
                requestConfig.headers['Authorization'] = `Bearer ${access_token}`
                // console.log(`===========> url`,url.indexOf('/api/v1/sampleProducts'))
                // if (url.indexOf('/api/v1/sampleProducts') < 0)
                //     requestConfig.headers['additional_token'] = `${additionalToken}`
            }
            // console.log(requestConfig)
            return requestConfig
        },
        (requestError) => {
            // console.log(requestError)

            return Promise.reject(requestError);
        },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        response => {
            if(response.hasOwnProperty('data')){
                if(response.data instanceof Object && response.data.hasOwnProperty('errors')){
                    return Promise.reject(response)
                }
                if(!response.data){
                    return {success : true}
                }
                return  response.data
            }
            return Promise.reject(response)
        },
        (error) => {
            console.log(error)
            if(error instanceof Object && error.response instanceof Object){
                if(error.response.hasOwnProperty('status')){
                    const {status} = error.response
                    if(status === 400){
                        error.response = 'Có lỗi xảy ra , vui lòng kiểm tra lại dữ liệu'.toString()
                    }
                    if(status === 403){
                        error.response = 'Tài khoản của bạn không được phép sử dụng chức năng này'.toString()
                    }
                    if(status === 500){
                        error.response = 'Máy chủ gặp sự cố kỹ thuật, vui lòng kiểm tra lại'.toString()
                    }
                }
            }
            if(!navigator.onLine){
                error = {
                    response : 'Network disconnect'
                }
            }
            console.log(`===========> error.response`,error.response)

            return Promise.reject(error.response);
        },
    );

    return instance;
}

class ApiAbstract {
    constructor(baseUrl = null){
        this.requestApi = getInstance(baseUrl)
    }

    setApiNotAuth(endpoints = []) {
        let apiNotAuth = Identify.getDataSession(Identify.LOCAL_STORAGE,'apiNotAuth') || []
        if(endpoints instanceof Array && endpoints.length > 0){
            apiNotAuth = uniq([...apiNotAuth,...endpoints])
            Identify.setDataSession(Identify.LOCAL_STORAGE,'apiNotAuth',apiNotAuth)
        }

    }

    get(url, conf = {}) {
        return this.requestApi.get(url, conf)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }

    delete(url, conf = {}) {
        return this.requestApi.delete(url, conf)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }

    head(url, conf = {}) {
        return this.requestApi.head(url, conf)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }

    options(url, conf = {}) {
        return this.requestApi.options(url, conf)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }

    post(url, data = {}, conf = {}) {
        return this.requestApi.post(url, data, conf)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }

    put(url, data = {}, conf = {}) {
        return this.requestApi.put(url, data, conf)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }

    patch(url, data = {}, conf = {}) {
        return this.requestApi.patch(url, data, conf)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }
}
export {ApiAbstract}

export const handleResponse = response => {
    if (response && response.errors) {
        return Promise.reject(response);
    }

    return Promise.resolve(response);
};
