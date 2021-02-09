import React, { Component } from 'react';

class DisplayCartRow extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps){
        if({...this.props} === {...nextProps}){
            return false;
        }
        return true;
    }

    render() { 

        console.log("Display Row" + this.props.name);
        return (  
            <tr key={this.props.id}>
                <td className = "table_sr_no">{this.props.srNo}</td>
                <td className = "table_item_name"> {this.props.name} </td>
                <td className = "table_item_subtract">
                    <button className="Change_Qty" value={this.props.itemId}>-</button>
                </td>
                <td className = "table_item_qty">
                    {this.props.qty}
                </td>
                <td className="table_item_add">
                    <button className="Change_Qty" value={this.props.itemId}>+</button>
                </td>
                <td className="table_item_remove">
                    <button className="Cancel" value={this.props.itemId}>X</button>
                </td>
            </tr>
        );
    }
}
 
export default DisplayCartRow;