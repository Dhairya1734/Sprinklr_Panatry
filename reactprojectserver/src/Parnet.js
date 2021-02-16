import React ,{ useState} from 'react';
import {useDispatch , useSelector } from 'react-redux'

export default function Parent(){

    const dispatch = useDispatch()
    const pendingOrder = useSelector( state => state.pendingOrder);
    const processingOrder = useSelector( state => state.processingOrder);

    return(
        <>
            <button onClick = { () => dispatch({type : "ADD_TO_PENDING" ,  key : "Temp" })}> Click Me </button>
            <button onClick = { () => dispatch({type : "REMOVE_FROM_PENDING" ,  key : "Temp" })}> Click Me </button>
            {console.log(pendingOrder)}
            <button onClick = { () => dispatch({type : "ADD_TO_PROCESSING" ,  key : "Temp" })}> Click Me </button>
            <button onClick = { () => dispatch({type : "REMOVE_FROM_PROCESSING" ,  key : "Temp" })}> Click Me </button>
            {console.log(processingOrder)}
        </>
    )
}