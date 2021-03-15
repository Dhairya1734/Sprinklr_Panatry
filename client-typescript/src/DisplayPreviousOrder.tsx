import React, { Dispatch, useCallback, useState } from "react";
import DisplayPreviousOrderRow from "./DisplayPrevoiusOrderRow";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { LOCALSTORAGE } from "./localStorage";
import { ACTIONS } from "./Reducer";
import { ItemList, AllOrder, OneOrder, Actions } from "./Types";

const removeFromPending = (tempId: string) => {
	const penOrd: string[] = JSON.parse(
		localStorage.getItem(LOCALSTORAGE.PENDING_ORDER)!
	);
	penOrd.splice(penOrd.indexOf(tempId), 1);
	localStorage.setItem(LOCALSTORAGE.PENDING_ORDER, JSON.stringify(penOrd));
	localStorage.setItem(LOCALSTORAGE.ORDER_UPDATED, "true");
};

type Props = {
	itemList: ItemList;
	onDisplayPreviousList: VoidFunction;
};

export default function DisplayPreviousOrder(props: Props): JSX.Element {
	const dispatch = useDispatch<Dispatch<Actions>>();

	const [state, setState] = useState<{ allOrd: AllOrder }>({
		allOrd: JSON.parse(
			localStorage.getItem(LOCALSTORAGE.ALL_ORDER)!,
			function (key, value) {
				if (key == "date") {
					return new Date(value);
				}
				return value;
			}
		),
	});

	const removeOredrfromPrevious = useCallback(
		(e): OneOrder => {
			const newOrd = { ...state.allOrd };
			const deletedObj = newOrd[e.target.value];
			delete newOrd[e.target.value];
			setState({ allOrd: newOrd });
			localStorage.setItem(
				LOCALSTORAGE.ALL_ORDER,
				JSON.stringify(newOrd)
			);
			return deletedObj;
		},
		[state.allOrd]
	);

	const OnDisplayAllOrder = useCallback((e): void => {
		if (e.target.dataset.buttonType == "cancelButton") {
			props.onDisplayPreviousList();
		} else if (e.target.dataset.buttonType == "editButton") {

			const tempId: string = e.target.value;

			removeFromPending(tempId);

			const deletedObj: OneOrder = removeOredrfromPrevious(e);

			dispatch({ type: ACTIONS.COPY_TO_CART, obj: deletedObj });

			props.onDisplayPreviousList();
		} else if (e.target.dataset.buttonType == "removeButton") {
			removeOredrfromPrevious(e);
		} else if (e.target.dataset.buttonType == "copyToCartButton") {
			const allOrd = { ...state.allOrd };

			dispatch({
				type: ACTIONS.COPY_TO_CART,
				obj: allOrd[e.target.value],
			});
			props.onDisplayPreviousList();
		}
	}, []);

	return ReactDOM.createPortal(
		<div className='previousOrderDisplay' onClick={OnDisplayAllOrder} data-content-box-type='displayOrder' data-testid="allPreviousOrder">
			<button className='cancelButton' data-button-type='cancelButton'>
				[X]
			</button>
			<section className='previousOrderSection'>
				<table className='previousOrderTable'>
					<tbody data-testid="orders">
						{Object.keys(state.allOrd).map((key) => {
							return (
								<DisplayPreviousOrderRow
									key={key}
									id={key}
									order={state.allOrd[key]}
									itemList={props.itemList}
								/>
							);
						})}
					</tbody>
				</table>
			</section>
		</div>,
		// document.getElementsByClassName("App")[0];
		document.getElementsByTagName("BODY")[0]
	);
}

DisplayPreviousOrder.propTypes = {
	itemList: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
	onDisplayPreviousList: PropTypes.func.isRequired,
};
