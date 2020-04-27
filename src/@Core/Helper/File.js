export default class File {
    static isImageFile(file) {
        return file && file.type.split('/')[0] === 'image';
    }
    static isImageType(file, types) {
        return file && types.includes(file.type.split('/')[1]);
    }
    static validateFileSize(file, size) {
        return file && file.size <= size ? true : false;
    }
};