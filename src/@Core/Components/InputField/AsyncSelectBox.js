import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async'
const AsyncSelectBox = props => {

    const {onChange,controlStyle,isMulti} = props
    // console.log(`===========> props`,props)
    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(`===========> newValue`,newValue)
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        if(!newValue){
            newValue = {
                value : null,
                label : ''
            }
            if(isMulti){
                newValue = []
            }
        }
        onChange(newValue,actionMeta)
    };

    return (
        <div>
            <AsyncSelect
                cacheOptions
                isClearable
                defaultOptions
                menuPlacement={`auto`}
                styles={{
                    control : (styles) => ({
                        ...styles,
                        minHeight : 56,
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
AsyncSelectBox.defaultProps = {
    onChange : () => {},
    controlStyle : {},
}
AsyncSelectBox.propTypes = {
    loadOptions : PropTypes.func,
    onChange : PropTypes.func,
    defaultValue : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    controlStyle : PropTypes.object,
    isMulti : PropTypes.bool,
    defaultOptions : PropTypes.array,
    placeholder : PropTypes.string,
};

export default AsyncSelectBox;