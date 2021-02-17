import React from 'react';
import DisplayOrderCard from './DisplayOrderCard'
import {useSelector } from 'react-redux'
import PropTypes from 'prop-types';

function Processing(props){
    
    const processingOrder = useSelector( state => state.processingOrder);

    return(
        <>
        <header>
            <span className="orderStatusHeader"><strong> Processing </strong></span>
        </header>
        {Object.keys(processingOrder).map( key => {
            return ( props.table == "all" || props.allOrd[processingOrder[key]]["no"].toString() == props.table.toString()) ?
                <DisplayOrderCard key={key} id={processingOrder[key]} allOrd={props.allOrd} buttonDisplayValue={"Deliver"} items= {props.items}/> : "";
        })}
        <section id="displayProcessingId"></section>
        </>
    );
};

Processing.propTypes = {
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

export default React.memo(Processing);