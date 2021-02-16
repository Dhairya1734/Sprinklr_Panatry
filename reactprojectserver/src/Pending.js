import React from 'react';
import DisplayOrderCard from './DisplayOrderCard'
import {useSelector } from 'react-redux'
import PropTypes from 'prop-types';


function Pending(props){
    const pendingOrder = useSelector( state => state.pendingOrder);
    return (
        <>
        <header> 
            <span className="orderStatusHeader"><strong>Pending</strong></span>
        </header>
        <section id="displayPendingId">
            {Object.keys(pendingOrder).map( key => {
                return ( props.table == "all" || props.allOrd[pendingOrder[key]]["no"].toString() == props.table.toString()) ?
                <DisplayOrderCard key={key} id={pendingOrder[key]} allOrd={props.allOrd} onButton={"Move To Processing"} items= {props.items}/> : "";
            })}
        </section>
        </>
    );
};

Pending.propTypes = {
    items: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string,
        )
    ),
    allOrd: PropTypes.object,
    table : PropTypes.string,
}



export default React.memo(Pending);