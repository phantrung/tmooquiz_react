import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelectBox from "../InputField/AsyncSelectBox";
import Identify from "../../Helper/Identify";
import SelectBox from "../InputField/SelectBox";

const SelectBoxFilter = props => {
    const {placeholder,feature,alias,isQueryUrl,handleFilterListData,Model,defaultOptions,async,queryParams,controlStyle} = props
    let key = `filter_${feature}_with_${alias}`
    let query = Identify.getQueryUrlObject()
    if(queryParams instanceof Object) query = queryParams
    if(!query[alias]) Identify.removeDataSession(Identify.SESSION_STORAGE,key)
    const handleFilterSelect = (values,action,alias) => {
        Identify.setDataSession(Identify.SESSION_STORAGE,key,values)
        if(isQueryUrl){
            query = Identify.getQueryUrlObject()
        }
        query[alias] = values.value
        if(action === 'clear' || values.value === null || values.value === undefined){
            Identify.removeDataSession(Identify.SESSION_STORAGE,key)
            delete query[alias]
        }
        query.page = 0
        handleFilterListData(query)
    }
    let defaultValue = Identify.getDataSession(Identify.SESSION_STORAGE,key)
    defaultValue = defaultValue ? [defaultValue] : []
    if(async){
        const handleLoadOptions = (inputValue = null,keySearch = 'name',defaultFilter= {}) => {
            return new Promise(resolve => {
                let filter = {size:20,...defaultFilter}
                if(inputValue){
                    filter[keySearch] = inputValue
                }
                Model.getList(filter)
                    .then(res => {
                        let data = res.data.map(item => {
                            return {
                                label : item.name,
                                value : item.id
                            }
                        })
                        resolve(data)
                    })
            })
        }
        return (
            <div style={{minWidth:200}} className="mr-12">
                <AsyncSelectBox
                    controlStyle={{
                        minHeight:46
                    }}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    loadOptions={input => handleLoadOptions(input)}
                    onChange={(values,action) => handleFilterSelect(values,action,alias)}
                />
            </div>
        );
    }
    else{
        return (
            <div style={{minWidth:200}} className="mr-12">
                <SelectBox
                    controlStyle={{
                        minHeight:46,
                        ...controlStyle
                    }}
                    options={defaultOptions}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={(values,action) => handleFilterSelect(values,action,alias)}
                />
            </div>
        );
    }
};
SelectBoxFilter.defaultProps = {
    isQueryUrl : false
}
SelectBoxFilter.propTypes = {
    feature : PropTypes.string.isRequired,
    alias : PropTypes.string.isRequired,
    placeholder : PropTypes.string,
    handleFilterListData : PropTypes.func.isRequired,
    Model : PropTypes.object,
    defaultOptions : PropTypes.array,
    async : PropTypes.bool,
    controlStyle : PropTypes.object,
    queryParams : PropTypes.object,
    isQueryUrl : PropTypes.bool,
};

export default React.memo(SelectBoxFilter);