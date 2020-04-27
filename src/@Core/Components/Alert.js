import React, {useState} from 'react';
import {FuseAnimate} from '@fuse'
export const AlertError = (props) => {
    const [hideAlert,setHideAlert] = useState(false)
    if(hideAlert) return null
    return(
        <FuseAnimate
            animation="transition.fadeIn"
            duration={400}
            delay={400}
        >
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-8" role="alert">
                <strong className="font-bold ml-4">Error!</strong>
                <span className="block sm:inline">{props.message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setHideAlert(true)}>
                     <svg className="fill-current text-red-500" style={{width:20,height:20}} role="button" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20"><title>Close</title>
                     <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        </FuseAnimate>

    )
}

export const AlertSuccess = (props) => {
    const [hideAlert,setHideAlert] = useState(false)
    if(hideAlert) return null
    return(
        <FuseAnimate
            animation="transition.fadeIn"
            duration={400}
            delay={400}
        >
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-8" role="alert">
                <strong className="font-bold ml-4">Success!</strong>
                <span className="block sm:inline">{props.message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={()=>setHideAlert(true)}>
                     <svg className="fill-current text-green-500" style={{width:20,height:20}} role="button" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"><title>Close</title>
                     <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        </FuseAnimate>

    )
}