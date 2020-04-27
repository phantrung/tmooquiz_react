import React,{memo} from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
    textField : {
        minWidth : '100%',
        [theme.breakpoints.up('md')] : {
            minWidth : '70%'
        }
    },
}));
const MultiSelect = props => {
    const classes = useStyles()
    return (
        <div>
            <Autocomplete
                filterSelectedOptions
                {...props}
                renderInput={params => (
                    <TextField
                        {...params}
                        name={props.name}
                        className={classes.textField}
                        variant="outlined"
                    />
                )}
            />
        </div>
    );
};
MultiSelect.defaultProps = {
    options : [],
    multiple:true,
    name : null
}

MultiSelect.propTypes = {
    getOptionLabel : PropTypes.func,
    options : PropTypes.array,
    onChange : PropTypes.func,
    defaultValue : PropTypes.array,
    multiple : PropTypes.bool,
    noOptionsText : PropTypes.node,
};

export default memo(MultiSelect);