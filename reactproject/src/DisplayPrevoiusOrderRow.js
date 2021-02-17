import React from 'react';
import PreviousOrderSubRow from './PreviousOrderSubRow'

export default React.memo(function DisplayPreviousOrderRow(props) {

    return (
        <tr>
            <td className="Pr_Or_Date">{props.order.date.toDateString()}</td>
            <td className="Pr_Or_Time">{props.order.date.toTimeString().split(' ')[0]}</td>
            <td className="Pr_Or_Items">
                <table className="sub_table">
                    {Object.keys(props.order).map( (key) => {
                        return (key !== "id" && key!=="date" && key!="status" && key!="no") ? <PreviousOrderSubRow name={props.itemList[key]["itemName"]} qty={props.order[key]}/> : null;
                    })}
                </table>
            </td>
            <td className = "Pr_Or_Edit">
                <button className = { (props.order.status === "Pending" ? "editButton" : "removeButton")} value={props.id}> {
                    props.order.status == "Pending" ? "Edit" : "Remove"} 
                </button>
            </td>
            <td className="Pr_Or_Status">{props.order.status}</td>
        </tr>
    );
    
});