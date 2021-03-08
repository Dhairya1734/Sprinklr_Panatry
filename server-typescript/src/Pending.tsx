import React from "react";
import DisplayOrderCard from "./DisplayOrderCard";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { AllOrder, ItemList, State } from "./Types";

type Props = {
	items: ItemList;
	allOrd: AllOrder;
	table: string;
};

function Pending(props: Props): JSX.Element {
	const pendingOrder = useSelector((state: State) => state.pendingOrder);
	return (
		<>
			<header className='sticky'>
				<span className='orderStatusHeader'>
					<strong>Pending</strong>
				</span>
			</header>
			<section id='displayPendingId'>
				{Object.keys(pendingOrder).map(
					(key: string): JSX.Element => {
						return props.table == "all" ||
							props.allOrd[pendingOrder[Number(key)]][
								"no"
							].toString() == props.table.toString() ? (
								<DisplayOrderCard
									key={key}
									id={pendingOrder[Number(key)]}
									allOrd={props.allOrd}
									buttonDisplayValue={"Move To Processing"}
									items={props.items}
								/>
							) : (
								<></>
							);
					}
				)}
			</section>
		</>
	);
}

Pending.propTypes = {
	items: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
	allOrd: PropTypes.object,
	table: PropTypes.string,
};

export default React.memo(Pending);
