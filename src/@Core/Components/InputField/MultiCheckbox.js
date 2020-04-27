import React,{memo} from 'react';
import PropTypes from 'prop-types';
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    root: {
        // margin: 'auto',
        minWidth : '100%',
        [theme.breakpoints.up('md')] : {
            minWidth : '70%'
        },
        display : 'inline-block'
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        // width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

const MultiCheckbox = props => {

    const classes = useStyles()
    const {options,title,defaultChecked,onChange} = props
    const [checked, setChecked] = React.useState(defaultChecked);

    const handleSetChecked = checked => {
        onChange(checked)
        setChecked(checked)
    }

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(`===========> newChecked`,newChecked)
        handleSetChecked(newChecked);
    };

    const numberOfChecked = items => intersection(checked, items).length;
    const handleToggleAll = items => () => {
        if (numberOfChecked(items) === items.length) {
            handleSetChecked(not(checked, items));
        } else {
            handleSetChecked(union(checked, items));
        }
    };
    let items = options.map(item => item.value)
    return (
        <Card className={classes.root} elevation={1}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={options.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${checked.length}/${options.length} selected`}
                // subheader={`subheader`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {options.length > 0 && options.map((item,index) => {
                    const labelId = `transfer-list-all-item-${index}-label`;
                    return (
                        <ListItem key={index} role="listitem" button onClick={handleToggle(item.value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(item.value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${item.label}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );
};
MultiCheckbox.defaultProps = {
    options : [],
    title : null,
    defaultChecked : [],
    onChange : () => {}
}
MultiCheckbox.propTypes = {
    options : PropTypes.array,
    title : PropTypes.node,
    defaultChecked : PropTypes.array,
    onChange : PropTypes.func,
};

export default memo(MultiCheckbox);