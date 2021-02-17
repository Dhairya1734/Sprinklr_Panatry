import React from 'react';
import DisplayOrderCard from './DisplayOrderCard';
import {useSelector } from 'react-redux'
import PropTypes from 'prop-types';

function OnWay(props){

    const onWayOrder = useSelector( state => state.onWayOrder);

    return (
        <>
        <header>
            <span className="orderStatusHeader"><strong>On Way</strong></span>
        </header>
        {Object.keys(onWayOrder).map( key => {
            return ( props.table == "all" || props.allOrd[onWayOrder[key]]["no"].toString() == props.table.toString()) ?
            <DisplayOrderCard key={onWayOrder[key]} id={onWayOrder[key]} allOrd={props.allOrd} buttonDisplayValue={"Delivery Successful"} items= {props.items}/> : "";
        })}
        <section id="displayOnWay"></section>
        </>
    );
};

OnWay.propTypes = {
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

export default React.memo(OnWay);