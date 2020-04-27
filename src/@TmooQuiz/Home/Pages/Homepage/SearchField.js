import React from 'react';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import history from '@history'
const SearchField = (props) => {

    const handleChange = e => {
        const value = e.target.value
        history.push('/tim-kiem/'+value)
    }

    return (
        <TextField
            label={`Tìm kiếm đề thi ngay`}
            variant="outlined"
            className="w-320 bg-white"
            color="secondary"
            inputProps={{
                onKeyPress : e => {
                    if(e.key === 'Enter' || e.charCode === 13){
                        handleChange(e)
                    }
                }
            }}
            InputProps={{
                endAdornment : (
                    <InputAdornment position="end">
                        <IconButton
                            size="medium"
                            color="primary"
                            aria-label="toggle"
                            onClick={handleChange}
                        >
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default React.memo(SearchField);