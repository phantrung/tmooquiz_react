import env from 'envApi.json'
export const UPLOAD_BASE_URL = env.UPLOAD_SERVICE;
export const UPLOAD_UPLOAD = '/api/v1/upload';
export const UPLOAD_CONFIG = `${UPLOAD_UPLOAD}/config`;
export const UPLOAD_STATIC_URL = 'https://static-pos3d.core-dev.e3d.com.vn'

export const DEFAULT_RESPONSE = {
    data : [],
    totalElement : 0,
    totalPage : 0,
    pageIndex : 0
}