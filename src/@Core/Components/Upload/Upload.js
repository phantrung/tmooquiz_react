import { Object } from 'core-js';
import map from 'lodash/map';
import SparkMD5 from 'spark-md5';

export const STT_PENDING = 'Pending';
export const STT_UPLOADING = 'Uploading';
export const STT_ERROR = 'Error';
export const STT_PAUSE = 'Pause';
export const STT_COMPLETED = 'Completed';
export const ACTION_NEW = 'new';
export const ACTION_START = 'start';
export const ACTION_COMPLETED = 'completed';
export const ACTION_RESET = 'reset';
export const ACTION_ERROR = 'error';

export default class Upload {
    static calculateFile(file, sliceTemplates) {
        const size = file.size;
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const chunkSize = this.getSliceSizeConfig(size, sliceTemplates);
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();
        const fileName = file.name.split(/(\\|\/)/g).pop();
        const sliceSize = chunkSize;
        let currentChunk = 0;

        return new Promise((resolve, reject) => {
            fileReader.onload = function (e) {
                spark.append(e.target.result);
                currentChunk++;

                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    const md5Raw = spark.end();
                    const totalFilePart = Math.ceil(size / sliceSize);

                    return resolve({
                    file,
                    size,
                    sliceSize,
                    totalFilePart,
                    fileName,
                    md5Raw
                    });
                }
            };

            fileReader.onerror = function () {
                console.warn('oops, something went wrong.');

                return reject(false);
            };

            function loadNext() {
                const start = currentChunk * chunkSize,
                    end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
            }

            loadNext();
        });
    }

    static getSliceSizeConfig(size, sliceTemplates) {
        let sliceSize = 1000000;

        if (!sliceTemplates) {
            return sliceSize;
        }
        // eslint-disable-next-line
        for (const key of Object.keys(sliceTemplates)) {
            const template = sliceTemplates[key];

            if (size > template.minSize && size <= template.maxSize) {
                sliceSize = template.sliceSize;

                break;
            }
        }

        return sliceSize;
    }

    static slice(file, start, end) {
        const slice = file.mozSlice ? file.mozSlice :
            file.webkitSlice ? file.webkitSlice :
                file.slice ? file.slice : 0;

        return slice.bind(file)(start, end);
    }

    static convertFormData(data) {
        const formData = new FormData();

        map(data, function (item, key) {
            formData.append(key, item);
        });

        return formData;
    }

    static getFeatureAlias(alias) {
        switch (alias) {
            case 'store': {
                return 'STORE_MANAGEMENT';
            }
            case 'product': {
                return 'PRODUCT_MANAGEMENT';
            }
            default: {
                return '';
            }
        }
    }
}
