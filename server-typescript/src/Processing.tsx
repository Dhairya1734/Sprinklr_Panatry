import React from 'react';
import DisplayOrderCard from './DisplayOrderCard'
import {useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { AllOrder, ItemList, State } from './Types';

type Props = {
    items : ItemList,
    allOrd : AllOrder,
    table : string
}

function Processing(props : Props): JSX.Element{
    
    const processingOrder = useSelector( (state : State) => state.processingOrder);

    return(
        <>
        <header>
            <span className="orderStatusHeader"><strong> Processing </strong></span>
        </header>
        {Object.keys(processingOrder).map( (key : string) : JSX.Element => {
            return ( props.table == "all" || props.allOrd[processingOrder[Number(key)]]["no"].toString() == props.table.toString()) ?
                <DisplayOrderCard key={key} id={processingOrder[Number(key)]} allOrd={props.allOrd} buttonDisplayValue={"Deliver"} items= {props.items}/> : <></>;
        })}
        <section id="displayProcessingId"></section>
        </>
    );
};

Processing.propTypes = {
    items: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string
        )
    ),
    allOrd: PropTypes.object,
    table : PropTypes.string,
}

export default React.memo(Processing);