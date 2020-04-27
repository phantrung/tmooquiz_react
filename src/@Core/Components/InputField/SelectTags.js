import React from 'react';
import CreatableSelect from 'react-select/creatable'
import TagModel from "../../../@E3D/Services/Tags/Model/Tag";
import PropTypes from 'prop-types'
const SelectTags = (props) => {

    const {options,tagGroupId,onChange,defaultValue,placeholder,controlStyle} = props
    const handleCreateTag = async (name) => {
        let params = {
            tagGroupId,
            name,
            isActive : true
        }
        return await TagModel.save(params)
    }

    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(`===========> options`,options)
        console.log(`===========> newValue`,newValue)
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        newValue = Array.isArray(newValue) ? newValue : []
        if(actionMeta.action === 'create-option'){
            let lastIndex = newValue.length - 1
            let newItem = newValue[lastIndex]
            handleCreateTag(newItem.label)
                .then(res => {
                    newItem.value = res.id
                    newValue[lastIndex] = newItem
                    onChange(newValue,actionMeta)
                })
        }else{
            onChange(newValue,actionMeta)
        }
    };
    return (
        <div className="select-tags">
            <CreatableSelect
                isMulti
                onChange={handleChange}
                options={options}
                styles={{
                    control : (styles) => ({
                        ...styles,
                        minHeight : 56,
                        ...controlStyle
                    })
                }}
                defaultValue={defaultValue}
                placeholder={placeholder}
                formatCreateLabel={input => {
                    return `Tạo mới tag "${input}"`
                }}
            />
        </div>
    )
}
SelectTags.defaultProps = {
    onChange : () => {},
    defaultValue : [],
    placeholder : 'Chọn tag',
    controlStyle : {}
}
SelectTags.propTypes = {
    onChange : PropTypes.func,
    options : PropTypes.array,
    tagGroupId : PropTypes.number,
    defaultValue : PropTypes.array,
    placeholder : PropTypes.string,
    controlStyle : PropTypes.object,
}
export default SelectTags;