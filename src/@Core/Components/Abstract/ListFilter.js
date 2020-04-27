import React from "react";
import {FuseAnimate} from "../../../@fuse";
import Identify from "../../Helper/Identify";
import debounce from "lodash/debounce";
import {makeStyles, TextField,Icon} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    textField: {
        width: 250,
        marginTop:0,
        marginRight: theme.spacing(2)
    },
    inputSearch : {
        padding : 13
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
}

class ListFilterAbstract extends React.Component{

    constructor(props) {
        super(props);
        this.handleGetListData = this.props.handleGetListData
        this.state = {}
    }


    handleSearchInput = (key,value) => {
        let query = Identify.getQueryUrlObject()
        query[key] = value
        if(!value || value === ''){
            delete query[key]
        }
        this.handleGetListData(query)
    }

    doHandleSearchInput = debounce(this.handleSearchInput,500)

    renderInputField = props => {
        let query = Identify.getQueryUrlObject()
        return <TextFieldSearch name={`name`}
                                placeholder={`Nhập tên ...`}
                                defaultValue={props.name ? query[props.name] : null}
                                onChange={e => this.doHandleSearchInput(e.target.name,e.target.value)}
                                {...props}/>
    }


    renderContent = () => {
        return this.renderInputField()
    }

    render() {
        return(
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <div className={"mb-8 relative z-9999"}>
                    <div className="flex items-center mb-4">
                        <Icon className="mr-4" color="secondary">filter_list</Icon>
                        <span>Lọc kết quả : </span>
                    </div>
                    {this.renderContent()}
                </div>
            </FuseAnimate>
        )
    }
}
export default ListFilterAbstract