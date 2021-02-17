import React from 'react';
import DisplayOrderCard from './DisplayOrderCard.js'

export default React.memo(function Pending(props){
    return (
        <>
        <header> 
            <span className="Order_Status_Header"><strong>Pending</strong></span>
        </header>
        <section id="displayPendingId">
            {Object.keys(props.pen_ord).map( key => {
                return ( props.table == "all" || props.all_ord[props.pen_ord[key]]["no"].toString() == props.table.toString()) ?
                <DisplayOrderCard key={key} id={props.pen_ord[key]} all_ord={props.all_ord} onButton={"Move To Processing"} items= {props.items}/> : "";
            })}
            {/* <DisplayOrderCard items={props.items} pen_ord={props.pen_ord}/> */}
        </section>
        </>
    );
})