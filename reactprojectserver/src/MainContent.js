import React, { useCallback, useState, useEffect } from 'react';
import OnWay from './OnWay';
import Processing from './Processing'
import Pending from './Pending'
import {useDispatch , useSelector } from 'react-redux'
import PropTypes from 'prop-types';

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

    saveToLocalStorage("Pending_Order",pendingOrder);
    saveToLocalStorage("Processing_Order",processingOrder);
    saveToLocalStorage("On_Way_Order",onWayOrder);
    saveToLocalStorage("Delivered_order",deliveredOrder);

    useEffect(() => {
        window.fetch('https://raw.githubusercontent.com/Dhairya1734/Sprinklr_Panatry/main/itemdata.json',{method : 'GET'})
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(() => console.log("Error"));
    },[]);

    let [state,setState] = useState({
        "allOrd" : JSON.parse(localStorage.getItem("all_order")),
    });

    function checkUpdate(){

        console.log("Updated");

        if(localStorage.getItem("order_updated") === "true"){
            dispatch({type : "COPY_TO_PENDING"});
            setState({allOrd : JSON.parse(localStorage.getItem("all_order"))});
            localStorage.setItem("order_updated","false");
        }
        setTimeout(checkUpdate,5000);
    }

    setTimeout(checkUpdate,5000);

    let updateStatus = useCallback((key,value) => {
        let newAllOrd = {...state.allOrd};
        newAllOrd[key]["status"]=value;
        localStorage.setItem("all_order",JSON.stringify(newAllOrd));
        setState({...state, allOrd : newAllOrd});
        return newAllOrd;
    },[state.allOrd]);

    let moveToProcessingHandler = useCallback( (e) => {
        if(e.target.tagName == "BUTTON"){
            dispatch({type : "REMOVE_FROM_PENDING" ,  key : e.target.value.toString() });
            updateStatus(e.target.value,"Processing");
            dispatch({type : "ADD_TO_PROCESSING" ,  key : e.target.value.toString() });
        }
    },[] ) ;

    let moveToOnWayHandler = useCallback( (e) => {
        if(e.target.tagName == "BUTTON"){
            dispatch({type : "REMOVE_FROM_PROCESSING" ,  key : e.target.value.toString() });
            updateStatus(e.target.value,"On Way");
            dispatch({type : "ADD_TO_ON_WAY" ,  key : e.target.value.toString() });
        }
    },[]);

    let moveToDeliveredHandler = useCallback( (e) => {
        if(e.target.tagName == "BUTTON"){
            dispatch({type : "REMOVE_FROM_ON_WAY" ,  key : e.target.value.toString() });
            updateStatus(e.target.value,"Deliverd");
            dispatch({type : "ADD_TO_DELIVERED" ,  key : e.target.value.toString() });
        }
    }, []);


    return(
        <section className="content">
            <div className="orderStatus" id="onWay" onClick={moveToDeliveredHandler}>
                <OnWay items={items} allOrd={state.allOrd} table={props.table}/>
            </div>
            <div className="orderStatus" id="processing" onClick={moveToOnWayHandler}>
                <Processing items={items} allOrd={state.allOrd} table={props.table} />
            </div>
            <div className="orderStatus" id="pending" onClick={moveToProcessingHandler}>
                <Pending items={items} allOrd={state.allOrd} table={props.table}/>
            </div>
        </section>
    );
}

MainContent.propTypes = {
    table : PropTypes.string,
}