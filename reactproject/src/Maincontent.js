import React, { useCallback, useEffect, useState } from 'react';
import Navigation from './Navigation.js'
import Cart from './Cart.js'
import ItemList from './ItemList.js'

export default function Maincontent(props) {

    const itemList = JSON.parse(localStorage.getItem("items"));
    const itemHeading = JSON.parse(localStorage.getItem("heading"));

    return (
        <section id="Content">
            <Navigation itemHeading={itemHeading} itemList = {itemList}/>
            <ItemList itemList = {itemList} itemHeading={itemHeading} />
            <Cart itemList = {itemList}/>
        </section>
    );
    
}