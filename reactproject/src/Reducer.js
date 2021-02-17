import { combineReducers } from "redux";

export const ACTIONS = {
    ADD_QTY_TO_CART : 'ADD_QTY_TO_CART',
    SUB_QTY_FROM_CART : 'SUB_QTY_FROM_CART',
    REMOVE_FROM_CART : 'REMOVE_FROM_CART',
    COPY_TO_CART : 'COPY_TO_CART',
    RESET_CART : 'RESET_CART'
}

function addQty(key,state){
   let newCart = new Map(state);

    if(newCart.get(key) === undefined)
        newCart.set(key,1);
    else
        newCart.set(key,newCart.get(key)+1);
    console.log(newCart);
    return newCart;
}

function removeItemFromCart(key,cart){
    let newCart = new Map(cart);
    newCart.delete(key);
    return newCart;
}

function subtractQty(key,cart){
    let newCart = new Map(cart);
    if(newCart.get(key) === 1)
        return removeItemFromCart(key,newCart);
    else{
        newCart.set(key,cart.get(key)-1);
        return newCart;
    }
}

function resetCart(){
    return new Map();
}

function copyToCart(tempObj){
    let newCart = new Map();
    for(let key in tempObj){
        if(key !== "id" && key!=="date" && key!="status" && key!="no"){
            newCart.set(key,tempObj[key]);
        }
    }
    return newCart;
}


function cartAction(state = new Map() , action) {

    switch (action.type){
        case ACTIONS.ADD_QTY_TO_CART:
            return addQty(action.key,state);
        case ACTIONS.SUB_QTY_FROM_CART:
            return subtractQty(action.key, state);
        case ACTIONS.REMOVE_FROM_CART:
            return removeItemFromCart(action.key, state);
        case ACTIONS.COPY_TO_CART:
            return copyToCart(action.obj);
        case ACTIONS.RESET_CART:
            return resetCart();
        default:
            return new Map(action.cart);
    }
}

const rootReducer = combineReducers({cart : cartAction});

export default rootReducer;