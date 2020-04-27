import React from "react";
import AbstractComponent from "../index";
import Identify from "../../../Helper/Identify";
import {FusePageSimple} from "../../../../@fuse";
import PageHeader from "../../Page/Header";
import DialogPopup from "../../DialogPopup";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {FuseAnimate} from "../../../../@fuse";
import ItemAction from "../../Page/ItemAction";

class PageList extends AbstractComponent{
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch
        this.pageTitle = 'Danh sách'
        this.Model = null
        this.router = '/'
        this.feature = 'feature_name'
        this.state.openPopup = {open : false,data : null}
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.comparePropsState(this,nextProps,nextState)
    }

    setCollection = collection => this.setState({collection})

    setLoading = loading => this.setState({loading})

    setOpenPopup = (open,data) => this.setState({openPopup : {open,data}})

    getCollectionData = (filter = {}) => {
        this.Model.getList(filter)
            .then(response => {
                this.processData(response)
            })
            .catch(error => {
                this.processError(error)
            })
    }

    handleConfirmDelete = (id) => {
        Identify.showLoadingPage()
        this.Model.deleteWithPath(id)
            .then(res => {
                Identify.showSuccessMsg('Xoá thành công',this.dispatch)
                this.getCollectionData()
                Identify.hideLoadingPage()
            })
            .catch(error => {
                Identify.handleErrorResponse(error,this.dispatch)
            })
    }

    componentDidMount() {
        this.getCollectionData()
    }

    processData(data){
        this.setCollection(data)
        this.setLoading(false)
    }

    processError(error){
        Identify.handleErrorResponse(error,this.dispatch)
    }

    renderHeader(){
        return (
            <PageHeader
                router={this.router}
                breadcrumb={[
                    {
                        title : this.pageTitle
                    }
                ]}
                pageTitle={this.pageTitle}
                handleClickBtnAddNew={() => this.setOpenPopup(true,{})}
            />
        )
    }

    renderContent(){
        return(
            <div>
                {this.renderTable()}
                {this.renderPopup()}
            </div>
        )
    }

    renderTable(){
        return <div>Table data</div>
    }

    renderColumnAction(){
        return {
            title : 'Actions',
            cellStyle : {padding:0},
            render : props => <ItemAction data={props}
                                          confirmDelete={() => this.handleConfirmDelete(props.id)}
                                          handleClickEdit={() => this.setOpenPopup(true,props)}/>
        }
    }

    renderActionEdit(props = {}){
        return {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => this.setOpenPopup(true,rowData),
            iconProps : {
                color : 'primary'
            },
            ...props
        }
    }

    renderActionDelete(props = {}){
        return {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData) => this.setOpenPopup(false,null),
            iconProps : {
                color : 'secondary'
            },
            ...props
        }
    }

    renderPopupContent(data){
        return <div>Popup content</div>
    }

    renderPopup(){
        const {openPopup} = this.state
        let popupTitle = 'Thêm mới'
        if(openPopup.data instanceof Object && openPopup.data.id){
            popupTitle = 'Chỉnh sửa : ' + openPopup.data.name
        }
        return (
            <DialogPopup
                open={openPopup.open}
                dialogTitle={popupTitle}
                handleClose={() => this.setOpenPopup(false,null)}
                dialogContent={openPopup.open ? this.renderPopupContent(openPopup.data) : null}
                dialogAction={
                    <div>
                        <Button variant="contained" color="secondary"
                                onClick={() => {
                                    document.getElementById('btnSubmitForm').click()
                                }}
                                className="normal-case mr-12">
                            <Icon className="mr-4">save</Icon>
                            Lưu
                        </Button>
                        <Button variant="contained"
                                onClick={() => {
                                    this.setOpenPopup(false,null)
                                }}
                                className="normal-case">
                            Huỷ
                        </Button>
                    </div>
                }
            />
        )
    }

    render() {
        return (
            <FusePageSimple
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-16 h-full",
                    content       : "flex flex-col h-full",
                    leftSidebar   : "w-256 border-0",
                    header        : "min-h-72 sm:h-136 sm:min-h-136"
                }}
                header={this.renderHeader()}
                content={
                    <FuseAnimate
                        animation="transition.whirlIn"
                        duration={500}
                        // delay={400}
                    >
                        {this.renderContent()}
                    </FuseAnimate>
                }
                sidebarInner
                innerScroll
            />
        )
    }
}
export default PageList