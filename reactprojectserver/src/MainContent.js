import React, { useCallback, useState, useEffect } from 'react';
import OnWay from './OnWay';
import Processing from './Processing'
import Pending from './Pending'
import {useDispatch , useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import {ACTIONS} from './Reducer';
import {LOCALSTORAGE} from './localStorage'

function saveToLocalStorage(key,array) {
    localStorage.setItem(key,JSON.stringify(array));
}

export default function MainContent(props){

    const [items, setItems] = useState();
    const dispatch = useDispatch();
    const pendingOrder = useSelector( state => state.pendingOrder);
    const processingOrder = useSelector( state => state.processingOrder);
    const onWayOrder = useSelector( state => state.onWayOrder);
    const deliveredOrder = useSelector( state => state.deliveredOrder);

    saveToLocalStorage(LOCALSTORAGE.PENDING_ORDER ,pendingOrder);
    saveToLocalStorage(LOCALSTORAGE.PROCESSING_ORDER,processingOrder);
    saveToLocalStorage(LOCALSTORAGE.ON_WAY_ORDER,onWayOrder);
    saveToLocalStorage(LOCALSTORAGE.DELIVERED_ORDER,deliveredOrder);

    useEffect(() => {
        window.fetch('https://raw.githubusercontent.com/Dhairya1734/Sprinklr_Panatry/main/itemdata.json',{method : 'GET'})
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(() => console.log("Error"));
    },[]);

    const [state,setState] = useState({
        "allOrd" : JSON.parse(localStorage.getItem(LOCALSTORAGE.ALL_ORDER)),
    });

    useEffect(() => {
        function checkUpdate(){

            console.log("Updated");
    
            if(localStorage.getItem(LOCALSTORAGE.ORDER_UPDATED) === "true"){
                dispatch({type : ACTIONS.COPY_TO_PENDING});
                setState({allOrd : JSON.parse(localStorage.getItem(LOCALSTORAGE.ALL_ORDER))});
                localStorage.setItem(LOCALSTORAGE.ORDER_UPDATED,"false");
            }
        }
        const timerID = setInterval(checkUpdate, 5000 )
        return () => {
            return clearInterval(timerID);
        }
    }, [])

    const updateStatus = useCallback((key,value) => {
        const newAllOrd = {...state.allOrd};
        newAllOrd[key]["status"]=value;
        localStorage.setItem(LOCALSTORAGE.ALL_ORDER,JSON.stringify(newAllOrd));
        setState({...state, allOrd : newAllOrd});
        return newAllOrd;
    },[state.allOrd]);

    const onMoveToProcessing = useCallback( (e) => {
        if(e.target.dataset.buttonType){
            dispatch({type : ACTIONS.REMOVE_FROM_PENDING ,  key : e.target.value.toString() });
            updateStatus(e.target.value,"Processing");
            dispatch({type : ACTIONS.ADD_TO_PROCESSING ,  key : e.target.value.toString() });
        }
    },[] ) ;

    const onMoveToOnWay = useCallback( (e) => {
        if(e.target.dataset.buttonType){
            dispatch({type : ACTIONS.REMOVE_FROM_PROCESSING,  key : e.target.value.toString() });
            updateStatus(e.target.value,"On Way");
            dispatch({type : ACTIONS.ADD_TO_ON_WAY ,  key : e.target.value.toString() });
        }
    },[]);

    const onMoveToDelivered = useCallback( (e) => {
        if(e.target.dataset.buttonType){
            dispatch({type : ACTIONS.REMOVE_FROM_ON_WAY ,  key : e.target.value.toString() });
            updateStatus(e.target.value,"Deliverd");
            dispatch({type : ACTIONS.ADD_TO_DELIVERED ,  key : e.target.value.toString() });
        }
    }, []);


    return(
        <section className="content">
            <div className="orderStatus" id="onWay" onClick={onMoveToDelivered}>
                <OnWay items={items} allOrd={state.allOrd} table={props.table}/>
            </div>
            <div className="orderStatus" id="processing" onClick={onMoveToOnWay}>
                <Processing items={items} allOrd={state.allOrd} table={props.table} />
            </div>
            <div className="orderStatus" id="pending" onClick={onMoveToProcessing}>
                <Pending items={items} allOrd={state.allOrd} table={props.table}/>
            </div>
        </section>
    );
}

MainContent.propTypes = {
    table : PropTypes.string,
}