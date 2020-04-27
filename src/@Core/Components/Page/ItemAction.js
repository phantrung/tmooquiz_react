import {IconButton, makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import history from '@history'
import ConfirmDialog from "../ConfirmDialog";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
    }
}));
const ItemActions = (props) => {
    const classes = useStyles()
    const {data,router,showBtnDelete,
        showBtnEdit,
        editIcon,deleteIcon,tooltipEdit,tooltipDelete,
        addCustomActions,
        confirmDelete,ConfirmDialogProps,btnEditProps,btnDeleteProps,actionEditProps,actionDeleteProps} = props
    const [openDelete,setOpenDelete] = useState(false)
    let listActions = {
        edit : {
            tooltip : tooltipEdit,
            icon : editIcon,
            onClick : () => {
                if(props.hasOwnProperty('handleClickEdit')){
                    props.handleClickEdit()
                }else{
                    history.push({
                        pathname: router + '/' +data.id,
                        state: {
                            ...data
                        }
                    })
                }
            },
            color : 'primary',
            IconButtonProps : btnEditProps,
            TooltipProps : {},
            sort_order : 1,
            isShowAction : showBtnEdit,
            ...actionEditProps
        },
        delete : {
            tooltip : tooltipDelete,
            icon : deleteIcon,
            onClick : () => {
                if(props.hasOwnProperty('handleClickDelete')){
                    props.handleClickDelete()
                }else{
                    setOpenDelete(true)
                }
            },
            color : 'secondary',
            IconButtonProps : btnDeleteProps,
            TooltipProps : {},
            sort_order : 2,
            isShowAction : showBtnDelete,
            ...actionDeleteProps
        },
        ...addCustomActions
    }
    listActions = Object.values(listActions)
        .sort((a,b) => a.sort_order - b.sort_order)
        .filter(action => action.isShowAction !== false)

    const renderActions = () => {
        return listActions.map((btn,index) => {
            return (
                <Tooltip key={index} aria-label="edit" title={btn.tooltip} {...btn.TooltipProps}>
                    <IconButton color={btn.color}
                                className={classes.button}
                                onClick={btn.onClick}
                                {...btn.IconButtonProps}
                    >
                        {btn.icon}
                    </IconButton>
                </Tooltip>
            )
        })
    }

    return (
        <div>
            {renderActions()}
            <ConfirmDialog open={openDelete}
                           handleConfirm={()=>confirmDelete()}
                           handleClose={()=>setOpenDelete(false)}
                           {...ConfirmDialogProps}
            />
        </div>
    )
}
ItemActions.defaultProps = {
    // handleClickEdit : ()=>{},
    // handleClickDelete : () => {},
    showBtnDelete : true,
    confirmDelete : () => {},
    ConfirmDialogProps : {},
    btnDeleteProps : {},
    btnEditProps : {},
    showBtnEdit : true,
    deleteIcon : <DeleteIcon/>,
    editIcon : <EditIcon/>,
    tooltipEdit : 'Chỉnh sửa',
    tooltipDelete : 'Xoá',
    actionEditProps : {},
    actionDeleteProps : {},
    addCustomActions : {}
}
ItemActions.propTypes = {
    handleClickEdit : PropTypes.func,
    handleClickDelete : PropTypes.func,
    router : PropTypes.string,
    data : PropTypes.object,
    showBtnDelete : PropTypes.bool,
    confirmDelete : PropTypes.func,
    ConfirmDialogProps : PropTypes.object,
    btnEditProps : PropTypes.object,
    btnDeleteProps: PropTypes.object,
    showBtnEdit : PropTypes.bool,
    deleteIcon : PropTypes.element,
    editIcon : PropTypes.element,
    tooltipEdit : PropTypes.string,
    tooltipDelete : PropTypes.string,
    addCustomActions : PropTypes.object,
}
export default React.memo(ItemActions)