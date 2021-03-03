import { ACTIONS } from "./Reducer";

export type ItemHeading = {
	[key: string]: {
		itemList: string[];
		visbleId: string;
		visibleName: string;
	};
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

export type Cart = Map<string, number>;

export type Actions =
    | {
            type:
                | typeof ACTIONS.ADD_QTY_TO_CART
                | typeof ACTIONS.SUB_QTY_FROM_CART
                | typeof ACTIONS.REMOVE_FROM_CART;
            key: string;
    }
    | {
            type: typeof ACTIONS.RESET_CART;
    }
    | {
			type: typeof ACTIONS.COPY_TO_CART;
			obj: OneOrder;
    };

export type Dispatch<T> = (action: T) => T; //eslint-disable-line no-unused-vars
