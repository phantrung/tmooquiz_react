import ListFilterAbstract from "../Table/ListFilter";
import React from "react";
import ProducerModel from "../../../../@E3D/Services/Customer/Model/Producer";
import SelectBoxFilter from "../../Table/SelectBoxFilter";

class ListFilter extends ListFilterAbstract {

    renderContent() {
        return (
            <div className="flex flex-wrap">
                {this.renderInputField({name : 'sku',placeholder : 'Mã sản phẩm'})}
                {/*<SelectBoxFilter feature={`grid_product`}*/}
                {/*                 placeholder={`Nhà sản xuất`}*/}
                {/*                 handleFilterListData={handleGetListData}*/}
                {/*                 Model={ProducerModel}*/}
                {/*                 async={true}*/}
                {/*                 queryParams={{}}*/}
                {/*                 alias={`manufacturerIds`}/>*/}
            </div>
        )
    }

    render() {
        return super.render();
    }
}
export default ListFilter