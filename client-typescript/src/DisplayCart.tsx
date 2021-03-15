import React, { useCallback } from "react";
import DisplayCartItems from "./DisplayCartItems";
import AddOrderToPrevious from "./AddOrderToPrevious";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ACTIONS } from "./Reducer";
import { ItemList, Cart, Actions, Dispatch } from "./Types";

export default function DisplayCart(props: {
	itemList: ItemList;
}): JSX.Element {
	const dispatch = useDispatch<Dispatch<Actions>>();
	const cart: Cart = useSelector((state: { cart: Cart }): Cart => state.cart);

	const onCart = useCallback((e): void => {
		const key: string = e.target.value;
		if (e.target.dataset.buttonName == "subQty") {
			dispatch({ type: ACTIONS.SUB_QTY_FROM_CART, key: key });
		} else if (e.target.dataset.buttonName == "addQty") {
			dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: key });
		} else if (e.target.dataset.buttonName == "removeQty") {
			dispatch({ type: ACTIONS.REMOVE_FROM_CART, key: key });
		}
	}, []);

	const onSubmit = useCallback((): void => {
		AddOrderToPrevious({ cart: cart });
		dispatch({ type: ACTIONS.RESET_CART });
	}, [cart]);

	return (
		<section className='boxType' id='rightContent'>
			<header id='rightSectionTitle'>
				<strong>Your Items</strong>
			</header>
			<section id='selectedTable' onClick={onCart}>
				<DisplayCartItems itemList={props.itemList} />
			</section>
			<section id='submitButtonSection'>
				<button id='submitButton' onClick={onSubmit} data-testid="submit">
					{" "}
					Place Order
				</button>
			</section>
		</section>
	);
}

DisplayCart.propTypes = {
	itemList: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};
