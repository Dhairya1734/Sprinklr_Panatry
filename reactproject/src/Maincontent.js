import React, { useCallback, useEffect, useState } from 'react';
import Navigation from './Navigation.js'
import Cart from './Cart.js'
import ItemList from './ItemList.js'

/*export default class Maincontent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cart : new Map(),
            "itemList" : JSON.parse(localStorage.getItem("items")),
            "itemHeading" : JSON.parse(localStorage.getItem("heading")),
        }
        this.removeItemFromCart=this.removeItemFromCart.bind(this);
        this.addQty=this.addQty.bind(this);
        this.subtractQty=this.subtractQty.bind(this);
        this.addItemToCart=this.addItemToCart.bind(this);
        this.resetCart=this.resetCart.bind(this);
        this.copyToCart=this.copyToCart.bind(this);
    }

    removeItemFromCart(key){
        console.log("Remove Item");
        let newCart = new Map(this.state.cart);
        newCart.delete(key);
        this.setState({cart : newCart});
    }

    addQty(key){
        let newCart = new Map(this.state.cart);
        if(newCart.get(key) === undefined)
            newCart.set(key,1);
        else
            newCart.set(key,this.state.cart.get(key)+1);
        this.setState({cart : newCart});
    }

    subtractQty(key){
        let newCart = new Map(this.state.cart);
        if(newCart.get(key) === 1)
            this.removeItemFromCart(key);
        else{
            newCart.set(key,this.state.cart.get(key)-1);
            this.setState({cart : newCart});
        }
    }

    addItemToCart(e){
        if(e.target.className == "AddButton")
            this.addQty(e.target.value);
    }


    resetCart(){
        console.log("First Step Is done");
        let newCart = new Map();
        this.setState({cart : newCart});
    }

    copyToCart(tempObj){
        //let tempObj = {};
        let newCart = new Map();
        for(let key in tempObj){
            if(key !== "id" && key!=="date" && key!="status" && key!="no"){
                newCart.set(key,tempObj[key]);
            }
        }
        this.setState({cart : newCart});
    }

    render(){
        let Handlers = {
            addQtyHandler : this.addQty,
            subtractQtyHandler : this.subtractQty,
            removeItemFromCartHandler : this.removeItemFromCart
        };
        return (
            <section id="Content">
                <Navigation itemHeading={this.state.itemHeading} itemList = {this.state.itemList} copyToCartHandler = {this.copyToCart}/>
                <ItemList handler={this.addItemToCart} itemList = {this.state.itemList} itemHeading={this.state.itemHeading} />
                <Cart cart={this.state.cart} handler={Handlers} itemList = {this.state.itemList} resetCart = {this.resetCart}/>
            </section>
        )
    }
} */

export default function Maincontent(props) {

    const [state , setState] = useState({
        "cart" : new Map(),
        "itemList" : JSON.parse(localStorage.getItem("items")),
        "itemHeading" : JSON.parse(localStorage.getItem("heading")),
    },[]);

    const removeItemFromCart = useCallback((key) => {
        let newCart = new Map(state.cart);
        newCart.delete(key);
        setState({...state , cart : newCart});
    },[state]);

    const addQty = useCallback((key) => {
        let newCart = new Map(state.cart);
        if(newCart.get(key) === undefined)
            newCart.set(key,1);
        else
            newCart.set(key,state.cart.get(key)+1);
        setState({...state , cart : newCart});
    },[state]);

    const subtractQty = useCallback((key) => {
        let newCart = new Map(state.cart);
        if(newCart.get(key) === 1)
            removeItemFromCart(key);
        else{
            newCart.set(key,state.cart.get(key)-1);
            setState({...state , cart : newCart});
        }
    },[state]);

    const addItemToCart = (e) => {
        if(e.target.className == "AddButton")
            addQty(e.target.value);
    };


    const resetCart = useCallback(() => {
        console.log("First Step Is done");
        let newCart = new Map();
        setState({...state , cart : newCart});
    },[state]);

    const copyToCart = useCallback((tempObj) => {
        let newCart = new Map();
        for(let key in tempObj){
            if(key !== "id" && key!=="date" && key!="status" && key!="no"){
                newCart.set(key,tempObj[key]);
            }
        }
        setState({...state , cart : newCart});
    },[state]);

    const Handlers =  {
        "addQtyHandler" : addQty,
        "subtractQtyHandler" : subtractQty,
        "removeItemFromCartHandler" : removeItemFromCart
    }

    return (
        <section id="Content">
            <Navigation itemHeading={state.itemHeading} itemList = {state.itemList} copyToCartHandler = {copyToCart}/>
            <ItemList handler={addItemToCart} itemList = {state.itemList} itemHeading={state.itemHeading} />
            <Cart cart={state.cart} handler={Handlers} itemList = {state.itemList} resetCart = {resetCart}/>
        </section>
    );
    
}