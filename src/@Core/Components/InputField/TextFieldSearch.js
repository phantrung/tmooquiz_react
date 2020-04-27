import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    textField: {
        width: 250,
        marginTop:0,
        marginRight: theme.spacing(2)
    },
    inputSearch : {
        padding : 14
    },
}));
const TextFieldSearch = props => {
    const classes = useStyles()
    return (
        <TextField
            variant="outlined"
            margin="normal"
            className={classes.textField}
            inputProps={{
                className : classes.inputSearch
            }}
            {...props}
        />
    )
};

TextFieldSearch.propTypes = {
    name : PropTypes.string,
    placeholder : PropTypes.string,
};

export default TextFieldSearch;