import React from 'react';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import {makeStyles,FormControl,FormControlLabel,Radio,RadioGroup} from "@material-ui/core";
import List from "@material-ui/core/List";
const useStyles = makeStyles(theme => ({
    root: {
        // margin: 'auto',
        minWidth : '100%',
        [theme.breakpoints.up('md')] : {
            minWidth : '70%'
        },
        display : 'inline-block'
    },
    formControl: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    list: {
        width: '100%',
        maxHeight: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
}));
const RadioGroupField = props => {

    const classes = useStyles()

    const {options,defaultValue,name,onChange} = props
    const [value, setValue] = React.useState(String(defaultValue));

    const handleChange = event => {
        setValue(event.target.value);
        onChange(event)
    };

    return (
        <Paper elevation={1} className={classes.root}>
            <List className={classes.list} dense component="div" role="list">
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup aria-label={name} name={name} value={value} onChange={handleChange}>
                        {options.map(option => {
                            return <FormControlLabel key={option.value} value={String(option.value)} control={<Radio />} label={option.label} />
                        })}
                    </RadioGroup>
                </FormControl>
            </List>
        </Paper>
    );
};
RadioGroupField.defaultProps = {
    options : [],
    defaultValue : null,
    name : 'radio-field',
    onChange : () => {}
}
RadioGroupField.propTypes = {
    options : PropTypes.array,
    defaultValue : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    name : PropTypes.string,
    onChange : PropTypes.func,
};

export default RadioGroupField;