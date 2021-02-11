import React, { useCallback } from 'react';
import ItemCard from './ItemCard';
import ItemHeading from './ItemHeading';
import {Provider, useDispatch , useSelector } from 'react-redux'

export default React.memo(function ItemList(props){
    const dispatch = useDispatch()

    console.log("ItemList");

    const addToCartHandler = useCallback((e) => {
        if(e.target.className === "AddButton")
            dispatch ({type : "ADD_QTY_TO_CART" , key : e.target.value});
        //console.log("Add To Cart");
    } ,[])
    return(
        <section className="BoxType" id="LeftContent" onClick={addToCartHandler}>
            {Object.keys(props.itemHeading).map( key => {
                return (
                    <ItemHeading  key = {key} id={key} content = {props.itemHeading[key]} itemList ={props.itemList}/>
                )
            })}
        </section>
    );
});

