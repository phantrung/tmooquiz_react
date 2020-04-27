import React from "react";
import {useDispatch} from "react-redux";
import {useForm} from "../../../../@fuse/hooks";
import Identify from "../../../../@Core/Helper/Identify";
import {WithDetailForm} from "../../../../@Core/Components/Form/WithDetailForm";
import RoleModel from "../../Model/Role";
import FormField from "../../../../@Core/Components/Form/FormField";

const DetailForm = (props) => {
    let initState = {
        name : '',
        description : '',
    }
    const {data,setOpen,getCollectionData} = props
    if(data instanceof Object && data.id){
        initState = {
            ...initState,
            ...data
        }
    }
    const {form,handleChange} = useForm(initState)
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        try {
            Identify.showLoadingPage()
            let resSubmit = await RoleModel.save(form)
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
                    <FormField
                        label={`Description`}
                        type="textarea"
                        FieldProps={{
                            name : 'description',
                            value : form.description,
                            onChange : handleChange
                        }}
                    />
                </div>
            }
        />
    )
}

export default React.memo(DetailForm);
