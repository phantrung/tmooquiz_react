import { ApiAbstract } from './index';
import { UPLOAD_BASE_URL, UPLOAD_UPLOAD, UPLOAD_CONFIG } from './constants'

const request = new ApiAbstract(UPLOAD_BASE_URL);
request.setApiNotAuth([
    UPLOAD_UPLOAD,
    UPLOAD_CONFIG,
])

class UploadSevice {
    async upload(data) {
        try {
            const response = await request.post(UPLOAD_UPLOAD, data);
            return response;
        } catch (e) {
            throw e;
        }
    }

    async getConfig() {
        try {
            const params = {
                productAlias: 'HP_POS3D'
            };

            const response = await request.get(UPLOAD_CONFIG, {
                params
            });

            return response;
        } catch (e) {
            throw e;
        }
    }
};

const instance = new UploadSevice();

export default instance;
