import React from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
	id: string;
	alt?: string;
	src?: string;
	itemName?: string;
};

const ItemCard = (props: Props): JSX.Element => {
	const source = "./img/" + props.src;
	return (
		<div className='createBox showBox'>
			<LazyLoadImage className='images' src={source} alt={props.alt} />{" "}
			<br />
			<span className='itemName'> {props.itemName} </span>
			<button
				className='addButton'
				value={props.id}
				data-button-type={true}
			>
				{" "}
				Add To Cart{" "}
			</button>
		</div>
	);
};

ItemCard.propTypes = {
	itemName: PropTypes.string,
	src: PropTypes.string,
	alt: PropTypes.string,
	id: PropTypes.string.isRequired,
};

export default React.memo(ItemCard);
