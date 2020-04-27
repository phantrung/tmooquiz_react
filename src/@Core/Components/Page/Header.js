import React,{memo} from 'react';
import {Typography, Button, Icon} from "@material-ui/core";
import Breadcrumb from "../Breadcrumb";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/styles";
import PropTypes from 'prop-types'
import pick from 'lodash/pick';
import history from '@history'
const useStyles = makeStyles(theme => ({
    pageTitle : {
        justifyContent : 'space-between',
        width : '100%',
        marginTop : 24
    }
}))
const PageHeader = (props) => {
    let {
        handleClickBtnAddNew,handleClickBtnBack,showBtnAddNew,btnAddNewProps,
        showBtnBack,showBtnSave,addCustomButton,router} = props
    const breadcrumb = [
        ...props.breadcrumb
    ]
    const classes = useStyles()
    let listBtn = {
        new : {
            variant : 'contained',
            color : 'secondary',
            title : 'Thêm mới',
            icon : 'add',
            onClick : (e)=>{
                if(props.hasOwnProperty('handleClickBtnAddNew')){
                    handleClickBtnAddNew(e)
                    return
                }
                history.push(`${router}/new`)
            },
            enable : showBtnAddNew,
            sort_order : 1,
            ...btnAddNewProps
        },
        save : {
            variant : 'contained',
            color : 'secondary',
            title : 'Lưu',
            icon : 'save',
            onClick : ()=>{
                if(document.getElementById('btnSubmitForm')){
                    document.getElementById('btnSubmitForm').click()
                }
            },
            enable : showBtnSave,
            sort_order : 2
        },
        back : {
            variant : 'contained',
            color : 'default',
            title : 'Trở về',
            icon : 'arrow_back',
            onClick : (e)=>{
                if(props.hasOwnProperty('handleClickBtnBack')){
                    handleClickBtnBack(e)
                    return
                }
                // if(router[0] !== '/') router = '/'+router
                history.goBack()
            },
            enable : showBtnBack,
            sort_order : 3
        },
        ...addCustomButton
    }
    const renderListButton = () => {
        return Object.values(listBtn).sort((a,b) => a.sort_order - b.sort_order).map((btn,index) => {
            const importedProps = pick(btn, [
                'className',
                'color',
                'type',
                'variant',
                'disabled',
                'aria-label',
                'onClick',
                'icon',
                'style'
            ]);
            if(!btn.enable) return null
            return (
                <Button key={index} {...importedProps}
                        size="small"
                        style={{marginLeft:12,textTransform:'unset'}}>
                    {btn.icon && <Icon style={{marginRight:5}}>{btn.icon}</Icon>}
                    {btn.title}
                </Button>
            )
        })
    }

    return (
        <div className="p-8 sm:p-24 w-full">
            <Breadcrumb breadcrumb={breadcrumb}/>
            <div className={clsx("flex",classes.pageTitle)}>
                <Typography variant="h5">{props.pageTitle}</Typography>
                <div className="page-header-action">
                    {renderListButton()}
                </div>
            </div>
        </div>
    )
}
PageHeader.defaultProps = {
    breadcrumb : [],
    pageTitle : 'Page Title',
    showBtnAddNew : true,
    showBtnBack : false,
    showBtnSave : false,
    addCustomButton : {},
    // handleClickBtnAddNew : () => {console.log(props.router)},
    // handleClickBtnBack : () => {},
    handleClickBtnSave : () => {},
    router : '',
    btnAddNewProps : {}
}
PageHeader.propTypes = {
    breadcrumb : PropTypes.array,
    pageTitle: PropTypes.string,
    showBtnAddNew : PropTypes.bool,
    showBtnBack : PropTypes.bool,
    showBtnSave: PropTypes.bool,
    addCustomButton : PropTypes.object,
    handleClickBtnAddNew : PropTypes.func,
    handleClickBtnBack : PropTypes.func,
    handleClickBtnSave : PropTypes.func,
    isEdit : PropTypes.bool,
    router : PropTypes.string.isRequired,
    btnAddNewProps : PropTypes.object,
}
export default memo(PageHeader);