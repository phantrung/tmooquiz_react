import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Icon} from "@material-ui/core";
const CustomCell = (props) => {
    const {render,value,customTitle,showTooltip,variant,label_type} = props
    let content = value
    let className = ''
    if(render){
        content = render
    }
    let title = showTooltip && value ? value : ''
    if(customTitle) title = customTitle
    if(variant === 'label'){
        if(label_type === 'success'){
            className = 'pt-4 pb-4 pl-8 pr-8 rounded bg-green-700 text-white'
        }
        if(label_type === 'error'){
            className = 'pt-4 pb-4 pl-8 pr-8 rounded bg-red-700 text-white'
        }
        if(label_type === 'warning'){
            className = 'pt-4 pb-4 pl-8 pr-8 rounded bg-orange-700 text-white'
        }
    }
    if(variant === 'status-icon'){
        title = customTitle ? customTitle : value ? 'Active' : 'Inactive'
        content = <div className={`flex items-center ${value ? 'text-green-700' : 'text-red-700'}`}><Icon>{value ? 'check_circle' : 'block'}</Icon></div>
    }
    return (
        <Tooltip title={title} placement="top">
            <div className={clsx(className)}>
                {content}
            </div>
        </Tooltip>
    )
}
CustomCell.defaultProps = {
    value : '',
    showTooltip : true
}
CustomCell.propTypes = {
    value : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.element,
    ]),
    customTitle : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.element,
    ]),
    render : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
    ]),
    showTooltip : PropTypes.bool,
    variant : PropTypes.oneOf(['label','status-icon']),
    label_type : PropTypes.oneOf(['success','error','warning']),
}
export default React.memo(CustomCell);