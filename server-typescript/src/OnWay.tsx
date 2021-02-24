import React from 'react';
import DisplayOrderCard from './DisplayOrderCard';
import {useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { AllOrder, ItemList, State } from './Types';

type Props = {
    items : ItemList,
    allOrd : AllOrder,
    table : string
}

function OnWay(props : Props) : JSX.Element{

    const onWayOrder = useSelector( (state : State) => state.onWayOrder);

    return (
        <>
        <header>
            <span className="orderStatusHeader"><strong>On Way</strong></span>
        </header>
        {Object.keys(onWayOrder).map( (key : string) : JSX.Element => {
            return ( props.table == "all" || props.allOrd[onWayOrder[Number(key)]]["no"].toString() == props.table.toString()) ?
            <DisplayOrderCard key={onWayOrder[Number(key)]} id={onWayOrder[Number(key)]} allOrd={props.allOrd} buttonDisplayValue={"Delivery Successful"} items= {props.items}/> : <></>;
        })}
        <section id="displayOnWay"></section>
        </>
    );
};

OnWay.propTypes = {
    items: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string
        )
    ),
    allOrd: PropTypes.object,
    table : PropTypes.string,
}

export default React.memo(OnWay);