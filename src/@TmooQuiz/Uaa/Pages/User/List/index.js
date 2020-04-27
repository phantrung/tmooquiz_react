import React from "react";
import UserModel from "../../../Model/User";
import MaterialTable from "material-table";
import {ROUTER_ADMIN_USER} from "../../../Model/constants";
import PageList from "../../../../../@Core/Components/Abstract/Page/List";
import {useDispatch} from "react-redux";
import DetailForm from "./DetailForm";

class List extends PageList {

    constructor(props) {
        super(props);
        this.Model = UserModel
        this.pageTitle = 'Danh sách user'
        this.router = ROUTER_ADMIN_USER
    }

    renderPopupContent(data) {
        return <DetailForm data={data} setOpen={this.setOpenPopup} getCollectionData={this.getCollectionData}/>
    }

    renderTable() {
        const {loading,collection} = this.state
        return (
            <MaterialTable
                columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Name', field: 'name' },
                    { title: 'Email', field: 'email' },
                    {
                      title : 'Role',
                      field : 'roles',
                      render : props => {
                          if(props.roles instanceof Array){
                              return props.roles.map(item => {
                                  return <div key={item.name}>{item.description}</div>
                              })
                          }
                      }
                    },
                    { title: 'Created At', field: 'created_at',type : 'date' },
                    this.renderColumnAction()
                ]}
                isLoading={loading}
                data={collection.data}
                options={{
                    paginationType : 'stepped',
                    pageSize : 20,
                    // maxBodyHeight : 600,
                    // filtering: true,
                    searchFieldAlignment : 'left',
                    showTitle : false,
                    columnsButton : true,
                    emptyRowsWhenPaging : false,
                    actionsColumnIndex : -1,
                    // rowStyle : props => console.log(props)
                    // padding : 'dense'
                }}
                // isLoading={true}
                // actions={[
                //     this.renderActionEdit(),
                //     this.renderActionDelete(),
                // ]}
            />
        )
    }

    render() {
        return super.render()
    }
}
const Index = props => <List {...props} dispatch={useDispatch()} />
export default Index