import React from "react";
import {FuseAnimate} from "../../../../@fuse";
import Identify from "../../../Helper/Identify";
import debounce from "lodash/debounce";
import {Icon} from "@material-ui/core";
import AbstractComponent from "../index";
import TextFieldSearch from "../../InputField/TextFieldSearch";
import SelectBoxFilter from "../../Table/SelectBoxFilter";

class ListFilterAbstract extends AbstractComponent{

    constructor(props) {
        super(props);
        this.handleGetListData = this.props.handleGetListData
        this.state = {}
        this.feature = this.props.feature
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.comparePropsState(this,nextProps,nextState)
    }

    handleSearchInput = (key,value) => {
        let query = Identify.getQueryUrlObject()
        query[key] = value
        if(!value || value === ''){
            delete query[key]
        }
        query.page = 0
        this.handleGetListData(query)
    }

    doHandleSearchInput = debounce(this.handleSearchInput,500)

    renderInputField = (props = {}) => {
        let query = Identify.getQueryUrlObject()
        let key = props.name ? props.name : 'name'
        return <TextFieldSearch name={`name`}
                                placeholder={`Nhập tên ...`}
                                defaultValue={query.hasOwnProperty(key) ? query[key] : null}
                                onChange={e => this.doHandleSearchInput(e.target.name,e.target.value)}
                                {...props}/>
    }


    renderContent () {
        return (
            <div className="flex">
                {this.renderInputField()}
                <SelectBoxFilter
                    feature={this.feature}
                    placeholder={`Trạng thái hoạt động`}
                    handleFilterListData={this.handleGetListData}
                    controlStyle={{minWidth : 250}}
                    defaultOptions={[
                        {label : 'Active',value:true},
                        {label : 'Inactive ',value : false}
                    ]}
                    alias={`isActive`}
                    isQueryUrl={true}
                />
            </div>
        )
    }

    render() {
        return(
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <div className={"mb-8 relative z-9999"}>
                    <div className="flex items-center mb-4">
                        <Icon className="mr-4" color="secondary">filter_list</Icon>
                        <span>Lọc kết quả : </span>
                    </div>
                    {this.renderContent()}
                </div>
            </FuseAnimate>
        )
    }
}
export default ListFilterAbstract