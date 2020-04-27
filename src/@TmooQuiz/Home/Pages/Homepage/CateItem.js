import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import CardActionArea from "@material-ui/core/CardActionArea";
import clsx from 'clsx'
import {Link} from 'react-router-dom'
const useStyles = makeStyles({
    root: {
        width : '100%',
        cursor : 'pointer',
        '& a:hover' : {
            textDecoration : 'none !important'
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cateIcon : {
        '& hr' : {
            top : 20,
            width : '100%'
        }
    }
});

const CateItem = props => {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={5}>
            <Link to={`danh-muc/${props.cat_slug}.html`} >
                <CardActionArea>
                    <div className={clsx('cate-icon text-base relative mt-16',classes.cateIcon)}>
                        <Avatar className={`relative z-999 bg-${props.color}-500 ml-16`}><i className={props.cat_icon ? props.cat_icon : 'fas fa-folder'}/></Avatar>
                        <Divider className="absolute"/>
                    </div>
                    <CardContent>
                        <Typography variant="h5" component="h5" className="text-lg" color="textPrimary">
                            {props.category}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}
export default React.memo(CateItem)