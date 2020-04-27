import React,{memo} from 'react';
import PropTypes from 'prop-types';
import {Icon, Tooltip,IconButton} from "@material-ui/core";

const IconAction = props => {
    const {icon,tooltipTitle,tooltipPosition,TooltipProps,IconButtonProps,onClick,color} = props
    return (
        <Tooltip title={tooltipTitle} placement={tooltipPosition} {...TooltipProps}>
            <IconButton color={color} onClick={onClick} {...IconButtonProps}>
                <Icon>
                    {icon}
                </Icon>
            </IconButton>
        </Tooltip>
    );
};
IconAction.defaultProps = {
    TooltipProps : {},
    IconButtonProps : {},
    icon : null,
    tooltipTitle : '',
    tooltipPosition : 'top',
    onClick : () => {},
    color : 'default'
}
IconAction.propTypes = {
    TooltipProps : PropTypes.object,
    IconButtonProps : PropTypes.object,
    icon : PropTypes.string,
    tooltipTitle : PropTypes.string,
    tooltipPosition : PropTypes.string,
    onClick : PropTypes.func,
    color : PropTypes.oneOf(['primary','secondary','default']),
};

export default memo(IconAction);