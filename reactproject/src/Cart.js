import React from 'react';
import DisplayCartItems from './DisplayCartItems.js'
import AddOrderToPrevious from './AddOrderToPrevious'

export default class Cart extends React.Component{

    constructor(props){
        super(props);
        this.cartHandlers=this.cartHandlers.bind(this);
        this.addOredrToPrevious=this.addOredrToPrevious.bind(this);
    }

    cartHandlers(e){
        let key=e.target.value;
        if(e.target.parentElement.className == "table_item_subtract"){
            this.props.handler.subtractQtyHandler(key);
        }
        else if(e.target.parentElement.className == "table_item_add"){
            this.props.handler.addQtyHandler(key);
        }
        else if(e.target.parentElement.className == "table_item_remove"){
            this.props.handler.removeItemFromCartHandler(key);
        }
        console.log(key);
    }

    addOredrToPrevious(e){
        AddOrderToPrevious({ cart : this.props.cart });
        this.props.resetCart();
    }

    render(){

        console.log("Cart Start");

        return(
            <section className="BoxType" id="RightContent">
                <header id="RightSectionTitle">
                    <strong>Your Items</strong>
                </header>
                {console.log("This is updated")}
                <section id="SelectedTable" onClick={this.cartHandlers}>
                    <DisplayCartItems cart = {this.props.cart} itemList = {this.props.itemList}/>
                </section>
                <section id="SubmitButtonSection">
                    <button id="SubmitButton" onClick={this.addOredrToPrevious}> Place Order</button>
                </section>
            </section>
        );
    }
}