import React, { useCallback } from 'react';
import DisplayCartRow from "./DisplayCartRow";
import {useSelector } from 'react-redux'
import PropTypes from 'prop-types'
 
const DisplayCartItems= React.memo((props) => {

    const cart = useSelector(state => state.cart);

    const DisplayItems = useCallback((cart) => {
        const allRowsInCart = [];
        let ctr = 1;
        for(const [key,value] of cart){
            allRowsInCart.push(<DisplayCartRow key={key.toString()+value.toString()+ctr.toString()} itemId={key} id={key.toString()+value.toString()} srNo={ctr} name={props.itemList[key].itemName} qty={value}/>);
            ctr++;
        }
        return allRowsInCart;
    },[cart]);

    return ( 
        <table className="White cartTable">
            <tbody>
                {DisplayItems(cart)}
            </tbody>
        </table>
    );
});

DisplayCartItems.propTypes = {
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string))
}

export default DisplayCartItems;