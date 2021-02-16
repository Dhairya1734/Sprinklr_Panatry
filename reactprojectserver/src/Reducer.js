import { combineReducers } from "redux";

function pushToArray (key , array) {
    //console.log(key);
    let newArray = array.slice();
    newArray.push(key);
    return newArray;
}

function removeFromArray(key, array){
    //console.log(key);
    let newArray = array.slice();
    newArray.splice(newArray.indexOf(key),1);
    return newArray;
}

function copyFromArray(array) {
    let newArray = array.slice();
    return newArray;
}

function pendingHandler(state = JSON.parse(localStorage.getItem("Pending_Order")), action){

    switch(action.type){
        case 'COPY_TO_PENDING':
            return copyFromArray(JSON.parse(localStorage.getItem("Pending_Order")));
        case 'REMOVE_FROM_PENDING':
            return removeFromArray(action.key,state);
        default:
            return state;
    }
}

function processingHandler(state = JSON.parse(localStorage.getItem("Processing_Order")), action){

    switch(action.type){
        case 'ADD_TO_PROCESSING':
            return pushToArray(action.key,state);
        case 'REMOVE_FROM_PROCESSING':
            return removeFromArray(action.key,state);
        default:
            return state;
    }
}

function onWayHandler(state = JSON.parse(localStorage.getItem("On_Way_Order")), action){

    switch(action.type){
        case 'ADD_TO_ON_WAY':
            return pushToArray(action.key,state);
        case 'REMOVE_FROM_ON_WAY':
            return removeFromArray(action.key,state);
        default:
            return state;
    }
}

function deliveredHandler(state = JSON.parse(localStorage.getItem("Delivered_order")), action){

    switch(action.type){
        case 'ADD_TO_DELIVERED':
            return pushToArray(action.key,state);
        default:
            return state;
    }
}


const rootReducer = combineReducers( { pendingOrder : pendingHandler, processingOrder : processingHandler, onWayOrder : onWayHandler , deliveredOrder : deliveredHandler} );

export default rootReducer;