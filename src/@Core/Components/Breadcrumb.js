import React ,{memo}from 'react';
import { Breadcrumbs, Typography, Icon} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import history from '@history'
const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing(1, 2),
    },
    link : {
        cursor : 'pointer'
    }
}));
const Breadcrumb = (props) => {
    const classes = useStyles()
    let {breadcrumb} = props || []

    const handleClick = (url = null) => {
        if(url){
            history.push(url)
        }
    }

    const el = breadcrumb.map(item => {

        return(
            <Typography className={item.url ? classes.link : ''} key={item.title} color="textSecondary" onClick={()=>handleClick(item.url)} >
                {item.icon && <Icon>{item.icon}</Icon>}
                {item.title}
            </Typography>
        )
    })
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Typography className={classes.link} color="textSecondary"  onClick={()=>handleClick('/')} >
                <Icon>home</Icon>
            </Typography>
            {el}
        </Breadcrumbs>
    )
}
Breadcrumb.defaultProps = {
    breadcrumb : [
        {
            icon : 'home',
            url : '/'
        }
    ]
}
Breadcrumb.propTypes = {
    breadcrumb : PropTypes.array.isRequired,
}
export default memo(Breadcrumb);