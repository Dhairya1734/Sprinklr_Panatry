import React, { useCallback } from 'react';
import DisplayCartRow from "./DisplayCartRow";
import {useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {ItemList , Cart} from './Types'
 
const DisplayCartItems= (props : { itemList : ItemList}) => {

    const cart = useSelector((state : {cart : Cart}) => state.cart);

    const DisplayItems = useCallback((cart) : JSX.Element[]=> {
        const allRowsInCart = [];
        let ctr = 1;
        for(const [key,value] of cart){
            allRowsInCart.push(<DisplayCartRow key={key.toString()+value.toString()+ctr.toString()} itemId={key} id={key.toString()+value.toString()} srNo={ctr} name={props.itemList!= null ? props.itemList[key].itemName : ""} qty={value}/>);
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
};

DisplayCartItems.propTypes = {
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string))
}

export default React.memo(DisplayCartItems);
