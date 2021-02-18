import React, { useEffect, useState,/* lazy, */ Suspense } from 'react';
import Navigation from './Navigation'
// import Cart from './Cart'
// import ItemList from './ItemList'
import { createStore } from 'redux';
import rootReducer from './Reducer';
import { Provider,connect } from 'react-redux';
import { LOCALSTORAGE } from "./localStorage";
import {ItemHeading, ItemList} from './Types'

const store = createStore(rootReducer);

// const Navigation= lazy(() => import('./Navigation'));
// const Cart= lazy(() => import('./Cart'));

const Maincontent : React.FunctionComponent =()=> {
    const itemHeading :ItemHeading  = JSON.parse(localStorage.getItem(LOCALSTORAGE.HEADING)!);
    const [items, setItems] = useState<ItemList | null >( null )
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
                    <Navigation itemHeading={itemHeading} itemList ={items !== null ? items : null} />
                </Suspense>
                {/* <ItemList itemList={items} itemHeading={itemHeading} />
                <Suspense fallback = {<div className="loading"> Cart is Loading </div>}>
                    <Cart itemList={items} />
                </Suspense> */}
            </section>
        </Provider>
    );
}

connect(null,null)(Maincontent);

export default Maincontent;
