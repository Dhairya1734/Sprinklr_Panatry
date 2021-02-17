import { combineReducers } from "redux";
import { LOCALSTORAGE } from './localStorage'

export const ACTIONS = {
    COPY_TO_PENDING : 'COPY_TO_PENDING',
    REMOVE_FROM_PENDING : 'REMOVE_FROM_PENDING',
    ADD_TO_PROCESSING : 'ADD_TO_PROCESSING',
    REMOVE_FROM_PROCESSING : 'REMOVE_FROM_PROCESSING',
    ADD_TO_ON_WAY : 'ADD_TO_ON_WAY',   
    REMOVE_FROM_ON_WAY : 'REMOVE_FROM_ON_WAY',
    ADD_TO_DELIVERED : 'ADD_TO_DELIVERED'
}

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

function pendingHandler(state = JSON.parse(localStorage.getItem(LOCALSTORAGE.PENDING_ORDER)), action){

    switch(action.type){
        case ACTIONS.COPY_TO_PENDING:
            return copyFromArray(JSON.parse(localStorage.getItem(LOCALSTORAGE.PENDING_ORDER)));
        case ACTIONS.REMOVE_FROM_PENDING:
            return removeFromArray(action.key,state);
        default:
            return state;
    }
}

function processingHandler(state = JSON.parse(localStorage.getItem(LOCALSTORAGE.PROCESSING_ORDER)), action){

    switch(action.type){
        case ACTIONS.ADD_TO_PROCESSING:
            return pushToArray(action.key,state);
        case ACTIONS.REMOVE_FROM_PROCESSING:
            return removeFromArray(action.key,state);
        default:
            return state;
    }
}

function onWayHandler(state = JSON.parse(localStorage.getItem(LOCALSTORAGE.ON_WAY_ORDER)), action){

    switch(action.type){
        case ACTIONS.ADD_TO_ON_WAY:
            return pushToArray(action.key,state);
        case ACTIONS.REMOVE_FROM_ON_WAY:
            return removeFromArray(action.key,state);
        default:
            return state;
    }
}

function deliveredHandler(state = JSON.parse(localStorage.getItem(LOCALSTORAGE.DELIVERED_ORDER)), action){

    switch(action.type){
        case ACTIONS.ADD_TO_DELIVERED:
            return pushToArray(action.key,state);
        default:
            return state;
    }
}


const rootReducer = combineReducers( { pendingOrder : pendingHandler, processingOrder : processingHandler, onWayOrder : onWayHandler , deliveredOrder : deliveredHandler} );

export default rootReducer;