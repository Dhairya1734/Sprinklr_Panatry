import React from "react";
//import TableRow from './TableRow';
import PropTypes from "prop-types";
import { AllOrder, ItemList } from "./Types";

type Props = {
	id: string;
	allOrd: AllOrder;
	buttonDisplayValue:
		| "Move To Processing"
		| "Deliver"
		| "Delivery Successful";
	items: ItemList;
};

function DisplayOrderCard(props: Props): JSX.Element {
	return (
		<div className='order' dataset-table={props.allOrd[props.id]["no"]}>
			<header className='name'>
				Table No {props.allOrd[props.id]["no"]}
			</header>
			<section className='items'>
				<table className='list'>
					<tbody>
						{Object.keys(props.allOrd[props.id]).map((name) => {
							return name !== "no" &&
								name != "date" &&
								name != "status" &&
								name != "id" ? (
									//<TableRow key={name} name={ props.items ?  props.items[name]["itemName"] : ""} qty={props.allOrd[props.id][name]} type="SERVER_TYPE"/>
									<tr key={name}>
										<td className='itemName'>
											{props.items
												? props.items[name]["itemName"]
												: ""}
										</td>
										<td className='itemQty'>
											{props.allOrd[props.id][name]}
										</td>
									</tr>
								) : null;
						})}
					</tbody>
				</table>
			</section>
			<button className='done' value={props.id} data-button-type={true}>
				{" "}
				{props.buttonDisplayValue}{" "}
			</button>
		</div>
	);
}

DisplayOrderCard.propTypes = {
	id: PropTypes.string,
	allOrd: PropTypes.object,
	buttonDisplayValue: PropTypes.string.isRequired,
	items: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};

export default React.memo(DisplayOrderCard);
