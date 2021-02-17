import React from 'react';
import ItemCard from './ItemCard';
import PropTypes from 'prop-types';

const ItemTypeSection = React.memo((props) => {

    return (
        <>
        <h1 id={props.id }>{props.content.visibleName} </h1>
        {props.itemList ? props.content["itemList"].map( key => <ItemCard {...props.itemList[key]} id={key.toString()} key={key} />) : ""}
        </>
    );

});

ItemTypeSection.propTypes = {
    id : PropTypes.string,
    content : PropTypes.shape({
        visibleName : PropTypes.string,
        visbleId : PropTypes.string,
        itemList : PropTypes.arrayOf(PropTypes.string)
    }),
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string)),
}

export default ItemTypeSection;