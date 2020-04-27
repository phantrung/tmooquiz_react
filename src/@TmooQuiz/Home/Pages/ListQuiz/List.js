import React, {useEffect, useState} from 'react';
import QuizModel from "../../Model/Quiz";
import Loading from "../../../../@Core/Components/Loading";
import QuizItem from "./QuizItem";

const ListQuiz = (props) => {
    const query = props.query
    const [list,setList] = useState(QuizModel.defaultResponse)
    const [loading,setLoading] = useState(true)
    const getListQuiz = query => {
        QuizModel.getList(query)
            .then(res => {
                console.log(`===========> res`,res)
                setList(res)
                setLoading(false)
            })
            .catch(error => {
                console.log(`===========> error`,error)
            })
    }

    useEffect(()=>{
        getListQuiz(query)
    },[query])

    const renderQuizItem = () => {
        if (list && list.data.length > 0){
            return list.data.map(quiz => {
                return (
                    <div className="sm:w-1/2 md:w-1/3 pl-8 pr-8 pb-20  sm:pl-20 sm:pr-20 sm:pb-40">
                        <QuizItem data={quiz} key={quiz.id}/>
                    </div>
                )
            })
        }else {
            return <div className="mt-48">Không tìm thấy đề thi nào !</div>
        }
    }

    if(loading){
        return <div className="mt-48"><Loading/></div>
    }
    return (
        <div className="flex flex-wrap mt-24">{renderQuizItem()}</div>
    )
}
ListQuiz.defaultProps = {
    query : {}
}
export default ListQuiz;