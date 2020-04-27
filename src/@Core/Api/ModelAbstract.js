import {ApiAbstract} from "./index";
import env from 'envApi.json'
import history from '@history'
import Identify from "../Helper/Identify";
import _find from "lodash/find";
import {DEFAULT_RESPONSE} from "./constants";
class ModelAbstract {
    BASE_URL = env.BE_SERVICE
    BASE_ENDPOINT = "/"
    router = '/'
    apiNotAuth = []
    DEFAULT_PAGE = 0
    DEFAULT_SIZE = 20
    DEFAULT_SORT = 'createdAt,desc'


    defaultResponse = DEFAULT_RESPONSE

    constructor() {
        this.setRequest()
    }

    resetParams = () => {
        this.paramsGet = {
            page : 0,
            size : 10,
            sort : 'createdAt,desc'
        }
    }

    setParamsGet = (params = {}) => {
        this.paramsGet = {
            ...this.paramsGet,
            ...params
        }
    }

    getParamsGet = () => {
        return this.paramsGet
    }

    resetParamsGet = () => {
        this.paramsGet = {
            page : this.DEFAULT_PAGE,
            size : this.DEFAULT_SIZE,
            sort : this.DEFAULT_SORT,
        }
    }

    setRequest = () => {
        this.request = new ApiAbstract(this.BASE_URL)
        this.request.setApiNotAuth(this.apiNotAuth)
        this.paramsGet = {
            page : this.DEFAULT_PAGE,
            size : this.DEFAULT_SIZE,
            sort : this.DEFAULT_SORT,
        }
    }

    setQueryUrl = (params = {}) => {
        this.queryUrl = new URLSearchParams(params).toString()
        let {location} = history
        location.search = this.queryUrl
        history.replace(location)
    }

    getList = async (params = {},setUrl = false) => {
        // params = {
        //     ...this.paramsGet,
        //     // ...Identify.getQueryUrlObject(),
        //     ...params
        // }
        // if(setUrl){
        //     this.setQueryUrl(params)
        // }
        const response = await this.request.get(this.BASE_ENDPOINT,{
            params : params
        })
        return response
    }

    getDetail = async (id = null, params = {}) => {
        let api = `${this.BASE_ENDPOINT}/${id}`
        if(params.notAuth){
            this.request.setApiNotAuth([api])
            delete params.notAuth
        }
        const response = await this.request.get(`${this.BASE_ENDPOINT}/${id}`,{
            params
        })
        return response
    }

    postCreate = async (data = {},config = {}) => {
        data.createdBy = Identify.getUserData('user_id') || 1
        return await this.request.post(this.BASE_ENDPOINT,data,config)
    }

    putUpdate = async (data = {},config = {}) => {
        data.updatedBy = Identify.getUserData('user_id') || 1
        return await this.request.put(this.BASE_ENDPOINT + `/${data.id}`,data,config)
    }

    save = async (data = {},config = {}) => {
        if(data.hasOwnProperty('id') && data.id){
            return await this.putUpdate(data,config)
        } else {
            return await this.postCreate(data,config)
        }
    }

    delete = async params => {
        return await this.request.delete(this.BASE_ENDPOINT,{
            params
        })
    }

    deleteWithPath = async id => {
        if(id){
            const api = this.BASE_ENDPOINT+'/'+id
            // this.request.setApiNotAuth([api])
            return await this.request.delete(api)
        }
    }

    getObjectSession = (collectionName = '',filter = {}) => {
        let collection = Identify.getDataSession(Identify.SESSION_STORAGE,collectionName) || {}
        let obj = _find(collection,filter)
        if(obj && obj instanceof Object){
            return obj
        }
        return filter
    }

    hasPermission = (method = 'GET',endpoint = this.BASE_ENDPOINT) => {
        return Identify.hasPermission(endpoint,method)
    }
}
export default ModelAbstract