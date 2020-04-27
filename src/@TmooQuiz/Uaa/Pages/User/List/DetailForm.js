import React from "react";
import {useDispatch} from "react-redux";
import {useForm} from "../../../../../@fuse/hooks";
import Identify from "../../../../../@Core/Helper/Identify";
import {WithDetailForm} from "../../../../../@Core/Components/Form/WithDetailForm";
import UserModel from "../../../Model/User";
import FormField from "../../../../../@Core/Components/Form/FormField";
import PropTypes from "prop-types";
import SelectBox from "../../../../../@Core/Components/InputField/SelectBox";

const DetailForm = (props) => {
    let initState = {
        name : '',
        email : '',
        password : '',
        roles : []
    }
    const {data,setOpen,getCollectionData} = props
    if(data instanceof Object && data.id){
        initState = {
            ...initState,
            ...data
        }
    }
    const {form,handleChange,setInForm} = useForm(initState)
    const dispatch = useDispatch()
    console.log(`===========> form`,form)
    const handleSubmit = async () => {
        try {
            Identify.showLoadingPage()
            let resSubmit = await UserModel.save(form)
            Identify.handleSuccessResponse(resSubmit,dispatch)
            setOpen(false,null)
            getCollectionData()
        }catch (e) {
            Identify.hideLoadingPage()
            Identify.handleErrorResponse(e,dispatch)
        }
    }

    return (
        <WithDetailForm
            handleSubmit={handleSubmit}
            fields={
                <div>
                    <FormField
                        label={`Name`}
                        required
                        FieldProps={{
                            name : 'name',
                            value : form.name,
                            onChange : handleChange
                        }}
                    />
                    {data instanceof Object && data.hasOwnProperty('id') ? null : (
                        <div>
                            <FormField
                                label={`Email`}
                                required
                                FieldProps={{
                                    type : 'email',
                                    name : 'email',
                                    value : form.email,
                                    onChange : handleChange,
                                }}
                            />
                            <FormField
                                label={`Password`}
                                required
                                FieldProps={{
                                    type : 'password',
                                    name : 'password',
                                    value : form.password,
                                    onChange : handleChange,
                                }}
                            />
                        </div>
                    )}

                    <FormField
                        label={`Vai trò`}
                        required
                        type="custom-field"
                        customField={
                            <SelectBox
                                options={[
                                    {
                                        label : 'Admin',
                                        value : 'admin'
                                    },
                                    {
                                        label : 'Owner',
                                        value : 'owner'
                                    }
                                ]}
                                menuPlacement="top"
                                onChange={val => setInForm('roles',val.map(item => item.value))}
                            />
                        }
                    />
                </div>
            }
        />
    )
}
DetailForm.propTypes = {
    data : PropTypes.object,
    setOpen : PropTypes.func,
    setCollectionData : PropTypes.func,
}
export default React.memo(DetailForm);
