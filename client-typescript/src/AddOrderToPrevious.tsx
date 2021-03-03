import PropTypes from "prop-types";
import { LOCALSTORAGE } from "./localStorage";
import { Cart } from "./Types";

type OneOrder = {
	date?: Date;
	no?: string;
	status?: "Pending" | "Processing" | "On Way" | "Delivered";
} & { [key: string]: string | number };

function AddOrderToPrevious(props: { cart: Cart }): void {
	if (props.cart.size === 0) {
		alert("Please add something to cart"); // eslint-disable-line
		return;
	}

	const allOrd = JSON.parse(localStorage.getItem(LOCALSTORAGE.ALL_ORDER)!);

	const tempObj: OneOrder = {};
	tempObj.date = new Date();
	let idNum = Number(localStorage.getItem(LOCALSTORAGE.ORDER_ID));
	tempObj.no = idNum % 10 === 9 ? "10" : "0" + String((idNum % 10) + 1);
	const allOrdId: string = "u" + tempObj.no + idNum.toString();
	idNum++;
	localStorage.setItem(LOCALSTORAGE.ORDER_ID, idNum.toString());
	tempObj.status = "Pending";

	// Order List
	for (const key of Array.from(props.cart.keys())) {
		if (props.cart.has(key)) {
			tempObj[key] = props.cart.get(key)!;
		}
	}

	allOrd[allOrdId] = tempObj;
	localStorage.setItem(LOCALSTORAGE.ALL_ORDER, JSON.stringify(allOrd));

	const penOrd: string[] = JSON.parse(
		localStorage.getItem(LOCALSTORAGE.PENDING_ORDER)!
	);
	penOrd.push(allOrdId);
	localStorage.setItem(LOCALSTORAGE.PENDING_ORDER, JSON.stringify(penOrd));
	localStorage.setItem(LOCALSTORAGE.ORDER_UPDATED, "true");
}

AddOrderToPrevious.PropTypes = {
	cart: PropTypes.instanceOf(Map),
};

export default AddOrderToPrevious;
