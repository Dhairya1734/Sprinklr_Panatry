import PropTypes from "prop-types";
// import React from "react";

type Props = {
	id: string;
	name: string;
};

function DisplayNavigationItemHeading(props: Props): JSX.Element {
	return (
		<>
			<br />
			<li key={props.id}>
				<a className='white naviItemHead' href={"#" + props.id}>
					{props.name}
				</a>
			</li>
			<br />
			<hr />
		</>
	);
}

DisplayNavigationItemHeading.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default DisplayNavigationItemHeading;
