import React,{useCallback, useState} from 'react';
import DisplayPreviousOrderRow from './DisplayPrevoiusOrderRow'
import {useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'


const removeFromPending= (tempId) => {
    let penOrd=JSON.parse(localStorage.getItem("Pending_Order"));
    penOrd.splice(penOrd.indexOf(tempId),1);
    localStorage.setItem("Pending_Order",JSON.stringify(penOrd));
    localStorage.setItem("order_updated","true");
}

export default function DisplayPreviousOrder(props) {

    const dispatch = useDispatch();

    const [state,setState] = useState(
        {"allOrd" : JSON.parse(localStorage.getItem("all_order") , function(key, value) {
        if (key == 'date') return new Date(value);
        return value;
    })});

    const removeOredrfromPrevious = useCallback((e) => {
        let newOrd = {...state.allOrd};
        let deletedObj = newOrd[e.target.value];
        delete newOrd[e.target.value];
        setState({allOrd: newOrd});
        localStorage.setItem("all_order",JSON.stringify(newOrd));
        return deletedObj;
    },[state]);

    const displayAllOrderHandler = useCallback((e) => {
        if(e.target.className == "cancelButton"){
            props.displayPreviousListHandler();
        }
        else if(e.target.className == "editButton"){

            console.log(e.target.value);
    
            let tempId=e.target.value;
    
            removeFromPending(tempId);
    
            let deletedObj = removeOredrfromPrevious(e);

            dispatch ({type : "COPY_TO_CART" , obj : deletedObj})

            props.displayPreviousListHandler();
    
    
        } else if(e.target.className == "removeButton"){
    
            removeOredrfromPrevious(e);
    
        } else if(e.target.className == "copyToCartButton"){
            let allOrd = {...state.allOrd};
            
            dispatch ({type : "COPY_TO_CART" , obj : allOrd[e.target.value]})
            props.displayPreviousListHandler();
        }
    },[])

    return ReactDOM.createPortal(

        <div className="previousOrderDisplay" onClick = {displayAllOrderHandler}>
            <button className="cancelButton">
                [X]
            </button>
            <section className="previousOrderSection">
                    <table className="previousOrderTable">
                        <tbody>
                            {
                                Object.keys(state.allOrd).map( (key) => {
                                    return <DisplayPreviousOrderRow key={key} id={key} order = {state.allOrd[key] } itemList = {props.itemList}/>
                                })
                            }
                        </tbody>
                    </table>
            </section>
        </div>,
        document.getElementsByClassName('App')[0]
    );
    
}

DisplayPreviousOrder.propTypes = {
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string)),
    displayPreviousListHandler : PropTypes.func.isRequired
}