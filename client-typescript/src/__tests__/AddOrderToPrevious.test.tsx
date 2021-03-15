import { createStore } from "redux";
import rootReducer, { ACTIONS } from "../Reducer";
import AddOrderToPrevious from "./../AddOrderToPrevious";

let store:any;

let storage: any;

const log = console.log;  //eslint-disable-line

beforeEach(() => {
	store = createStore(rootReducer);
	storage = {
		all_order: '{"u02111":{"date":"2021-02-18T10:12:01.629Z","no":"02","status":"On Way","i001":2,"i002":1},"u03112": { "date": "2021-02-18T10:28:39.144Z", "no": "03", "status": "Delivered", "i001": 2, "i002": 2 } , "u08117": {"date": "2021-03-11T07:05:02.163Z", "no": "08", "status": "Pending", "i001": 6}}', // eslint-disable-line
		Pending_Order: `["u08117"]`, //eslint-disable-line
		Order_Id: "25",
	};
});

window.localStorage.__proto__.getItem = (key : string) => {
	return storage[key];
};

window.localStorage.__proto__.setItem = (key: string, value: string) => {
	storage[key] = value;
	return;
};

test("Add One Order", () => {
	store.dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: "i009" });
	AddOrderToPrevious({ cart: store.getState().cart });
	expect(storage.all_order.includes(`"u0625":{"date":"2021-03-15T10:14:53.600Z","no":"06","status":"Pending","i009":1}`)); //eslint-disable-line
	// log(storage);
});

test("Submit empty order", () => {
	window.alert = jest.fn();
	AddOrderToPrevious({ cart: store.getState().cart });
	expect(alert).toBeCalledTimes(1);
});

test("Add multiple orders", () => {
	store.dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: "i009" });
	AddOrderToPrevious({ cart: store.getState().cart });

	expect(storage.all_order.includes(`"u0625":{"date":"2021-03-15T10:14:53.600Z","no":"06","status":"Pending","i009":1}`)); //eslint-disable-line
	expect(storage.Pending_Order.indexOf("u0625")).not.toBe(-1);

	store.dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: "i002" });
	AddOrderToPrevious({ cart: store.getState().cart });
	expect(storage.all_order.includes(`"u0625":{"date":"2021-03-15T10:14:53.600Z","no":"06","status":"Pending","i009":1}`)); //eslint-disable-line
	expect(storage.all_order.includes(`"u0726":{"date":"2021-03-15T10:20:37.722Z","no":"07","status":"Pending","i009":1,"i002":1}`)); //eslint-disable-line
	expect(storage.Pending_Order.indexOf("u0625")).not.toBe(-1);
	expect(storage.Pending_Order.indexOf("u0726")).not.toBe(-1);
});
