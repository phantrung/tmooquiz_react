import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types'
import _find from 'lodash/find'
import Identify from "../../Helper/Identify";
import {TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles(theme => ({
    root: {
        // margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        // width: 200,
        height: 300,
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

const CustomList = (props) => {
    const classes = useStyles();
    const {checked,title, items,listData,handleToggleAll,numberOfChecked,handleToggle} = props
    const [data,setData] = useState(items)
    const [inputValue,setInputValue] = useState('')
    useEffect(()=>{
        setData(items)
        setInputValue('')
    },[items])
    return (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(data)}
                        checked={numberOfChecked(data) === data.length && data.length !== 0}
                        indeterminate={numberOfChecked(data) !== data.length && numberOfChecked(data) !== 0}
                        disabled={data.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(data)}/${data.length} selected`}

            />
            <div className="mb-8 ml-16 mr-16">
                <TextField
                    placeholder={`Tìm kiếm`}
                    variant="outlined"
                    fullWidth
                    value={inputValue}
                    inputProps={{
                        style : {
                            padding : '12px 16px'
                        },
                        className : "input-search-transfer"
                    }}
                    onChange={(e)=>{
                        setInputValue(e.target.value)
                        let val = e.target.value.trim()
                        if(!val || val === '') {
                            setData(items)
                            return
                        }
                        let result = items.filter(id => {
                            let item = _find(listData,{value:id})
                            return item instanceof Object && item.label.toString().toLowerCase().indexOf(val.toLowerCase()) > -1
                        })
                        // setLeft(not(result.map(item => item.value), rightDefaultValues));
                        setData(result)
                    }}
                />
            </div>
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {listData.length > 0 && data.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;
                    let item = _find(listData,{value}) || {}
                    if(!item.hasOwnProperty('label')) return null
                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId}
                                          primary={
                                              <Box
                                                  style={{margin:0}}
                                                  component="div"
                                                  my={2}
                                                  textOverflow="ellipsis"
                                                  overflow="hidden"
                                                  className="text-2-line"
                                              >
                                                  {item.label.length <= 40 ? item.label : (
                                                      <Tooltip title={item.label} placement="bottom-end">
                                                          <div>{item.label}</div>
                                                      </Tooltip>
                                                  )}
                                              </Box>
                                          }
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );
}

export default function TransferList(props) {
    const classes = useStyles();
    const {listChecked,listData,rightDefaultValues,leftTitle,rightTitle,handleValue} = props
    const [checked, setChecked] = React.useState(listChecked);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    useEffect(()=>{
        setRight(rightDefaultValues)
        setLeft(not(listData.map(item => item.value), rightDefaultValues));
        // eslint-disable-next-line
    },[listData,rightDefaultValues])

    // useEffect(()=>{
    //     handleValue(right)
    // },[handleValue])

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = items => intersection(checked, items).length;
    const handleToggleAll = items => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        handleValue(right.concat(leftChecked))
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        handleValue(not(right, rightChecked))
        setChecked(not(checked, rightChecked));
    };

    Identify.setDataSession(Identify.SESSION_STORAGE,'tf_permission',right)
    return (
        <Grid container spacing={2} alignItems="center" className={classes.root}>
            <Grid item xs={5}>
                <CustomList title={leftTitle}
                            checked={checked}
                            items={left}
                            listData={listData}
                            handleToggleAll={handleToggleAll}
                            handleToggle={handleToggle}
                            numberOfChecked={numberOfChecked}/>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={5}>
                <CustomList title={rightTitle}
                            items={right}
                            checked={checked}
                            listData={listData}
                            handleToggle={handleToggle}
                            handleToggleAll={handleToggleAll}
                            numberOfChecked={numberOfChecked}/>
            </Grid>
        </Grid>
    );
}
TransferList.defaultProps = {
    listChecked : [],
    listData : [{label : 'item 1',value:1}],
    rightDefaultValues : [],
}
TransferList.propTypes = {
    listChecked: PropTypes.array,
    leftTitle : PropTypes.string,
    rightTitle : PropTypes.string,
    listData: PropTypes.array,
    rightDefaultValues: PropTypes.array,
}