import React from 'react';
import TableRow from './TableRow.js';

export default React.memo(function DisplayOrderCard(props){
    console.log("Card");
    return(
        <div className = "Order" datasettable = {props.all_ord[props.id]["no"]} >
            <header className="Name">
                Table No {props.all_ord[props.id]["no"]}
            </header>
            <section className = "Items">
                <table className = "List">
                    <tbody>
                        {Object.keys(props.all_ord[props.id]).map( name => {
                            return (name !== "no" && name!="date" && name!="status" && name!="id") ? <TableRow key={name} name={props.items[name]["itemName"]} qty={props.all_ord[props.id][name]}/> : ""
                        })}
                    </tbody>
                </table>
            </section>
            <button className="done On_Way" value={props.id}> {props.onButton} </button>
        </div>
    );
});