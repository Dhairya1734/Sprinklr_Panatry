export type ItemHeading = {
    [key : string]:{
        itemList : string[],
        visbleId : string,
        visibleName : string
    }
}

export type ItemList = null | {
    [key : string] : {
        itemName : string,
        alt : string,
        src : string
    }
}

export type OneOrder = {
    date : Date,
    no : string,
    status : string, 
} & { [ key:string ] : string }

export type AllOrder = {
    [key : string] : OneOrder
}
