import React, {useEffect, useState} from 'react';
import Breadcrumb from "../../../../@Core/Components/Breadcrumb";
import CateModel from "../../Model/Category";
import Typography from "@material-ui/core/Typography";
import {FusePageSimple} from "../../../../@fuse";
import Loading from "../../../../@Core/Components/Loading";
import ListQuiz from "./List";
const Index = (props) => {
    const {params} = props.match || {}
    const [category,setCategory] = useState(null)
    const [loading,setLoading] = useState(true)
    let query = {}
    const getCategory = (id,params = {}) => {
        CateModel.getDetail(id,params)
            .then(res =>{
                setCategory(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(`===========> error`,error)
            })
    }

    useEffect(() =>{
        if(params.cat_slug){
            let cat_slug = params.cat_slug
            if(cat_slug.endsWith('.html')){
                cat_slug = cat_slug.replace('.html','')
            }
            getCategory(cat_slug,{type:'slug',notAuth : true})
        }
    },[params])

    console.log(`===========> params`,params)

    const renderHeader = () =>{
        return (
            <div className="flex flex-col">
                <Breadcrumb
                    breadcrumb={[
                        {
                            title : category ? category.category : 'danh mục'
                        }
                    ]}
                />
                <Typography variant="h3" component="h1" className="text-xl mt-auto sm:text-2xl lg:text-3xl">Danh sách đề thi</Typography>
            </div>
        )
    }

    if(category){
        query = {
            ...query,
            cat_id : category.id
        }
    }

    return (
        <div>
            <FusePageSimple
                classes={{
                    header : 'p-12',
                    content : 'p-12'
                }}
                header={
                    renderHeader()
                }
                // contentToolbar={
                //     <div>
                //         abc
                //         <Divider/>
                //     </div>
                // }
                content={
                    loading ? <div className="mt-48"><Loading/></div> : <ListQuiz query={query}/>
                }
            />
        </div>
    )
}

export default React.memo(Index);