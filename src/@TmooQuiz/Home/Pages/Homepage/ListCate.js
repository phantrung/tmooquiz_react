import React, {useEffect, useState} from 'react';
import CateItem from "./CateItem";
import {makeStyles} from "@material-ui/styles";
import CateModel from "../../Model/Category";
import Loading from "../../../../@Core/Components/Loading";
import Container from "@material-ui/core/Container";
import QuizHelper from "../../../Helper/Quiz";
const useStyles = makeStyles(theme => ({
    cloudImg : {
        height : 46,
        top : -40,
        backgroundImage : 'url(assets/images/homepage/top_cloud.png)',
        position : 'absolute',
        left : 0,
        width : '100%'
    }
}))
const ListCate = (props) => {
    const classes = useStyles()
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        CateModel.getList()
            .then(res =>{
                setData(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(`===========> err`,error)
            })
    },[])

    const renderListCate = () =>{
        if(data instanceof Array){
            const color = QuizHelper.getColorRandom()
            return data.map((item,index) =>{
                return (
                    <div className="md:w-1/4 sm:w-1/3 w-1/2 pl-8 pr-8 pb-20  sm:pl-20 sm:pr-20 sm:pb-40" key={item.id}>
                        <CateItem {...item} color={color[index]}/>
                    </div>
                )
            })
        }
    }

    if(loading){
        return <div className="mt-40"><Loading/></div>
    }
    return (
        <section className="section-category mt-12 sm:mt-56 bg-white pt-20 relative">
            <Container maxWidth="lg">
                <h3 className="title">
                    <div className="title-cat-homepage">Danh sách chuyên mục <i className="fas fa-heart"/></div>
                </h3>
                <div className={classes.cloudImg}/>
                <div className="list-cate flex flex-wrap mt-32">
                    {renderListCate()}
                </div>
            </Container>
        </section>
    )
}

export default React.memo(ListCate);