import "./server.css";
import Header from "./Header";
import React, { useState, useRef, lazy, Suspense, useCallback } from "react";
import { connect, Provider } from "react-redux";
import rootReducer from "./Reducer";
import { createStore } from "redux";

const MainContent = lazy(() => import("./MainContent"));

const store = createStore(rootReducer);

const App: React.FC = () => {
	// define
	const searchRef = useRef<HTMLSelectElement>();

	const [displayTable, setDisplayTable] = useState<string>("all");

	const onSetTable = useCallback((): void => {
		if (searchRef.current) {
			setDisplayTable(searchRef.current.value);
		}
	}, []);
	return (
		<>
			<Provider store={store}>
				<Header
					onSetTable={onSetTable}
					searchRef={
						(searchRef as any) as React.RefObject<HTMLSelectElement>
					}
				/>
				<Suspense fallback='This is loading'>
					<MainContent table={displayTable} />
				</Suspense>
			</Provider>
		</>
	);
};

connect(null, null)(App);

export default App;
