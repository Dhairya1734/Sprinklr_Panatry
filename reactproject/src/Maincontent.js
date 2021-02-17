import React, { useEffect, useState,lazy, Suspense } from 'react';
// import Navigation from './Navigation'
// import Cart from './Cart'
import ItemList from './ItemList'
import { createStore } from 'redux';
import rootReducer from './Reducer';
import { Provider,connect } from 'react-redux';
import { LOCALSTORAGE } from "./localStorage";

let store = createStore(rootReducer);

const Navigation= lazy(() => import('./Navigation'));
const Cart= lazy(() => import('./Cart'));

export default function Maincontent() {
    const itemHeading = JSON.parse(localStorage.getItem(LOCALSTORAGE.HEADING));
    const [items, setItems] = useState()
    useEffect(() => {
        window.fetch('https://raw.githubusercontent.com/Dhairya1734/Sprinklr_Panatry/main/itemdata.json', { method: 'GET' })
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(() => console.log("Error"));
    }, []);

    return (
        <Provider store={store}>
            <section id="content">
                <Suspense fallback = {<div className="loading"> Navigation is Loading </div>}>
                    <Navigation itemHeading={itemHeading} itemList={items} />
                </Suspense>
                <ItemList itemList={items} itemHeading={itemHeading} />
                <Suspense fallback = {<div className="loading"> Cart is Loading </div>}>
                    <Cart itemList={items} />
                </Suspense>
            </section>
        </Provider>
    );
}

connect(null,null)(Maincontent);
