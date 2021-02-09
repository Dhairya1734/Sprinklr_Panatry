import React, { Component } from 'react';
import DisplayCartRow from "./DisplayCartRow.js";

class DisplayCartItems extends Component {
    constructor(props) {
        super(props);
        this.DisplayItems = this.DisplayItems.bind(this);
    }

    DisplayItems(cart){
        let allRowsInCart = [];
        let ctr = 1;
        for(let [key,value] of cart){
            allRowsInCart.push(<DisplayCartRow key={key.toString()+value.toString()+ctr.toString()} itemId={key} id={key.toString()+value.toString()} srNo={ctr} name={this.props.itemList[key].itemName} qty={value}/>);
            ctr++;
        }
        return allRowsInCart;
    }


    render() { 

        console.log("DisplayCartItem Start");

        return ( 
            <table className="White cart_table">
                <tbody>
                    {this.DisplayItems(this.props.cart)}
                </tbody>
            </table>
        );
    }
}
 
export default DisplayCartItems;