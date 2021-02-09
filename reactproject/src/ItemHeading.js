import React, { Component } from 'react';
import ItemCard from './ItemCard';

export default React.memo(function ItemHeading(props){

    return (
        <>
        <h1 key={props.id}> {props.content.visibleName} </h1>
        {props.content["itemList"].map( key => <ItemCard {...props.itemList[key]} id={key.toString()} key={props.id + key} />)}
        </>
    );

});



{/*  */}