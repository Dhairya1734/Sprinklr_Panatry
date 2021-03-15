// import * as React from "react";
import { render  } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";

test("Header Test", () => {
	const { getByTestId } = render(<Header />);
	const element = getByTestId("siteHeader");
	expect(element).toHaveTextContent("Sprinklr Pantry");
	expect(element).toMatchSnapshot();
});
