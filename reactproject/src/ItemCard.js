import React, { Component } from 'react';

export default React.memo(function ItemCard(props) {
    console.log(props.src);
    const source = "./img/" + props.src;
    return ( 
        <div className="Create_Box Show_box">
            <img className="images" src={source} alt={props.alt}/> <br />
            <span className="Item_Name"> {props.itemName} </span>
            <button className="AddButton" value={props.id}> Add To Cart </button>
        </div>
    );
});