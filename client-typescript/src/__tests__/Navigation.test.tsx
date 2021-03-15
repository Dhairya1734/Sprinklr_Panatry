import {
	fireEvent,
	render,
	screen
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navigation from "../Navigation";
import { itemHeading, items } from "./../database";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../Reducer";
// import DisplayPreviousOrder from "./DisplayPreviousOrder";

// const DisplayPreviousOrder = jest.mock(() => <></>);

const log = console.log; //eslint-disable-line

const store = createStore(rootReducer);

afterEach(() => {
	jest.clearAllMocks();
});

jest.useFakeTimers();

test("Navigation test", () => {
	// jest.useFakeTimers();
	const { getByTestId } = render(
		<Navigation itemHeading={itemHeading} itemList={items} />
	);
	fireEvent.click(getByTestId("itemNavigation"));
	expect(getByTestId("itemNavigationBlock")).toBeInTheDocument();
	expect(setTimeout).toHaveBeenCalledTimes(1);
	fireEvent.click(getByTestId("itemNavigation"));
	expect(setTimeout).toHaveBeenCalledTimes(2);
	fireEvent.click(getByTestId("itemNavigation"));
	expect(getByTestId("itemNavigationBlock")).toBeInTheDocument();
	expect(setTimeout).toHaveBeenCalledTimes(3);
	fireEvent.click(getByTestId("itemNavigation"));
	expect(setTimeout).toHaveBeenCalledTimes(4);
});

test("Display Navigation Test using timers", async () => {
	jest.useFakeTimers();
	const { getByTestId } = render(
		<Provider store={store}>
			<Navigation itemHeading={itemHeading} itemList={items} />
		</Provider>
	);
	fireEvent.click(getByTestId("itemNavigation"));
	expect(getByTestId("itemNavigationBlock")).toBeInTheDocument();
	fireEvent.click(getByTestId("itemNavigation"));
	jest.runOnlyPendingTimers();
	expect(screen.queryByTestId("itemNavigationBlock")).not.toBeInTheDocument();
	fireEvent.click(getByTestId("itemNavigation"));
	expect(getByTestId("itemNavigationBlock")).toBeInTheDocument();
	fireEvent.click(getByTestId("itemNavigation"));
	jest.runOnlyPendingTimers();
	expect(screen.queryByTestId("itemNavigationBlock")).not.toBeInTheDocument();
} );

jest.mock(
	"./../DisplayPreviousOrder",
	() =>
		function tempMock() {
			return (
				<div data-testid="thisIsMock" className="previousOrderDisplay">
					Hello World
				</div>
			);
		}
);

test("displayPrevious test", () => {
	// jest.doMock(
	// 	"./../DisplayPreviousOrder",
	// 	() =>
	// 		function tempMock() {
	// 			return {
	// 				default: jest.fn(() => {
	// 					return (
	// 						<div
	// 							data-testid="thisIsMock"
	// 							className="previousOrderDisplay"
	// 						>
	// 							Hello World
	// 						</div>
	// 					);
	// 				}),
	// 				__esModule: true,
	// 			};
	// 		}
	// );

	jest.useFakeTimers();

	const { getByTestId } = render(
		<Provider store={store}>
			<Navigation itemHeading={itemHeading} itemList={items} />
		</Provider>
	);

	fireEvent.click(getByTestId("displayPrevious"));
	expect(getByTestId("thisIsMock")).toBeInTheDocument();

	fireEvent.click(getByTestId("displayPrevious"));
	// waitForElementToBeRemoved();
	expect(setTimeout).toHaveBeenCalledTimes(1);

	fireEvent.click(getByTestId("displayPrevious"));
	expect(getByTestId("thisIsMock")).toBeInTheDocument();
	expect(setTimeout).toHaveBeenCalledTimes(2);

	fireEvent.click(getByTestId("displayPrevious"));
	expect(setTimeout).toHaveBeenCalledTimes(3);
});