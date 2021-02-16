import {React, useCallback} from 'react';
import DisplayCartItems from './DisplayCartItems'
import AddOrderToPrevious from './AddOrderToPrevious'
import {useDispatch , useSelector } from 'react-redux'
import PropTypes from 'prop-types'


export default function Cart(props) {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    let cartHandlers = useCallback((e) => {
        let key=e.target.value;
        if(e.target.parentElement.className == "tableItemSubtract"){
            dispatch ({type : "SUB_QTY_FROM_CART" , key : key})
        }
        else if(e.target.parentElement.className == "tableItemAdd"){
            dispatch ({type : "ADD_QTY_TO_CART" , key : key})
        }
        else if(e.target.parentElement.className == "tableItemRemove"){
            dispatch ({type : "REMOVE_FROM_CART" , key : key})
        }
    },[]);

    let addOredrToPrevious = useCallback((e) => {
        AddOrderToPrevious({cart : cart});
        dispatch ({type : "RESET_CART"});
    },[cart]);
    
    return (
        <section className="boxType" id="rightContent">
            <header id="rightSectionTitle">
                <strong>Your Items</strong>
            </header>
            {console.log("This is updated")}
            <section id="selectedTable" onClick={cartHandlers}>
                <DisplayCartItems itemList = {props.itemList}/>
            </section>
            <section id="submitButtonSection">
                <button id="submitButton" onClick={addOredrToPrevious}> Place Order</button>
            </section>
        </section>
    );
}

Cart.propTypes={
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string))
}