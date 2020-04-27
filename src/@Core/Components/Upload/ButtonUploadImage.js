import React, { PureComponent } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import { showErrorMessage } from 'app/store/actions/fuse';
import File from '../../Helper/File';

import withUpload from './withUpload';
import Img from "../Img";
import Identify from "../../Helper/Identify";
import {UPLOAD_STATIC_URL} from "../../Api/constants";
// import Identify from "../../Helper/Identify";

const styles = theme => ({
    root: {
        border: `1px solid #bdbdbd`,
        borderRadius: theme.spacing(.625),
        color: '#b2bec3',
        display: 'flex',
        flexDirection: 'column',
        '&.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto'
        }
    },
    imageIcon: {
        height: theme.spacing(5.25),
        marginBottom: theme.spacing(1.5),
        width: theme.spacing(5.25)
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: theme.palette.common.white,
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        opacity: .42,
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    imagePreview: {
        display: 'flex',
        height: '100%',
        border : '1px solid #d2d2d2',
        '& > img': {
            borderRadius: theme.spacing(.625),
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'cover',
            width: '100%'
        }
    },
    buttonProgress: {
        marginLeft: '.8rem'
    }
});

class UploadImageButton extends PureComponent {
    state = {
        image: '',
        errorMessage: ''
    };

    setImageRef = ref => {
        const { inputRef } = this.props;

        this.imageRef = ref;

        if (inputRef) {
            inputRef(ref);
        }
    };

    openSelectImageInput = () => {
        const { disabled, loading } = this.props;

        if (disabled || loading) {
            return;
        }

        this.imageRef.click();
    };

    handleOnChange = async event => {
        const { upload } = this.props;
        const file = event.target.files[0];

        this.setState({
            image: ''
        });

        if (!this.validate(file)) {
            return;
        }

        this.setState({
            errorMessage: ''
        });

        await upload(file);
    };

    validate = file => {
        // const maxFileSize = 100000000; // 100MB

        if (!File.isImageType(file, ['jpg', 'png', 'jpeg'])) {
            this.setState({
                errorMessage: 'Chỉ hỗ trợ ảnh định dạng .jpg, .png, .jpeg '
            });

            return false;
        }

        return true;
    };

    componentDidUpdate(prevProps, prevState) {
        const { showErrorMessage } = this.props;
        const { errorMessage } = this.state;

        if (errorMessage && !prevState.errorMessage) {
            showErrorMessage(errorMessage);

            this.setState({
                errorMessage: ''
            });
        }
    }

    render() {
        const { className, classes, disabled, loading, title } = this.props;
        let { value,isFullUrl } = this.props;
        let config = Identify.getDataSession(Identify.SESSION_STORAGE,'upload_config') || {}
        let serverUrl = config.serverUrl ? config.serverUrl : UPLOAD_STATIC_URL
        const match = value ? value.match(/^\/upload\/core-vela(.*)$/) : undefined;

        if (match && match[1]) {
            value = match[1];
        }

        const { image } = this.state;
        // let upload_config = Identify.getDataSession(Identify.SESSION_STORAGE,'upload_config') || {}
        // const basePath = upload_config.serverUrl;
        let imageUrl = value;
        if(!isFullUrl){
            imageUrl = imageUrl && imageUrl.indexOf('http') > -1 ? imageUrl : serverUrl + value
        }
        return (
            <>
                <ButtonBase className={clsx(classes.root, className, {
                    'has-image': value
                })} disabled={disabled || loading} onClick={this.openSelectImageInput}>
                    {loading ? (
                        <div className={classes.overlay}>
                            <CircularProgress size={40} className={classes.buttonProgress} />
                        </div>
                    ) : (
                        value ? (
                            <div className={classes.imagePreview}>
                                <Img width={200} height={150} src={imageUrl} alt="" />
                            </div>
                        ) : (
                            <>
                                <img src="/material-ui-static/icons/image-line.svg" alt="" className={clsx('image-icon', classes.imageIcon)} />
                                <Typography>
                                    {title}
                                </Typography>
                                {loading ? (
                                    <div className={classes.overlay}>
                                        <CircularProgress size={40} className={classes.buttonProgress} />
                                    </div>
                                ) : undefined}
                            </>
                        )
                    )}
                </ButtonBase>
                <input
                    accept="image/*"
                    className="hidden"
                    ref={this.setImageRef}
                    type="file"
                    value={image}
                    onChange={this.handleOnChange}
                />
            </>
        );
    }
}

export default withStyles(styles)(connect(
    undefined,
    {
        showErrorMessage
    }
)(withUpload(UploadImageButton)));