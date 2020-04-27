import md5 from 'js-md5';
import * as Actions from 'app/store/actions'
import _find from 'lodash/find'
import jwt_decode from "jwt-decode";
import {UPLOAD_STATIC_URL} from "../Api/constants";
import _pick from 'lodash/pick'
const $ = window.$;

class Identify {
    static SESSION_STORAGE = 1;
    static LOCAL_STORAGE = 2;
    static PRODUCT_ALIAS = 'HPDESIGN'
    //main functions

    static makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return md5(text + Date.now());
    }

    //storage handling

    static setDataSession(type, key, data) {
        if (typeof(Storage) !== "undefined") {
            if (!key)
                return;
            //process data
            let pathConfig = key.split('/');
            let rootConfig = key;
            if (pathConfig.length === 1) {
                rootConfig = pathConfig[0];
            }
            //save to storegae
            data = JSON.stringify(data);
            if (type === this.SESSION_STORAGE) {
                sessionStorage.setItem(rootConfig, data);
                return;
            }

            if (type === this.LOCAL_STORAGE) {
                localStorage.setItem(rootConfig, data);
                return;
            }
        }
        // console.log('This Browser dont supported storeage');
    }


    static getDataSession(type, key) {
        if (typeof(Storage) !== "undefined") {
            //process data
            let value = "";
            let data = '';
            if (type === this.SESSION_STORAGE) {
                value = sessionStorage.getItem(key);
            }

            if (type === this.LOCAL_STORAGE) {
                value = localStorage.getItem(key);
            }

            try {
                data = JSON.parse(value) || null;
            } catch (err) {
                data = value;
            }
            return data
        }
        // console.log('This browser does not support local storage');
    }

    static removeDataSession(type,key){
        if (typeof(Storage) !== "undefined") {
            if (type === this.SESSION_STORAGE) {
                sessionStorage.removeItem(key)
            }
            if (type === this.LOCAL_STORAGE) {
                localStorage.removeItem(key)
            }
        }
        console.log('This browser does not support local storage');
    }

    static detectPlatforms() {
        if (navigator.userAgent.match(/iPad|iPhone|iPod/)) {
            return 1;
        } else if (navigator.userAgent.match(/Android/)) {
            return 2;
        } else {
            return 3;
        }
    }


    //string handling

    static validateEmail(email) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    };

    static validatePhone(str) {
        //eslint-disable-next-line
        return /(09|01[2|6|8|9])+([0-9]{8})\b/i.test(str)
    }

    //validate Password
    static validatePassword = password => {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    }

    static capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //others

    static isOnLine() {
        let isOnline = true;
        window.addEventListener('load', function () {
            function updateOnlineStatus() {
                if (!navigator.onLine) {
                    isOnline = false;
                }
            }
            window.addEventListener('online', updateOnlineStatus);
            window.addEventListener('offline', updateOnlineStatus);
        });
        return isOnline;
    }


    static smoothScrollToView = (querySelector, duration = 350) => {
        if(querySelector && querySelector.offset() instanceof Object){
            let offsetTop = querySelector.offset().top;

            let elementHeight = querySelector.height();
            let windowHeight = $(window).height();
            let offset = offsetTop;

            if (elementHeight < windowHeight) {
                offset = offsetTop - ((windowHeight / 2) - (elementHeight / 2));
            }

            $('html, body').animate({
                scrollTop: offset
            }, duration);
        }

    }

    static checkAddToHomeScreen(){
        return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
    }

    static convertStringToSlug(str){
        return str.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    }
    static setItemCookie(name, value, days) {
        let d = new Date();
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

    static getItemCookie(name) {
        let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    static deleteItemCookie(name) {
        this.setItemCookie(name, '', -1);
    }

    static isEmpty(obj){
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    static formatDate(date,format = 'd/m/Y') {
        date = new Date(date);
        let m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d
        let y = date.getFullYear()
        let H = date.getHours()
        H = H < 10 ? '0' + H : H
        let i = date.getMinutes()
        i = i < 10 ? '0' + i : i
        let s = date.getSeconds()
        s = s < 10 ? '0' + s : s
        return format.replace('d',d)
            .replace('m',m)
            .replace('Y',y)
            .replace('H',H)
            .replace('i',i)
            .replace('s',s);
    }

    static isAuthTokenValid(){
        const expired_time = this.getDataSession(this.LOCAL_STORAGE,'expired_time')

        if(!expired_time) return false

        const currentTime = Date.now();
        if ( expired_time < currentTime )
        {
            console.log('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    static setTokenData (data) {
        const {uaaToken,storeToken,featureToken,additionalToken} = data
        const {access_token,refresh_token,expires_in} = uaaToken
        let expired_time = new Date().getTime() + expires_in*1000 - 30000
        let expired_date = Identify.formatDate(expired_time,'H:i:s d/m/Y')
        localStorage.setItem('access_token',access_token)
        localStorage.setItem('refresh_token',refresh_token)
        localStorage.setItem('expired_time',expired_time)
        localStorage.setItem('expired_date',expired_date)
        if(additionalToken){
            this.setDataSession(this.LOCAL_STORAGE,'additionalToken',additionalToken)
            let additionalToken_data = jwt_decode(additionalToken)
            this.setDataSession(this.LOCAL_STORAGE,'additionalToken_data',additionalToken_data)
        }
        this.setDataSession(this.LOCAL_STORAGE,'storeToken',storeToken)
        let selected_store = this.getDataSession(this.LOCAL_STORAGE,'selected_store') || null
        if(selected_store instanceof Object){
            let store = _find(storeToken,{storeId : selected_store.storeId})
            this.setDataSession(this.LOCAL_STORAGE,'selected_store',store)
        }
        this.setDataSession('featureToken',featureToken)
    }

    static handleSuccessResponse (res,dispatch = null){
        let msg = null;
        if(res instanceof String){
            msg = res;
        } else if (res instanceof Object) {
            if(res.messages instanceof Array){
                msg = res.messages[0].message
            }else if(res.message){
                msg = res.message
            }
        }
        if(dispatch){
            dispatch(
                Actions.showMessage({
                    message : msg,
                    variant : 'success'
                })
            )
        }
        this.hideLoadingPage()
    }

    static handleErrorResponse (res,dispatch = null) {
        console.log(`===========> err`,res)
        let msg = null;
        if(typeof res === 'string'){
            msg = res;
        } else if (res instanceof Object) {
            if(!res.data instanceof Object){
                msg = 'Có lỗi xảy ra, vui lòng thử lại !'
            }
            else if(res.errors instanceof Array){
                msg = res.errors[0].message
            }
            else if(res.data.errors){
                msg = res.data.errors[0].message
            }else if(res.data.message){
                msg = res.data.message
            }else{
                msg = 'Có lỗi xảy ra, vui lòng thử lại !'
            }
        } else {
            msg = 'Có lỗi xảy ra, vui lòng thử lại !'
        }
        if(dispatch){
            dispatch(
                Actions.showMessage({
                    message : msg,
                    variant : 'error'
                })
            )
        }
        this.hideLoadingPage(500)
        console.log(msg)
        return msg
    }

    static showLoadingPage () {
        document.getElementById('loading-page').style.display = 'block'
    }

    static hideLoadingPage(timeout = 0){
        setTimeout(()=>{
            document.getElementById('loading-page').style.display = 'none'
        },timeout)
    }

    static getUserData(key = ''){
        let user = this.getDataSession(this.LOCAL_STORAGE,'user') || {}
        if(key && user.hasOwnProperty('data')){
            return user[key]
        }
        return user
    }

    static showSuccessMsg(msg = '',dispatch = null){
        if(dispatch){
            dispatch(Actions.showMessage({
                variant: 'success',
                message : msg,
                autoHideDuration : 3000
            }))
        }
    }

    static showErrorMsg(msg = '',dispatch = null){
        if(dispatch){
            dispatch(Actions.showMessage({
                variant: 'error',
                message : msg,
                autoHideDuration : 3000
            }))
        }
    }

    static getQueryUrlObject () {
        let params = new URLSearchParams(window.location.search)
        let result = {}
        // eslint-disable-next-line
        for(let entry of params) { // each 'entry' is a [key, value] tupple
            const [key, value] = entry;
            result[key] = value;
        }
        return result;
    }

    static getStoreData(key = ''){
        let selected_store_data = this.getDataSession(this.LOCAL_STORAGE,'additionalToken_data') || {}
        if(selected_store_data.hasOwnProperty(key) && selected_store_data[key]){
            return selected_store_data[key]
        }
        return selected_store_data
    }

    static getFlatNavigation(navigationItems, flatNavigation)
    {
        flatNavigation = flatNavigation ? flatNavigation : [];
        // eslint-disable-next-line no-unused-vars
        for ( const navItem of navigationItems )
        {
            if ( navItem.type === 'subheader' )
            {
                continue;
            }

            if ( navItem.type === 'item' )
            {
                flatNavigation.push(navItem);

                continue;
            }

            if ( navItem.type === 'collapse' || navItem.type === 'group' )
            {
                if ( navItem.children )
                {
                    this.getFlatNavigation(navItem.children, flatNavigation);
                }
            }
        }

        return flatNavigation;
    }

    static getFlatPermissions(role_permissions = null){
        if(!role_permissions){
            role_permissions = this.getStoreData('role_permissions') || []
        }
        let result = []
        if(!Array.isArray(role_permissions)) return result
        // eslint-disable-next-line no-unused-vars
        for ( const role of role_permissions )
        {
            if(role.role === 'ROOT'){
                result = 'ROOT'
                break
            }
            result = [...result,...role.permissions]
        }
        // console.log(`===========> result`,result)
        return result
    }

    static hasPermission(endpoint = '',method = ''){
        const allPermission = this.getFlatPermissions()
        if(!Array.isArray(allPermission) && allPermission === 'ROOT'){
            return true
        }
        let find = allPermission.filter(item => item.endpoint.indexOf(endpoint) > -1 && item.method.toUpperCase() === method.toUpperCase())
        return find.length > 0
    }

    static checkUrlImg(imgUrl = '',serverUrl = UPLOAD_STATIC_URL){
        // console.log(`===========> imgUrl`,imgUrl)
        if(imgUrl.indexOf(serverUrl) > -1){
            return imgUrl
        }else {
            if(imgUrl.indexOf('http') > -1){
                return  imgUrl
            }
            return serverUrl + imgUrl
        }
    }

    static showErrorInput(name,msg = 'Đây là trường bắt buộc'){
        document.getElementById(`error-${name}`).innerText = msg
    }

    static hideErrorInput(form = {}){
        Object.keys(form).map(key => {
            if(document.getElementById(`error-${key}`))
                document.getElementById(`error-${key}`).innerText = ''
            return key
        })
    }

    static getAsyncListOptions(str='',Model={},key='name',query={}){
        let filter = {isActive:true,size:100}
        return new Promise(resolve => {
            if(str){
                query[key] = str
            }
            Model.getList({...filter,...query})
                .then(res => {
                    let data = res.data.map(item => {
                        return {
                            label : item.name,
                            value : item.id
                        }
                    })
                    resolve(data)
                })
        })
    }

    static callModelCollection(Model,key='',query={}){
        let params = {isActive:true,size:100,...query}
        Model.getList(params)
            .then(res => {
                let collection = res.data
                this.setDataSession(this.SESSION_STORAGE,`${key}_collections`,collection)
            })
    }

    static getModelCollection(key = ''){
        let data = this.getDataSession(this.SESSION_STORAGE,`${key}_collections`)
        return data ? data : []
    }

    static pick(obj = {},fields = []){
        return _pick(obj,fields)
    }

    static strHasUnicode(str){
        return  /\\u([\d\w]{4})/gi.test(str)
    }

    static getFileExtension(filename = ''){
        return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
    }

    static validAlias(str){
        return /^[a-z0-9_]{1,16}$/i.test(str)
    }
}

export default Identify;
