import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
const SelectBox = props => {
    const {onChange,controlStyle,isMulti,menuPlacement} = props
    // console.log(`===========> props`,props)
    const handleChange = (newValue, actionMeta) => {

        if(!newValue){
            newValue = {
                value : null,
                label : ''
            }
            if(isMulti) newValue = []
        }
        onChange(newValue,actionMeta)
        console.group('Value Changed');
        console.log(`===========> newValue`,newValue)
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    return (
        <div>
            <Select
                isClearable
                isSearchable
                menuPlacement={menuPlacement}
                styles={{
                    control : (styles) => ({
                        ...styles,
                        minHeight : 56,
                        minWidth : 200,
                        ...controlStyle
                    }),
                    menu : (styles) => ({
                        ...styles,
                        zIndex : 999999
                    })
                }}
                {...props}
                onChange={handleChange}
            />
        </div>
    );
};

SelectBox.defaultProps = {
    onChange : () => {},
    controlStyle : {},
    menuPlacement : 'auto'
}
SelectBox.propTypes = {
    onChange : PropTypes.func,
    defaultValue : PropTypes.array,
    controlStyle : PropTypes.object,
    options : PropTypes.array,
    isMulti : PropTypes.bool,
    placeholder : PropTypes.string,
    menuPlacement : PropTypes.oneOf(["auto",'top','bottom']),
};

export default SelectBox;