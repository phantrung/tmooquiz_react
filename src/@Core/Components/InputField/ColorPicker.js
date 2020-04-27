import React, {useState,memo} from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Icon} from "@material-ui/core";
import {SketchPicker} from "react-color";
import clsx from 'clsx'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
const ColorPicker = props => {

    const {defaultColor} = props
    const [color,setColor] = useState(defaultColor)
    const [openColor,setOpenColor] = useState(false)
    const [inputFocus,setFocus] = useState(false)
    const onChangeComplete = color => {
        setColor(color.hex)
        props.handleChange(color.hex)
        // setOpenColor(false)
    }

    const handleInputChange = e => {
        setColor(e.target.value)
        props.handleChange(e.target.value)
    }

    return (
        <div className={clsx('flex')}>
            <TextField
                variant="outlined"
                value={color}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment : (
                        <InputAdornment position="end">
                            <IconButton onClick={()=>setOpenColor(!openColor)}>
                                <Icon>palette</Icon>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                onFocus={()=>{
                    setFocus(true)
                    setOpenColor(true)
                }}
                onBlur={()=>setFocus(false)}
            />
            <div className="relative ml-8">
                {openColor && (
                    <ClickAwayListener onClickAway={()=> inputFocus ? '' : setOpenColor(false)}>
                        <div className="absolute z-999">
                            <SketchPicker color={color} onChangeComplete={onChangeComplete}/>
                        </div>
                    </ClickAwayListener>

                )}

            </div>
        </div>

    );
};
ColorPicker.defaultProps = {
    defaultColor : '#000',
    handleChange : () => {}
}
ColorPicker.propTypes = {
    defaultColor : PropTypes.string,
    handleChange : PropTypes.func,
};

export default memo(ColorPicker);