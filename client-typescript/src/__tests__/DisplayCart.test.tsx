import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DisplayCart from "./../DisplayCart";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer, { ACTIONS } from "../Reducer";
import {items} from "../database";

let store = createStore(rootReducer);

const log = console.log; // eslint-disable-line

jest.mock("./../AddOrderToPrevious", () => function someName() {
	console.log("this");  //eslint-disable-line
	return (<></>);
});

// const AddOrderToPrevious = jest.createMockFromModule("./../AddOrderToPrevious").default;
// AddOrderToPrevious = jest.fn();

beforeEach(() => {
	store = createStore(rootReducer);
});

test("Displaying Cart test for one item", () => {

	// log(store);

	store.dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: "i001" });


	const  element = render(
		<Provider store={store}>
			<DisplayCart itemList={items} />
		</Provider>
	);

	expect(store.getState().cart.size).toBe(1);
	expect(element.getByTestId("i001")).toHaveTextContent("1");
	expect(element.getByTestId("namei001")).toHaveTextContent("Paneer Sandwich");
	fireEvent.click(element.getByTestId("addi001"));
	expect(element.getByTestId("i001")).toHaveTextContent("2");
	fireEvent.click(element.getByTestId("addi001"));
	expect(element.getByTestId("i001")).toHaveTextContent("3");
	fireEvent.click(element.getByTestId("subi001"));
	expect(element.getByTestId("i001")).toHaveTextContent("2");
	fireEvent.click(element.getByTestId("subi001"));
	expect(element.getByTestId("i001")).toHaveTextContent("1");
	fireEvent.click(element.getByTestId("addi001"));
	expect(element.getByTestId("i001")).toHaveTextContent("2");
	fireEvent.click(element.getByTestId("remi001"));
	expect(element.queryByTestId("i001")).toBeNull();
});

test("Display cart for more than one items", () => {

	// jest.doMock("./../AddOrderToPrevious", jest.fn((...rest) => {
	// 	log(rest);
	// } ));
	// const AddOrderToPrevious = jest.fn();
	// AddOrderToPrevious();

	store.dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: "i001" });
	store.dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: "i002" });
	store.dispatch({ type: ACTIONS.ADD_QTY_TO_CART, key: "i003" });


	const element = render(
		<Provider store={store}>
			<DisplayCart itemList={items} />
		</Provider>
	);

	expect(store.getState().cart.size).toBe(3);
	expect(element.getByTestId("i001")).toHaveTextContent("1");
	expect(element.getByTestId("i002")).toHaveTextContent("1");
	expect(element.getByTestId("i003")).toHaveTextContent("1");

	expect(element.getByTestId("namei001")).toHaveTextContent("Paneer Sandwich");
	expect(element.getByTestId("namei002")).toHaveTextContent("Veg Sandwich");
	expect(element.getByTestId("namei003")).toHaveTextContent("Club Sandwich");

	fireEvent.click(element.getByTestId("addi001"));
	expect(element.getByTestId("i001")).toHaveTextContent("2");
	expect(element.getByTestId("i002")).toHaveTextContent("1");
	expect(element.getByTestId("i003")).toHaveTextContent("1");


	fireEvent.click(element.getByTestId("addi003"));
	expect(element.getByTestId("i001")).toHaveTextContent("2");
	expect(element.getByTestId("i002")).toHaveTextContent("1");
	expect(element.getByTestId("i003")).toHaveTextContent("2");

	fireEvent.click(element.getByTestId("subi002"));
	expect(element.getByTestId("i001")).toHaveTextContent("2");
	expect(element.queryByTestId("i002")).toBeNull();
	expect(element.getByTestId("i003")).toHaveTextContent("2");

	fireEvent.click(element.getByTestId("subi001"));
	expect(element.getByTestId("i001")).toHaveTextContent("1");
	expect(element.queryByTestId("i002")).toBeNull();
	expect(element.getByTestId("i003")).toHaveTextContent("2");


	fireEvent.click(element.getByTestId("addi003"));
	expect(element.getByTestId("i001")).toHaveTextContent("1");
	expect(element.queryByTestId("i002")).toBeNull();
	expect(element.getByTestId("i003")).toHaveTextContent("3");

	fireEvent.click(element.getByTestId("remi001"));
	expect(element.queryByTestId("i001")).toBeNull();
	expect(element.queryByTestId("i002")).toBeNull();
	expect(element.getByTestId("i003")).toHaveTextContent("3");

	// const AddOrderToPrevious = jest.fn(()=>{ console.log("One") });
	
	fireEvent.click(element.getByTestId("submit"));

	// expect().toBeCalledTimes(1);

	expect(store.getState().cart.size).toBe(0);

});