import React ,{memo}from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogPopup = props => {
    const {open,dialogAction,
        dialogStyle,
        PaperPropsStyle,
        dialogTitle,dialogContent,dialogContentStyle} = props

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
                    minWidth : 400,
                    ...PaperPropsStyle
                }
            }}
            style={dialogStyle}
        >
            {dialogTitle && (
                <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
            )}
            <DialogContent className="custom-dialog-content" style={dialogContentStyle}>
                {dialogContent}
            </DialogContent>
            {dialogAction && (
                <DialogActions>
                    {dialogAction}
                </DialogActions>
            )}
        </Dialog>
    );
}
DialogPopup.defaultProps = {
    handleClose : () => {},
    open : false,
    dialogTitle : 'Title',
    dialogContent : 'Content',
    dialogContentStyle : {},
    dialogStyle : {},
    PaperPropsStyle : {}
}
DialogPopup.propTypes = {
    open : PropTypes.bool,
    dialogTitle: PropTypes.node,
    dialogContent: PropTypes.node,
    dialogAction : PropTypes.node,
    handleClose : PropTypes.func,
    dialogContentStyle : PropTypes.object,
    dialogStyle : PropTypes.object,
    PaperPropsStyle : PropTypes.object,
}
export default memo(DialogPopup)