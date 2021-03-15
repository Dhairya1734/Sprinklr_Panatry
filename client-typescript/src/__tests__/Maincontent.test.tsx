import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { itemHeading, items } from "../database";
import Maincontent from "../Maincontent";

// let store:any;

afterEach(cleanup);

let storage: any;

const log = console.log; //eslint-disable-line

beforeEach(() => {
	// store = createStore(rootReducer);
	storage = {
		all_order:
			`{"u02111":{"date":"2021-02-18T10:12:01.629Z","no":"02","status":"On Way","i001":2,"i002":1},"u03112": { "date": "2021-02-18T10:28:39.144Z", "no": "03", "status": "Delivered", "i001": 2, "i002": 2 } , "u08117": {"date": "2021-03-11T07:05:02.163Z", "no": "08", "status": "Pending", "i001": 6}}`, // eslint-disable-line
		Pending_Order: `["u08117"]`, //eslint-disable-line
		heading: JSON.stringify(itemHeading),
		Order_Id: "25",
	};
});

window.localStorage.__proto__.getItem = (key: string) => {
	return storage[key];
};

window.localStorage.__proto__.setItem = (key: string, value: string) => {
	storage[key] = value;
	return;
};

jest.spyOn(window, "alert").mockImplementation((key) => {
	log(" I am clalled");
	return key;
});

// jest.spyOn(window, "fetch").mockImplementation(
// 	() =>
// 		new Promise((resolve) =>
// 			resolve(
// 				new Response(
// 					new Blob([JSON.stringify(items)], {
// 						type: "application / json",
// 					}),
// 					{}
// 				)
// 			)
// 		)
// );

window.fetch = () =>
	new Promise((resolve) =>
		resolve(
			new Response(
				new Blob([JSON.stringify(items)], {
					type: "application / json",
				}),
				{}
			)
		)
	);

// window.fetch = () =>
// 	Promise.resolve({
// 		json: () => {
// 			Promise.resolve(items);
// 		},
// 	});
test("Main Content : Lazy loading test of navigation and cart", async () => {
	const element = render(<Maincontent />);
	expect(element.getByText("Navigation is Loading"));
	expect(element.getByText("Cart is Loading"));
});

test("Main Content :lazy loading test of cart and navigation", async () => {
	const element = await render(<Maincontent />);
	await waitFor( () => element.getAllByTestId("addToCart"));
	expect(element.getByRole("navigation")).toBeInTheDocument();
	expect(element.getByTestId("submit")).toBeInTheDocument();
	
});

test("Main Content : test for empty Order", async () => {
	const element = await render(<Maincontent />);
	await waitFor(() => element.getAllByTestId("addToCart"));
	fireEvent.click(element.getByTestId("submit"));
	expect(alert).toBeCalledTimes(1);
});

test("Place order test number 1", async () => {

	jest.useFakeTimers();

	const element = await render(<Maincontent />);
	await waitFor(() => element.getAllByTestId("addToCart"));

	fireEvent.click(element.getByTestId("itemNavigation"));
	expect(element.getByTestId("itemNavigationBlock")).toBeInTheDocument();
	fireEvent.click(element.getByTestId("itemNavigation"));
	jest.runOnlyPendingTimers();
	expect(element.queryByTestId("itemNavigationBlock")).not.toBeInTheDocument();

	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i001" } });
	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i002" } });
	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i001" } });
	fireEvent.click(element.getAllByTestId("addToCart")[0], { target: { value: "i003" } });
	
	expect(element.getByTestId("i001")).toHaveTextContent("2");
	expect(element.getByTestId("i002")).toHaveTextContent("1");
	expect(element.getByTestId("i003")).toHaveTextContent("1");

	fireEvent.click(element.getByTestId("submit"));

	expect(element.queryByTestId("i001")).toBeNull();
	expect(element.queryByTestId("i002")).toBeNull();
	expect(element.queryByTestId("i003")).toBeNull();

	expect(storage.all_order.includes(`"u0625"`)).toBeTruthy();  //eslint-disable-line
	const obj = JSON.parse(storage.all_order)["u0625"];

	expect(obj).toMatchObject({ no: "06",status: "Pending",i001: 2,i002: 1,i003: 1});

	expect(storage.Pending_Order.indexOf("u0625")).not.toBe(-1);

	fireEvent.click(element.getByTestId("displayPrevious"));
	expect(element.getByTestId("allPreviousOrder")).toBeInTheDocument();


	fireEvent.click(element.getAllByTestId("edit")[0], { target: { value: "u0625" } });
	expect(storage.all_order.includes(`"u0625"`)).toBeFalsy();  //eslint-disable-line
	expect(storage.Pending_Order.indexOf("u0625")).toBe(-1);


	fireEvent.click(element.getByTestId("displayPrevious"));
	jest.runAllTimers();
	expect(element.queryByTestId("allPreviousOrder")).not.toBeInTheDocument();

	expect(element.getByTestId("i001")).toHaveTextContent("2");
	expect(element.getByTestId("i002")).toHaveTextContent("1");
	expect(element.getByTestId("i003")).toHaveTextContent("1");

	fireEvent.click(element.getByTestId("submit"));

	fireEvent.click(element.getByTestId("displayPrevious"));
	expect(element.getByTestId("allPreviousOrder")).toBeInTheDocument();

	expect(storage.all_order.includes(`"u0726"`)).toBeTruthy();  //eslint-disable-line
	const obj2 = JSON.parse(storage.all_order)["u0726"];

	expect(obj2).toMatchObject({ no: "07" ,status: "Pending" ,i001: 2,i002: 1,i003: 1});
	expect(storage.Pending_Order.indexOf("u0726")).not.toBe(-1);

});