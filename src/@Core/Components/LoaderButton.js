import pick from 'lodash/pick';
import React, {memo} from 'react';
import {indigo} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon'
const useStyles = makeStyles(() => ({
    buttonProgress: {
        color: indigo[50],
        marginLeft: '.8rem',
    }
}));

export const LoaderButton = props => {
    const classes = useStyles();
    const importedProps = pick(props, [
        'className',
        'color',
        'type',
        'variant',
        'disabled',
        'aria-label',
        'onClick',
        'icon',
        'style'
    ]);
    return (
        <Button {...importedProps}>
          {props.icon && <Icon style={{marginRight:'0.8rem'}}>{props.icon}</Icon>}
          <div style={{
              textTransform : 'initial'
          }}>
              {props.children}
          </div>
          {props.loading ? <CircularProgress size={20} className={classes.buttonProgress}/> : undefined}
        </Button>
    );
}
export default memo(LoaderButton)