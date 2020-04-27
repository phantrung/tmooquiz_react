import React from "react";
import RoleModel from "../../Model/Role";
import {useDispatch} from "react-redux";
import PageList from "../../../../@Core/Components/Abstract/Page/List";
import MaterialTable from "material-table";
import Identify from "../../../../@Core/Helper/Identify";
import DetailForm from "./DetailForm";
class List extends PageList{
    constructor(props) {
        super(props);
        this.Model = RoleModel
        this.pageTitle = 'Danh sách roles'
    }


    renderTable(){
        const {loading,collection} = this.state
        return (
            <MaterialTable
                columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Role', field: 'name' },
                    { title: 'Description', field: 'description' },
                    {
                        title: 'Created At',
                        field: 'created_at',
                        type : 'date' ,
                        render : rowData => Identify.formatDate(rowData.created_at,'d/m/Y H:i:s')
                    },
                    this.renderColumnAction()
                ]}
                isLoading={loading}
                data={collection.data}
                options={{
                    paginationType : 'stepped',
                    pageSize : 20,
                    searchFieldAlignment : 'left',
                    showTitle : false,
                    columnsButton : true,
                    emptyRowsWhenPaging : false,
                    actionsColumnIndex : -1,
                    // rowStyle : props => console.log(props)
                    // padding : 'dense',
                    // maxBodyHeight : 600,
                    // filtering: true,
                }}
            />
        )
    }

    renderPopupContent(data) {
        return <DetailForm data={data} setOpen={this.setOpenPopup} getCollectionData={this.getCollectionData}/>
    }

    render() {
        return super.render();
    }
}
const Index = props => {
    const dispatch = useDispatch()
    return <List {...props} dispatch={dispatch}/>
}
export default React.memo(Index)