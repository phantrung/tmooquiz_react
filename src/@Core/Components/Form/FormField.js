import React from 'react';
import PropTypes from 'prop-types';
import {TextField,Select,MenuItem,TextareaAutosize} from "@material-ui/core";
import './style.css'
import clsx from 'clsx'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Switch from "@material-ui/core/Switch/Switch";
const useStyles = makeStyles(theme => ({
    textArea : {
        minWidth : '100%',
        border : '1px solid #0000003b',
        padding : theme.spacing(1),
    },
}))
const FormField = props => {
    const classes = useStyles()
    const {FieldProps,label,required,type,className,customField,hidden} = props
    if(hidden) return null
    let field = (
        <TextField
            variant="outlined"
            fullWidth
            {...FieldProps}
            required={required}
        />
    )
    if(type === 'select'){
        field = (
            <Select
                variant="outlined"
                fullWidth
                displayEmpty
                {...FieldProps}
            >
                {props.options.map((item,index) => {
                    return (
                        <MenuItem key={index} value={item.value}>
                            {item.label}
                        </MenuItem>
                    )
                })}
                {props.options.length === 0 && (
                    <MenuItem disabled value={""}>
                        Không có giá trị nào
                    </MenuItem>
                )}
            </Select>
        )
    }else if(type === 'textarea'){
        field = (
            <TextareaAutosize
                rows={5}
                className={classes.textArea}
                {...FieldProps}
                required={required}
            />
        )
    }else if (type === 'custom-field'){
        field = customField
    }else if (type === 'switch'){
        field = (
            <Switch  {...FieldProps} />
        )
    }
    return (
        <div className={clsx('form-field-group my-12',className)}>
            {label && <label className="field-label mb-4 inline-block" htmlFor="name">{label} {required && <span className="field-required text-red-700">*</span>}</label>}
            {field}
            <div className="text-red-500 text-12 mt-4" id={`error-${FieldProps.name}`}/>
        </div>
    );
};
FormField.defaultProps = {
    label : '',
    required : false,
    options : [],
    type : 'input',
    FieldProps : {},
    hidden : false
}
FormField.propTypes = {
    label : PropTypes.string,
    required : PropTypes.bool,
    options : PropTypes.array,
    type : PropTypes.oneOf(['input','textarea','custom-field','select','switch']),
    className : PropTypes.string,
    FieldProps : PropTypes.object,
    customField : PropTypes.node,
    hidden : PropTypes.bool,
};

export default React.memo(FormField);