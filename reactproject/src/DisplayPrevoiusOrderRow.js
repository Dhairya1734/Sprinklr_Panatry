import React from 'react';
// import PreviousOrderSubRow from './PreviousOrderSubRow'
import PropTypes from 'prop-types'

const DisplayPreviousOrderRow =  React.memo((props) => {

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
                                <td className = "previousOrderItemTableItemName" > {props.itemList[key]["itemName"]} </td>
                                <td > {props.order[key]} </td>
                            </tr>)
                        : null;
                    })}
                    </tbody>
                </table>
            </td>
            <td className = "prOrEdit">
                { props.order.status === "Pending" || props.order.status === "Deliverd" ? 
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

DisplayPreviousOrderRow.propTypes = {
    id : PropTypes.string,
    order : PropTypes.object,
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string)),
}

export default DisplayPreviousOrderRow;
