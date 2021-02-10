import React, { useCallback } from 'react';
import DisplayCartItems from './DisplayCartItems.js'
import AddOrderToPrevious from './AddOrderToPrevious.js'
import {Provider, useDispatch , useSelector } from 'react-redux'


export default function Cart(props) {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    let cartHandlers = (e) => {
        let key=e.target.value;
        if(e.target.parentElement.className == "table_item_subtract"){
            dispatch ({type : "SUB_QTY_FROM_CART" , key : key})
        }
        else if(e.target.parentElement.className == "table_item_add"){
            dispatch ({type : "ADD_QTY_TO_CART" , key : key})
        }
        else if(e.target.parentElement.className == "table_item_remove"){
            dispatch ({type : "REMOVE_FROM_CART" , key : key})
        }
    };

    let addOredrToPrevious = (e) => {
        AddOrderToPrevious({cart : cart});
        dispatch ({type : "RESET_CART"});
    };
    
    return (
        <section className="BoxType" id="RightContent">
            <header id="RightSectionTitle">
                <strong>Your Items</strong>
            </header>
            {console.log("This is updated")}
            <section id="SelectedTable" onClick={cartHandlers}>
                <DisplayCartItems itemList = {props.itemList}/>
            </section>
            <section id="SubmitButtonSection">
                <button id="SubmitButton" onClick={addOredrToPrevious}> Place Order</button>
            </section>
        </section>
    );
}