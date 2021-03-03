import { combineReducers } from "redux";
import { LOCALSTORAGE } from "./localStorage";

type Actions = {
	COPY_TO_PENDING: string;
	REMOVE_FROM_PENDING: string;
	ADD_TO_PROCESSING: string;
	REMOVE_FROM_PROCESSING: string;
	ADD_TO_ON_WAY: string;
	REMOVE_FROM_ON_WAY: string;
	ADD_TO_DELIVERED: string;
};

export const ACTIONS: Actions = {
	COPY_TO_PENDING: "COPY_TO_PENDING",
	REMOVE_FROM_PENDING: "REMOVE_FROM_PENDING",
	ADD_TO_PROCESSING: "ADD_TO_PROCESSING",
	REMOVE_FROM_PROCESSING: "REMOVE_FROM_PROCESSING",
	ADD_TO_ON_WAY: "ADD_TO_ON_WAY",
	REMOVE_FROM_ON_WAY: "REMOVE_FROM_ON_WAY",
	ADD_TO_DELIVERED: "ADD_TO_DELIVERED",
} as const;

function pushToArray(key: string, array: string[]): string[] {
	//console.log(key);
	const newArray: string[] = array.slice();
	newArray.push(key);
	return newArray;
}

function removeFromArray(key: string, array: string[]): string[] {
	//console.log(key);
	const newArray: string[] = array.slice();
	newArray.splice(newArray.indexOf(key), 1);
	return newArray;
}

function copyFromArray(array: string[]): string[] {
	const newArray: string[] = array.slice();
	return newArray;
}

function onPending(
	state = JSON.parse(localStorage.getItem(LOCALSTORAGE.PENDING_ORDER)!),
	action: { type: string; key: string }
): string[] {
	switch (action.type) {
	case ACTIONS.COPY_TO_PENDING:
		return copyFromArray(
			JSON.parse(localStorage.getItem(LOCALSTORAGE.PENDING_ORDER)!)
		);
	case ACTIONS.REMOVE_FROM_PENDING:
		return removeFromArray(action.key, state);
	default:
		return state;
	}
}

function onProcessing(
	state = JSON.parse(localStorage.getItem(LOCALSTORAGE.PROCESSING_ORDER)!),
	action: { type: string; key: string }
): string[] {
	switch (action.type) {
	case ACTIONS.ADD_TO_PROCESSING:
		return pushToArray(action.key, state);
	case ACTIONS.REMOVE_FROM_PROCESSING:
		return removeFromArray(action.key, state);
	default:
		return state;
	}
}

function onOnWay(
	state = JSON.parse(localStorage.getItem(LOCALSTORAGE.ON_WAY_ORDER)!),
	action: { type: string; key: string }
): string[] {
	switch (action.type) {
	case ACTIONS.ADD_TO_ON_WAY:
		return pushToArray(action.key, state);
	case ACTIONS.REMOVE_FROM_ON_WAY:
		return removeFromArray(action.key, state);
	default:
		return state;
	}
}

function deliveredHandler(
	state = JSON.parse(localStorage.getItem(LOCALSTORAGE.DELIVERED_ORDER)!),
	action: { type: string; key: string }
): string[] {
	switch (action.type) {
	case ACTIONS.ADD_TO_DELIVERED:
		return pushToArray(action.key, state);
	default:
		return state;
	}
}

const rootReducer = combineReducers({
	pendingOrder: onPending,
	processingOrder: onProcessing,
	onWayOrder: onOnWay,
	deliveredOrder: deliveredHandler,
});

export default rootReducer;
