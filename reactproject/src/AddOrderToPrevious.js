import PropTypes from 'prop-types';
import {LOCALSTORAGE} from './localStorage'

function AddOrderToPrevious(props) {

    if(props.cart.size === 0) {
        alert("Please add something to cart");
        return ;
    }

    let allOrd=JSON.parse(localStorage.getItem(LOCALSTORAGE.ALL_ORDER));
    

    const tempObj={};
    tempObj.date=new Date();
    let idNum=Number(localStorage.getItem(LOCALSTORAGE.ORDER_ID));
    tempObj.no= idNum%10 === 9 ? "10" : "0"+String((idNum%10)+1); 
    const allOrdId="u"+tempObj.no+idNum.toString();
    idNum++;
    localStorage.setItem(LOCALSTORAGE.ORDER_ID, idNum.toString());
    tempObj.status="Pending";

    // Order List
    for(const key of props.cart.keys()){
        console.log(key);
        tempObj[key]=props.cart.get(key);
    }

    console.log(tempObj);
    allOrd[allOrdId]=tempObj;
    localStorage.setItem(LOCALSTORAGE.ALL_ORDER,JSON.stringify(allOrd));

    let penOrd=JSON.parse(localStorage.getItem(LOCALSTORAGE.PENDING_ORDER));
    penOrd.push(allOrdId);
    localStorage.setItem(LOCALSTORAGE.PENDING_ORDER,JSON.stringify(penOrd));
    localStorage.setItem(LOCALSTORAGE.ORDER_UPDATED,"true");
    
}

AddOrderToPrevious.PropTypes ={
    cart : PropTypes.instanceOf(Map),
}

export default AddOrderToPrevious;