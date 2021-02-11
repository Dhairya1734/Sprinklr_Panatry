import React from 'react';

function AddOrderToPrevious(props) {

    let all_ord=JSON.parse(localStorage.getItem("all_order"));
    
    let allOrdId;

    let temp_obj={};
    temp_obj.date=new Date();
    let id_num=Number(localStorage.getItem("Order_Id"));
    temp_obj.no="0" + String((id_num%10)+1); 
    allOrdId="u"+temp_obj.no+id_num.toString();
    id_num++;
    localStorage.setItem("Order_Id", id_num.toString());
    temp_obj.status="Pending";

    // Order List
    for(let key of props.cart.keys()){
        console.log(key);
        temp_obj[key]=props.cart.get(key);
    }

    console.log(temp_obj);
    //all_ord.unshift(JSON.stringify(temp_obj));
    all_ord[allOrdId]=temp_obj;
    localStorage.setItem("all_order",JSON.stringify(all_ord));

    let pen_ord=JSON.parse(localStorage.getItem("Pending_Order"));
    pen_ord.push(allOrdId);
    localStorage.setItem("Pending_Order",JSON.stringify(pen_ord));
    localStorage.setItem("order_updated","true");
    
}

export default AddOrderToPrevious;