export type State = {
	pendingOrder: string[];
	processingOrder: string[];
	onWayOrder: string[];
	deliveredOrder: string[];
};

export type ItemList = null | {
	[key: string]: {
		itemName: string;
		alt: string;
		src: string;
	};
};

export type OneOrder = {
	date: Date;
	no: string;
	status: "Pending" | "Processing" | "On Way" | "Delivered";
} & { [key: string]: string };

export type AllOrder = {
	[key: string]: OneOrder;
};
