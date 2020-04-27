import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {makeStyles} from "@material-ui/core";
import PropTypes from 'prop-types'
const useStyles = makeStyles(theme => ({
    select : {
        minWidth : 150,
        height : 47,
        marginRight : theme.spacing(3),
    },
    selectMenu : {
        padding: 14,
        paddingRight: '32px !important'
    }
}));
const SelectFilter = (props) => {
    const classes = useStyles()
    const {selectFieldProps,values,value,alias,handleChangeFilter} = props
    if(values.length === 0) return null
    return (
        <Select
            variant="outlined"
            className={`${classes.select}`}
            inputProps={{
                className : classes.selectMenu
            }}
            value={value}
            onChange={e => handleChangeFilter(e,alias)}
            {...selectFieldProps}
        >
            <MenuItem value={0}>
                {props.name}
            </MenuItem>
            {values.map(item => {
                return (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                )
            })}
        </Select>
    )
}
SelectFilter.defaultProps = {
    selectFieldProps : {},
    value : 0 ,
    handleChangeFilter : () => {},
    values : []
}
SelectFilter.propTypes = {
    selectFieldProps : PropTypes.object,
    handleChangeFilter : PropTypes.func,
    alias : PropTypes.string,
    values : PropTypes.array,
}
export default SelectFilter;