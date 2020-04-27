import React from 'react';
import {CircularProgress} from "@material-ui/core";
import ReactTable from "react-table";
import Img from "../../Img";
import Identify from "../../../Helper/Identify";
import AbstractComponent from "../index";
import PaginationTable from "../../Table/PaginationTable";
import PropTypes from 'prop-types'
class ListTableAbstract extends AbstractComponent{

    constructor(props) {
        super(props);
        this.router = '/'
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

    renderColumns () {
        return this.props.columns
    }

    renderTable () {
        const {collection,loading,getCollectionData} = this.props
        let query = Identify.getQueryUrlObject()
        return (
            <ReactTable
                loadingText={<CircularProgress/>}
                loading={loading}
                data={collection.data}
                className="-striped -highlight"
                pageSizeOptions={[10,20,50,100]}
                page={parseInt(query.page,10)}
                pageSize={parseInt(query.size,10)}
                onPageSizeChange={(size,page) => getCollectionData({...query,page,size})}
                pages={collection.totalPage}
                onPageChange={page=>{
                    getCollectionData({...query,page})
                }}
                PaginationComponent={props => <PaginationTable {...collection} {...props}/>}
                manual
                noDataText={`Không có có dữ liệu nào!`}
                columns={this.renderColumns()}
            />
        )
    }

    render() {
        return (
            <div>
                {this.renderTable()}
            </div>
        )
    }
}
ListTableAbstract.defaultProps = {
    columns : [],
    getCollectionData : () => {},
    collection : {},
    loading : true
}
ListTableAbstract.propTypes = {
    columns : PropTypes.array,
    getCollectionData : PropTypes.func,
    collection : PropTypes.object,
    loading : PropTypes.bool,
}
export default ListTableAbstract