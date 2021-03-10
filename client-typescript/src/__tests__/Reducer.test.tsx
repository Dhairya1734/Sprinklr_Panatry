// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { OneOrder } from "../Types";
import { OneOrder } from "../Types";
import rootReducer, { ACTIONS } from "./../Reducer";

// eslint-disable

const log = console.log; // eslint-disable-line


const obj : OneOrder = {
	date: new Date(),
	no: "005",
	status: "Pending",
	"i002": "2",
	"i003": "3"
} as any as OneOrder;



test(" Add Item to existing Cart ", () => {
	const tempCart = new Map();
	tempCart.set("first", 2);
	const action = {
		key: "second",
		type: ACTIONS.ADD_QTY_TO_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action  );
	tempCart.set("second", 1);
	expect(answer.cart).toMatchObject(tempCart);
});

test(" Add Qty to Cart ", () => {
	const tempCart = new Map();
	tempCart.set("first", 2);
	const action = {
		key: "first",
		type: ACTIONS.ADD_QTY_TO_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action  );
	tempCart.set("first", 3);
	expect(answer.cart).toMatchObject(tempCart);
});

test("Add Item to empty cart", () => {
	const tempCart = new Map();
	const action = {
		key: "second",
		type: ACTIONS.ADD_QTY_TO_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action);
	tempCart.set("second",1);
	expect(answer.cart).toMatchObject(tempCart);
});

test("Remove Item From Cart using x button", () => {
	const tempCart = new Map();
	tempCart.set("second", 5);
	const action = {
		key: "second",
		type: ACTIONS.REMOVE_FROM_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action);
	// tempCart.set("second",1);
	tempCart.delete("second");
	expect(answer.cart).toMatchObject(tempCart);
});

test("subtract Qty From Cart using which has >1 qty", () => {
	const tempCart = new Map();
	tempCart.set("second", 5);
	const action = {
		key: "second",
		type: ACTIONS.SUB_QTY_FROM_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action);
	// tempCart.set("second",1);
	tempCart.set("second", 4);
	expect(answer.cart).toMatchObject(tempCart);
});

test("subtract Qty From Cart using which has 1 qty", () => {
	const tempCart = new Map();
	tempCart.set("second", 1);
	const action = {
		key: "second",
		type: ACTIONS.SUB_QTY_FROM_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action);
	// tempCart.set("second",1);
	tempCart.delete("second");
	expect(answer.cart).toMatchObject(tempCart);
});

test("Reset Cart", () => {
	const tempCart = new Map();
	tempCart.set("second", 2);
	tempCart.set("first", 1);
	tempCart.set("third", 3);
	const action = {
		type: ACTIONS.RESET_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action);
	// tempCart.set("second",1);
	tempCart.clear();
	expect(answer.cart).toMatchObject(tempCart);
});

test("Reset Empty Cart", () => {
	const tempCart = new Map();
	const action = {
		type: ACTIONS.RESET_CART,
	};
	const answer = rootReducer({ cart: tempCart }, action);
	// tempCart.set("second",1);
	tempCart.clear();
	expect(answer.cart).toMatchObject(tempCart);
});

test("copy To cart", () => {
	const tempCart = new Map();
	const action = {
		type: ACTIONS.COPY_TO_CART,
		obj:obj
	};
	const answer = rootReducer({ cart: tempCart }, action);
	tempCart.set("i002", 2);
	tempCart.set("i003", 3);
	expect(answer.cart).toMatchObject(tempCart);
});