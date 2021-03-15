import React from "react";
// import PreviousOrderSubRow from "./PreviousOrderSubRow"
//  import PropTypes from "prop-types"
import { ItemList, OneOrder } from "./Types";
import SvgEdit from "./svgs/Edit";

type Props = {
	id: string;
	order: OneOrder;
	itemList: ItemList;
};

const DisplayPreviousOrderRow = (props: Props) => {
	return (
		<tr>
			<td className="prOrDate">{props.order.date.toDateString()}</td>
			<td className="prOrTime">
				{props.order.date.toTimeString().split(" ")[0]}
			</td>
			<td className="prOrItems">
				<table className="subTable">
					<tbody>
						{Object.keys(props.order).map((key) => {
							return key !== "id" &&
								key !== "date" &&
								key != "status" &&
								key != "no" ? (
									<tr key={key} className="previousOrderItemRow">
										<td className="previousOrderItemTableItemName">
											{" "}
											{props.itemList != null
												? props.itemList[key]["itemName"]
												: ""}{" "}
										</td>
										<td> {props.order[key]} </td>
									</tr>
								) : null;
						})}
					</tbody>
				</table>
			</td>
			<td className="prOrEdit">
				{props.order.status === "Pending" ||
				props.order.status === "Delivered" ? (
						<button
							data-testid={
								props.order.status === "Pending"
									? "edit"
									: "remove"
							}
							className={
								props.order.status === "Pending"
									? "editButton"
									: "removeButton"
							}
							value={props.id}
							data-button-type={
								props.order.status === "Pending"
									? "editButton"
									: "removeButton"
							}
						>
							{" "}
							{props.order.status == "Pending" ? (
								<SvgEdit />
							) : (
								<></>
							)}{" "}
							{props.order.status == "Pending" ? "Edit" : "Remove"}
						</button>
					) : (
						""
					)}
				{props.order.status !== "Pending" ? (
					<button
						name= "copyToCart"
						data-testid="copyToCart"
						className="copyToCartButton"
						value={props.id}
						data-button-type="copyToCartButton"
					>
						{" "}
						Copy To Cart
					</button>
				) : (
					""
				)}
			</td>
			<td className="prOrStatus">{props.order.status}</td>
		</tr>
	);
};

export default React.memo(DisplayPreviousOrderRow);
