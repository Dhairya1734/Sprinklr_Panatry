import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DisplayPreviousOrder from "./../DisplayPreviousOrder";
import { items } from "./../database";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../Reducer";
let store:any;

let storage:any;

const log = console.log; //eslint-disable-line

const displayPreviousList = () => {
	// log("I am called");
	return;
};

beforeEach(() => {
	store = createStore(rootReducer);
	storage = {
		all_order: '{"u02111":{"date":"2021-02-18T10:12:01.629Z","no":"02","status":"On Way","i001":2,"i002":1},"u03112": { "date": "2021-02-18T10:28:39.144Z", "no": "03", "status": "Delivered", "i001": 2, "i002": 2 } , "u08117": {"date": "2021-03-11T07:05:02.163Z", "no": "08", "status": "Pending", "i001": 6}}', // eslint-disable-line
		Pending_Order : `["u08117"]` //eslint-disable-line
	};
});

jest.spyOn(window.localStorage.__proto__, "getItem");

window.localStorage.__proto__.getItem = (key : string) => {
	return storage[key];
};

window.localStorage.__proto__.setItem = (key: string, value: string) => {
	storage[key] = value;
	return;
};

test("Copy to cart test with empty cart", () => {
	const element = render(
		<Provider store={store}>
			<DisplayPreviousOrder
				itemList={items}
				onDisplayPreviousList={displayPreviousList}
			/>
		</Provider>
	);

	expect(store.getState().cart).toMatchObject(new Map());

	fireEvent.click(element.getAllByTestId("copyToCart")[0]);

	const expectedCart = new Map();
	expectedCart.set("i001", 2);
	expectedCart.set("i002", 1);
	expect(store.getState().cart).toMatchObject(expectedCart);

});

test("Copy to cart test with non-empty cart", () => {
	const element = render(
		<Provider store={store}>
			<DisplayPreviousOrder
				itemList={items}
				onDisplayPreviousList={displayPreviousList}
			/>
		</Provider>
	);

	expect(store.getState().cart).toMatchObject(new Map());

	fireEvent.click(element.getAllByTestId("copyToCart")[0]);

	expect(store.getState().cart).not.toMatchObject(new Map());

	fireEvent.click(element.getAllByTestId("copyToCart")[1]);

	const expectedCart = new Map();
	expectedCart.set("i001", 2);
	expectedCart.set("i002", 2);
	expect(store.getState().cart).toMatchObject(expectedCart);

});

test("Remove from previous Orders with non-empty cart", () => {
	const element = render(
		<Provider store={store}>
			<DisplayPreviousOrder
				itemList={items}
				onDisplayPreviousList={displayPreviousList}
			/>
		</Provider>
	);

	fireEvent.click(element.getAllByTestId("copyToCart")[0]);

	const existingCart = store.getState().cart;

	expect(store.getState().cart).toMatchObject(existingCart);

	fireEvent.click(element.getAllByTestId("remove")[0]);

	expect(store.getState().cart).toMatchObject(existingCart);

	expect(storage.all_order.includes('"u03112": { "date": "2021-02-18T10:28:39.144Z", "no": "03", "status": "Delivered", "i001": 2, "i002": 2 }')).toBeFalsy(); //eslint-disable-line

});

test("Remove from previous Orders with empty cart", () => {
	const element = render(
		<Provider store={store}>
			<DisplayPreviousOrder
				itemList={items}
				onDisplayPreviousList={displayPreviousList}
			/>
		</Provider>
	);

	const existingCart = store.getState().cart;

	expect(store.getState().cart).toMatchObject(existingCart);

	fireEvent.click(element.getAllByTestId("remove")[0]);

	expect(store.getState().cart).toMatchObject(existingCart);

	expect(storage.all_order.includes('"u03112": { "date": "2021-02-18T10:28:39.144Z", "no": "03", "status": "Delivered", "i001": 2, "i002": 2 }')).toBeFalsy(); //eslint-disable-line

});

test("Edit Existing Order with empty cart", () => {
	const element = render(
		<Provider store={store}>
			<DisplayPreviousOrder
				itemList={items}
				onDisplayPreviousList={displayPreviousList}
			/>
		</Provider>
	);

	const existingCart = store.getState().cart;

	expect(store.getState().cart).toMatchObject(existingCart);

	// log(element.getAllByTestId("edit")[0]);

	fireEvent.click(element.getAllByTestId("edit")[0]);

	const expectedCart = new Map();
	expectedCart.set("i001",6);

	expect(store.getState().cart).toMatchObject(expectedCart);

	expect(storage.all_order.includes('"u08117": {"date": "2021-03-11T07:05:02.163Z", "no": "08", "status": "Pending", "i001": 6}')).toBeFalsy(); //eslint-disable-line

	expect(storage.Pending_Order.indexOf("u08117")).toBe(-1);

});

test("Edit Existing Order with non-empty cart", () => {
	const element = render(
		<Provider store={store}>
			<DisplayPreviousOrder
				itemList={items}
				onDisplayPreviousList={displayPreviousList}
			/>
		</Provider>
	);

	fireEvent.click(element.getAllByTestId("copyToCart")[0]);

	const existingCart = new Map();
	existingCart.set("i001", 2);
	existingCart.set("i002", 1);


	expect(store.getState().cart).toMatchObject(existingCart);

	// log(element.getAllByTestId("edit")[0]);

	fireEvent.click(element.getAllByTestId("edit")[0]);

	const expectedCart = new Map();
	expectedCart.set("i001",6);

	expect(store.getState().cart).toMatchObject(expectedCart);

	expect(storage.all_order.includes('"u08117": {"date": "2021-03-11T07:05:02.163Z", "no": "08", "status": "Pending", "i001": 6}')).toBeFalsy(); //eslint-disable-line

	expect(storage.Pending_Order.indexOf("u08117")).toBe(-1);

});

// test("Temp test", () => {
// 	const element = render(
// 		<Provider store={store}>
// 			<DisplayPreviousOrder
// 				itemList={items}
// 				onDisplayPreviousList={displayPreviousList}
// 			/>
// 		</Provider>
// 	);
// 	// log(element.getByRole("button" , { name : "[X]" }));
// });