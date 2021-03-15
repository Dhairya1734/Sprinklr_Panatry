import { render } from "@testing-library/react";
import DisplayCartRow from "./../DisplayCartRow";
import "@testing-library/jest-dom/extend-expect";

// const log = console.log; // eslint-disable-line

test("Test Cart Row", () => {
	const { getByTestId } = render(
		<table>
			<tbody>
				<DisplayCartRow
					itemId="i001"
					id="i001"
					srNo={1}
					name="Sandwich"
					qty={2}
				/>
			</tbody>
		</table>
	);
	expect(getByTestId("i001")).toHaveTextContent("2");
});
