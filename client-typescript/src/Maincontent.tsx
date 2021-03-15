import React, { useEffect, useState, lazy, Suspense } from "react";
// import Navigation from "./Navigation";
// import DisplayCart from './Cart'
import ItemListSection from "./ItemListSection";
import { createStore } from "redux";
import rootReducer from "./Reducer";
import { Provider, connect } from "react-redux";
import { LOCALSTORAGE } from "./localStorage";
import { ItemHeading, ItemList } from "./Types";

const store = createStore(rootReducer);

export const Navigation= lazy(() => import("./Navigation"));
export const DisplayCart = lazy(() => import("./DisplayCart"));

const Maincontent: React.FunctionComponent = () => {
	const itemHeading: ItemHeading = JSON.parse(
		localStorage.getItem(LOCALSTORAGE.HEADING)!
	);
	const [items, setItems] = useState<ItemList | null>(null);
	useEffect(() => {
		window
			.fetch(
				"https://raw.githubusercontent.com/Dhairya1734/Sprinklr_Panatry/main/itemdata.json",
				{ method: "GET" }
			)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setItems(data);
			})
			.catch(() => console.log("Error")); // eslint-disable-line no-console
	}, []);

	return (
		<Provider store={store}>
			<Suspense
				fallback={
					<div className='loading'> Navigation is Loading </div>
				}
			>
				<Navigation
					itemHeading={itemHeading}
					itemList={items !== null ? items : null}
				/>
			</Suspense>
			<section id='content'>
				<ItemListSection itemList={items} itemHeading={itemHeading} />
				{
					<Suspense
						fallback={
							<div className='loading'> Cart is Loading </div>
						}
					>
						<DisplayCart itemList={items} />
					</Suspense>
				}
			</section>
		</Provider>
	);
};

connect(null, null)(Maincontent);

export default Maincontent;
