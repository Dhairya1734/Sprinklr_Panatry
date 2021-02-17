import React,{useCallback, useState} from 'react';
import DisplayPreviousOrderRow from './DisplayPrevoiusOrderRow'
import {useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {LOCALSTORAGE} from './localStorage'
import { ACTIONS } from "./Reducer";

const removeFromPending= (tempId) => {
    const penOrd=JSON.parse(localStorage.getItem(LOCALSTORAGE.PENDING_ORDER));
    penOrd.splice(penOrd.indexOf(tempId),1);
    localStorage.setItem(LOCALSTORAGE.PENDING_ORDER,JSON.stringify(penOrd));
    localStorage.setItem(LOCALSTORAGE.ORDER_UPDATED,"true");
}

export default function DisplayPreviousOrder(props) {

    const dispatch = useDispatch();

    const [state,setState] = useState(
        {"allOrd" : JSON.parse(localStorage.getItem(LOCALSTORAGE.ALL_ORDER) , function(key, value) {
        if (key == 'date') return new Date(value);
        return value;
    })});

    const removeOredrfromPrevious = useCallback((e) => {
        let newOrd = {...state.allOrd};
        const deletedObj = newOrd[e.target.value];
        delete newOrd[e.target.value];
        setState({allOrd: newOrd});
        localStorage.setItem(LOCALSTORAGE.ALL_ORDER,JSON.stringify(newOrd));
        return deletedObj;
    },[state.allOrd]);

    const OnDisplayAllOrder = useCallback((e) => {
        if(e.target.dataset.buttonType == "cancelButton"){
            props.displayPreviousListHandler();
        }
        else if(e.target.dataset.buttonType == "editButton"){

            console.log(e.target.value);
    
            const tempId=e.target.value;
    
            removeFromPending(tempId);
    
            const deletedObj = removeOredrfromPrevious(e);

            dispatch ({type : ACTIONS.COPY_TO_CART , obj : deletedObj})

            props.displayPreviousListHandler();
    
    
        } else if(e.target.dataset.buttonType == "removeButton"){
    
            removeOredrfromPrevious(e);
    
        } else if(e.target.dataset.buttonType == "copyToCartButton"){
            const allOrd = {...state.allOrd};
            
            dispatch ({type : ACTIONS.COPY_TO_CART , obj : allOrd[e.target.value]})
            props.displayPreviousListHandler();
        }
    },[])

    return ReactDOM.createPortal(

        <div className="previousOrderDisplay" onClick = {OnDisplayAllOrder}>
            <button className="cancelButton" data-button-type="cancelButton">
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