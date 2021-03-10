import React from "react";

const Header: React.FunctionComponent = () => {
	// eslint-disable-next-line no-console
	// console.log("Header");
	return <header id='heading' data-testid="siteHeader">Sprinklr Pantry</header>;
};

export default React.memo(Header);
