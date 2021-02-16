import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ItemCard = React.memo((props) => {
    const source = "./img/" + props.src;
    return ( 
        <div className="createBox showBox">
            <LazyLoadImage className="images" src={source} alt={props.alt}/> <br />
            <span className="itemName"> {props.itemName} </span>
            <button className="addButton" value={props.id}> Add To Cart </button>
        </div>
    );
});

ItemCard.propTypes = {
    itemName : PropTypes.string,
    src : PropTypes.string,
    alt : PropTypes.string,
    id: PropTypes.string.isRequired,
}

export default ItemCard;