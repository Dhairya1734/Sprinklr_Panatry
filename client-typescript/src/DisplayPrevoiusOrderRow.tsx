import React from 'react';
// import PreviousOrderSubRow from './PreviousOrderSubRow'
//  import PropTypes from 'prop-types'
import {ItemList, OneOrder} from './Types';

type Props = {
    id : string,
    order : OneOrder,
    itemList : ItemList,
}

const DisplayPreviousOrderRow : React.MemoExoticComponent<(props: Props) => JSX.Element> =  React.memo((props : Props) => {

    return (
        <tr>
            <td className="prOrDate">{props.order.date.toDateString()}</td>
            <td className="prOrTime">{props.order.date.toTimeString().split(' ')[0]}</td>
            <td className="prOrItems">
                <table className="subTable">
                    <tbody>
                    {Object.keys(props.order).map( (key) => {
                        return (key !== "id" && key!=="date" && key!="status" && key!="no") ? 
                            //  <PreviousOrderSubRow key={key} name={props.itemList[key]["itemName"]} qty={props.order[key]} type = "CLIENT_TYPE"/> 
                            ( <tr key={key} className="previousOrderItemRow">
                                <td className = "previousOrderItemTableItemName" > { props.itemList != null ? props.itemList[key]["itemName"] : ""} </td>
                                <td > {props.order[key]} </td>
                            </tr>)
                        : null;
                    })}
                    </tbody>
                </table>
            </td>
            <td className = "prOrEdit">
                { props.order.status === "Pending" || props.order.status === "Delivered" ? 
                    <button className = { (props.order.status === "Pending" ? "editButton" : "removeButton")} value={props.id} data-button-type = { (props.order.status === "Pending" ? "editButton" : "removeButton")}> {
                        props.order.status == "Pending" ? "Edit" : "Remove"} 
                    </button> : ""
                }
                { props.order.status !== "Pending" ? <button className="copyToCartButton" value={props.id} data-button-type="copyToCartButton"> Copy To Cart</button> : ""}
            </td>
            <td className="prOrStatus">{props.order.status}</td>
        </tr>
    );
    
});

export default DisplayPreviousOrderRow;