import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { itemHeading, items } from "../database";
import ItemListSection from "../ItemListSection";
import rootReducer from "../Reducer";

let store: any;  //eslint-disable-line

beforeEach(() => {
	store = createStore(rootReducer);
});

// const log = console.log; //eslint-disable-line

test(" Test 1:  ItemList Add To Cart Button   ", () => {
	const element = render(
		<Provider store = {store}>
			<ItemListSection itemHeading={itemHeading} itemList={items} />
		</Provider>
	);

	const expectedCart = new Map();

	fireEvent.click( element.getAllByTestId("addToCart")[0] , { target : { value : "i001" } } );

	expectedCart.set("i001" , 1);
	expect(store.getState().cart).toMatchObject(expectedCart);

});

test(" Test 2:  ItemList Add To Cart Button   ", () => {
	const element = render(
		<Provider store = {store}>
			<ItemListSection itemHeading={itemHeading} itemList={items} />
		</Provider>
	);

	const expectedCart = new Map();

	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i002" } });
	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i002" } });
	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i002" } });
	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i001" } });
	

	expectedCart.set("i001", 1);
	expectedCart.set("i002" , 3);
	expect(store.getState().cart).toMatchObject(expectedCart);

});