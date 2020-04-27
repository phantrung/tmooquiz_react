import React ,{memo}from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = props => {
    const {open,CancelButtonTitle,OkButtonTitle,dialogTitle,dialogContent,showBtnConfirm,showBtnCancel} = props

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                style : {
                    minWidth : 400
                }
            }}
        >
            <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                {showBtnConfirm && (
                    <Button variant="contained" onClick={()=>{
                        props.handleConfirm()
                        if(props.okWithClose)
                            props.handleClose()
                    }} color="primary">
                        {OkButtonTitle}
                    </Button>
                )}
                {showBtnCancel && (
                    <Button variant="contained" onClick={props.handleClose} color="secondary">
                        {CancelButtonTitle}
                    </Button>
                )}

            </DialogActions>
        </Dialog>
    );
}
ConfirmDialog.defaultProps = {
    handleClose : () => {},
    handleConfirm : () => {},
    open : false,
    OkButtonTitle : 'Xác nhận',
    CancelButtonTitle : 'Bỏ qua',
    dialogTitle : 'Bạn có chắc chắn muốn xoá không?',
    dialogContent : '',
    okWithClose : true,
    showBtnConfirm : true,
    showBtnCancel : true
}
ConfirmDialog.propTypes = {
    handleConfirm : PropTypes.func,
    handleClose : PropTypes.func,
    open : PropTypes.bool,
    OkButtonTitle: PropTypes.string,
    CancelButtonTitle: PropTypes.string,
    dialogTitle: PropTypes.string,
    dialogContent: PropTypes.node,
    okWithClose : PropTypes.bool,
    showBtnConfirm : PropTypes.bool,
    showBtnCancel: PropTypes.bool,
}
export default memo(ConfirmDialog)