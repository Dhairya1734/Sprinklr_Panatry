import React, { useCallback } from 'react';
import ItemHeading from './ItemHeading';
import {useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ACTIONS } from "./Reducer";

let elem=[];

const ItemList = React.memo((props) => {

    const dispatch = useDispatch();
    const cart = useSelector(useCallback (state => state.cart,[]));

    console.log("ItemList");

    //Commented Code is for animation 

    const addToCartHandler = useCallback((e) => {
        if(e.target.className === "addButton"){
            console.log(e.target.value);
            dispatch ({type : ACTIONS.ADD_QTY_TO_CART , key : e.target.value});
            //e.target.parentElement.className = "createBox showBox animation";
            //elem.push([e.target.parentElement,e.target.value]);
            
        }
    } ,/* [elem] */ [])

    /* const animationEndHandler = useCallback(() => {
        elem.forEach( key => {key[0].className = "createBox showBox"; dispatch ({type : ACTIONS.ADD_QTY_TO_CART , key : key[1]});})
        elem = [];
    },[elem])
 */
    return(
        <section className="boxType" id="leftContent" onClick={addToCartHandler} /* onAnimationEnd={animationEndHandler} */>
            {Object.keys(props.itemHeading).map( key => {
                return (
                    <ItemHeading  key = {key} id={key} content = {props.itemHeading[key]} itemList ={props.itemList}/>
                )
            })}
        </section>
    );
});

ItemList.propTypes={
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string)),
    itemHeading : PropTypes.object.isRequired,
}

export default ItemList;
