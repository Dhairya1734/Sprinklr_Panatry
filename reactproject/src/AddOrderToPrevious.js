import PropTypes from 'prop-types';

function AddOrderToPrevious(props) {

    if(props.cart.size === 0) {
        alert("Please add something to cart");
        return ;
    }

    let allOrd=JSON.parse(localStorage.getItem("all_order"));
    
    let allOrdId;

    let tempObj={};
    tempObj.date=new Date();
    let idNum=Number(localStorage.getItem("Order_Id"));
    tempObj.no="0" + String((idNum%10)+1); 
    allOrdId="u"+tempObj.no+idNum.toString();
    idNum++;
    localStorage.setItem("Order_Id", idNum.toString());
    tempObj.status="Pending";

    // Order List
    for(let key of props.cart.keys()){
        console.log(key);
        tempObj[key]=props.cart.get(key);
    }

    console.log(tempObj);
    allOrd[allOrdId]=tempObj;
    localStorage.setItem("all_order",JSON.stringify(allOrd));

    let penOrd=JSON.parse(localStorage.getItem("Pending_Order"));
    penOrd.push(allOrdId);
    localStorage.setItem("Pending_Order",JSON.stringify(penOrd));
    localStorage.setItem("order_updated","true");
    
}

AddOrderToPrevious.PropTypes ={
    cart : PropTypes.instanceOf(Map),
}

export default AddOrderToPrevious;