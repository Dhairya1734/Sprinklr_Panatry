import React, { useCallback, useEffect, useState } from 'react';
import Navigation from './Navigation.js'
import Cart from './Cart.js'
import ItemList from './ItemList.js'
import { createStore } from 'redux';
import rootReducer from './Reducer.js';
import { Provider } from 'react-redux';
//import { connect } from 'react-redux';

let store = createStore(rootReducer);

export default function Maincontent(props) {

    //const itemList = JSON.parse(localStorage.getItem("items"));
    const itemHeading = JSON.parse(localStorage.getItem("heading"));
    const [items, setItems] = useState()
    useEffect(() => {
        window.fetch('https://raw.githubusercontent.com/Dhairya1734/Sprinklr_Panatry/main/itemdata.json',{mode : 'cors', method : 'GET'})
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(() => console.log("Error"));
    }, []);

    return (
        <Provider store={store}>
            <section id="Content">
                <Navigation itemHeading={itemHeading} itemList = {items}/>
                <ItemList itemList = {items} itemHeading={itemHeading} />
                <Cart itemList = {items}/>
            </section>
        </Provider>
    );
    
}



//export default connect(null,null)(Maincontent);
