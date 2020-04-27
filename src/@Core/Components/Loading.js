import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
    loadingPage : {
        display:'none',
        position : 'absolute',
        top : 0,
        bottom: 0,
        left : 0,
        right : 0,
        zIndex : 99999999
    },
    loadingPageContent : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        background: 'rgba(238, 238, 238, 0.4)'
    },
    loading : {
        textAlign : 'center'
    }
}))

const Loading = props => {
    const classes = useStyles()
    return (
        <div className={classes.loading} style={props.style}><CircularProgress {...props.loadingProps}/></div>
    )
}

export const LoadingFullPage = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.loadingPage} id='loading-page'>
            <div className={classes.loadingPageContent}>
                <CircularProgress {...props.loadingProps}/>
            </div>
        </div>
    )
}
Loading.defaultProps = {
    loadingProps : {},
    style : {}
}
export default Loading;