import * as React from "react";

function SvgEdit(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width='1em'
			height='1em'
			{...props}
		>
			<path d='M18 2l-2.414 2.414 4 4L22 6l-4-4zm-3.924 3.924L3 17v4h4L18.076 9.924l-4-4z' />
		</svg>
	);
}

export default SvgEdit;
