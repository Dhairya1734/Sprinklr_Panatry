import React from 'react';
import ItemCard from './ItemCard';
import PropTypes from 'prop-types';
import {ItemList} from './Types'

type Props = {
    id : string,
    content : {
        itemList : string[],
        visbleId : string,
        visibleName : string
    },
    itemList : ItemList
}

const ItemTypeSection = (props : Props) => {

    return (
        <>
        <h1 id={props.id }>{props.content.visibleName} </h1>
        {props.itemList ? props.content["itemList"].map( key => <ItemCard {...props.itemList!== null ? props.itemList[key] : ""} id={key.toString()} key={key} />) : ""}
        </>
    );

};

ItemTypeSection.propTypes = {
    id : PropTypes.string,
    content : PropTypes.shape({
        visibleName : PropTypes.string,
        visbleId : PropTypes.string,
        itemList : PropTypes.arrayOf(PropTypes.string)
    }),
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string)),
}

export default React.memo(ItemTypeSection);
