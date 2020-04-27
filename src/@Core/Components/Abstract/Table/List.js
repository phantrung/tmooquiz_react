import React from 'react'
import AbstractComponent from "../index";
import Identify from "../../../Helper/Identify";
import {FusePageSimple} from "../../../../@fuse";
import PageHeader from "../../Page/Header";
import ListTableAbstract from "./ListTable";
import CustomCell from "../../Table/Cell";
import Img from "../../Img";
import ItemActions from "../../Page/ItemAction";
import ListFilterAbstract from "./ListFilter";

class ListAbstract extends AbstractComponent {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch
        this.pageTitle = 'Danh sách'
        this.Model = null
        this.router = '/'
        this.filter = Identify.getQueryUrlObject()
        this.feature = 'feature_name'
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.comparePropsState(this,nextProps,nextState)
    }

    getCollectionData = (filter) => {
        if(this.Model){
            this.setLoading(true)
            this.Model.getList(filter,true)
                .then(data => {
                    this.processData(data)
                })
                .catch(err => {
                    this.processError(err)
                })
        }
    }

    confirmDelete = (params = {}) => {
        Identify.showLoadingPage()
        this.Model.delete(params)
            .then(res => {
                Identify.handleSuccessResponse(res,this.dispatch)
                Identify.hideLoadingPage()
                this.getCollectionData()
            })
            .catch(error => Identify.handleErrorResponse(error,this.dispatch))
    }

    processData = data => {
        this.setCollection(data)
        this.setLoading(false)
    }

    processError = err => {
        this.setLoading(false)
        Identify.handleErrorResponse(err,this.dispatch)
    }

    componentDidMount() {
        this.getCollectionData(this.filter)
    }

    renderListFilter(){
        return <ListFilterAbstract handleGetListData={this.getCollectionData} feature={this.feature}/>
    }

    renderContent () {
        return (
            <div>
                {this.renderListFilter()}
                {this.renderTable()}
            </div>
        )
    }

    renderHeader () {
        return (
            <PageHeader
                router={this.router}
                breadcrumb={[
                    {
                        title : this.pageTitle
                    }
                ]}
                pageTitle={this.pageTitle}
            />
        )
    }

    renderColumnField(props = {}){
        return {
            Header    : "Id",
            accessor  : "id",
            className : "justify-center",
            Cell : this.renderCell,
            ...props
        }
    }

    renderCell(props = {}){
        return <CustomCell {...props}/>
    }

    renderColumnId(props = {}){
        return this.renderColumnField({width:50,...props})
    }

    renderColumnImg (props = {}) {
        return {
            Header    : "Ảnh đại diện",
            accessor  : "image",
            className : "justify-center",
            Cell : props => <div style={{maxWidth:100}}><Img width={100} height={100} src={props.value} alt="image1"/></div>,
            ...props
        }
    }

    renderColumnStt(props = {}){
        return {
            Header    : "Trạng thái",
            accessor  : "isActive",
            className : "justify-center",
            Cell : props => <CustomCell {...props} variant="status-icon"/>,
            ...props
        }
    }

    renderColumnAction(props = {},actionProps = {}){
        return {
            Header    : "Thao tác",
            accessor  : "id",
            className : "justify-center",
            Cell : props => <ItemActions
                router={this.router}
                confirmDelete={()=>this.confirmDelete({id:props.value})}
                data={props.original}
                {...actionProps}
            />,
            ...props
        }
    }

    renderListColumns (){
        return [
            this.renderColumnId(),
            this.renderColumnField({
                Header    : "Tên",
                accessor  : "name",
            })
        ]
    }

    renderTable () {
        const {collection,loading} = this.state
        return <ListTableAbstract columns={this.renderListColumns()} collection={collection} loading={loading} getCollectionData={this.getCollectionData}/>
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
                content={this.renderContent()}
                sidebarInner
                innerScroll
            />
        )
    }
}
export default ListAbstract