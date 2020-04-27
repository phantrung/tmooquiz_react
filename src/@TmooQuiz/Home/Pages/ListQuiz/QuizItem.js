import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Identify from "../../../../@Core/Helper/Identify";
import {now} from "moment";
const useStyles = makeStyles({
    root: {
        width : '100%'
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
    avatar : {
        width : 30,
        height : 30,
        '& i' : {
            fontSize : 14
        }
    }
});

const QuizItem = (props) => {
    const classes = useStyles();
    const {data} = props
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} elevation={4}>
            <div className="quiz-title bg-blue-700 p-16 text-white flex items-center">
                <Avatar className={classes.avatar}><i className="fas fa-book"/></Avatar>
                <div className="text-base ml-8">{data.title}</div>
            </div>
            <CardContent>
                <div className="quiz-meta flex justify-between">
                    <Typography variant="p" component="p" className="mb-8 mr-8">
                        <span><i className="fas fa-user "/> </span> <span>{data.user.fullname}</span>
                    </Typography>
                    <Typography variant="p" component="p" className="mb-8" color="textSecondary">
                        <span><i className="fas fa-clock "/> </span> <span>{Identify.formatDate(now())}</span>
                    </Typography>
                </div>

                <Typography variant="p" component="p" className="mb-8">
                    <span><i className="fas fa-chart-bar "/> Lượt thi : </span> <span>{data.viewed}</span>
                </Typography>
                <Typography variant="p" component="p" className="mb-8">
                    <span><i className="fas fa-sticky-note text-red-500"/> Mô tả : </span> <span>{data.note}</span>
                </Typography>
                <Typography variant="p" component="p" className="mb-8">
                    <span><i className="fas fa-download text-green-500"/> Lượt download : </span> <span>{data.download}</span>
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="secondary"  className="normal-case">Chi tiết</Button>
            </CardActions>
        </Card>
    );
}
export default React.memo(QuizItem)