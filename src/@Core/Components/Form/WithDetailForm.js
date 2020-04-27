import React from "react";
import PropTypes from 'prop-types'
export const WithDetailForm = props => {
    const handleSubmit = e => {
        e.preventDefault()
        props.handleSubmit(e)
    }

    // const {field_array} = props
    // const renderFields = () => {
    //     return field_array.sort((a,b) => a.sort_order - b.sort_order)
    //         .map((field,index) => {
    //             const {hidden} = field
    //             if(hidden === true) return null
    //             return <InputField key={index} {...field}/>
    //         })
    // }
    return (
        <form
            id="detailForm"
            onSubmit={handleSubmit}
            className=" w-full"
        >
            {props.fields}
            <button id={props.btnSubmitId} type="submit" style={{display:'none'}}>save</button>
        </form>
    )
}
WithDetailForm.defaultProps = {
    fields : null,
    handleSubmit : () => {},
    field_array : [],
    btnSubmitId : 'btnSubmitForm'
}
WithDetailForm.propTypes = {
    fields : PropTypes.node,
    handleSubmit : PropTypes.func,
    field_array : PropTypes.array,
    btnSubmitId : PropTypes.string,
}