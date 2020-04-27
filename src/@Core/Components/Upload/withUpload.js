import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';

import Identify from '../../Helper/Identify';
import uploadService from '../../Api/UploadService';
import Upload from './Upload';

const withUpload = WrappedComponent => {
    return class extends Component {
        state = {
            config: {},
            loading: false,
            filePath : ''
        };

        upload = async file => {
            const { config } = this.state;
            const { onSuccessUpload, onFailUpload, isFullUrl } = this.props;
            const data = await Upload.calculateFile(file, config.sliceTemplates);

            const index = 0;
            let response;

            this.setState({
                loading: true
            });

            try {
                response = await this.uploadRecursive(data, index);
            } catch (e) {
                if (isFunction(onFailUpload)) {
                    onFailUpload(e);
                }
            }
            if (response && response.filePath && isFunction(onSuccessUpload)) {
                let  filePath =  response.filePath
                if(isFullUrl){
                    filePath = Identify.getDataSession(Identify.SESSION_STORAGE,'upload_config').serverUrl + filePath
                }

                    this.setState({filePath})
                onSuccessUpload(filePath);
            }

            this.setState({
                loading: false
            });
        };

        uploadRecursive = async (data, index, response) => {
            const { file, totalFilePart, size, sliceSize, fileName, md5Raw } = data;
            const start = index * sliceSize;
            const end = start + sliceSize;

            if (index > totalFilePart - 1) {
                return response;
            }

            const slicedPart = Upload.slice(file, start, end);
            const formData = Upload.convertFormData({
                id: response && response.id,
                partIndex : index + 1,
                fileSize : size,
                totalFilePart : totalFilePart,
                featureAlias : 'PRODUCT_MANAGEMENT',
                productAlias : 'HP_POS3D',
                uploadPart : slicedPart,
                fileName : fileName,
                checksum : md5Raw,
                sliceSize : sliceSize
            });
            response = await uploadService.upload(formData);

            return await this.uploadRecursive(data, index + 1, response);
        };

        componentDidMount() {
            const config = Identify.getDataSession(Identify.SESSION_STORAGE, 'upload_config');
            if (config && config.productName) {
                this.setState({
                    config
                });

                return;
            }

            uploadService
                .getConfig()
                .then(response => {
                    Identify.setDataSession(Identify.SESSION_STORAGE, 'upload_config', response);
                });
        }

        render() {
            const { config, loading,filePath } = this.state;
            
            return (
                <WrappedComponent
                    {...this.props}
                    config={config}
                    loading={loading}
                    filePath={filePath}
                    upload={this.upload}
                />
            );
        }
    };
};
withUpload.defaultProps = {
    isFullUrl : true
}
export default withUpload;
