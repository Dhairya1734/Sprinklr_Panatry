import React,{useCallback, useState} from 'react';
import DisplayPreviousOrderRow from './DisplayPrevoiusOrderRow'
import {Provider, useDispatch , useSelector } from 'react-redux'

const removeFromPending= (temp_id) => {
    let pen_ord=JSON.parse(localStorage.getItem("Pending_Order"));
    pen_ord.splice(pen_ord.indexOf(temp_id),1);
    localStorage.setItem("Pending_Order",JSON.stringify(pen_ord));
    localStorage.setItem("order_updated","true");
}

export default function DisplayPreviousOrder(props) {

    const dispatch = useDispatch();

    const [state,setState] = useState(
        {"all_ord" : JSON.parse(localStorage.getItem("all_order") , function(key, value) {
        if (key == 'date') return new Date(value);
        return value;
    })});

    const removeOredrfromPrevious = useCallback((e) => {
        let newOrd = {...state.all_ord};
        let deletedObj = newOrd[e.target.value];
        delete newOrd[e.target.value];
        setState({all_ord: newOrd});
        localStorage.setItem("all_order",JSON.stringify(newOrd));
        return deletedObj;
    },[state]);

    const displayAllOrderHandler = (e) => {
        if(e.target.className == "Cancel_Button"){
            props.displayPreviousListHandler();
        }
        else if(e.target.className == "editButton"){

            console.log(e.target.value);
    
            let temp_id=e.target.value;
    
            removeFromPending(temp_id);
    
            let deletedObj = removeOredrfromPrevious(e);

            dispatch ({type : "COPY_TO_CART" , obj : deletedObj})

            props.displayPreviousListHandler();
    
    
        } else if(e.target.className == "removeButton"){
    
            removeOredrfromPrevious(e);
    
        } else if(e.target.className == "copyToCartButton"){
            let allOrd = {...state.all_ord};
            
            dispatch ({type : "COPY_TO_CART" , obj : allOrd[e.target.value]})
            props.displayPreviousListHandler();
        }
    }

    return(
        <div className="Previous_Order_Display" onClick = {displayAllOrderHandler}>
            <button className="Cancel_Button">
                [X]
            </button>
            <section className="Previous_Order_Section">
                    <table className="Previous_Order_Table">
                        <tbody>
                            {
                                Object.keys(state.all_ord).map( (key) => {
                                    return <DisplayPreviousOrderRow key={key} id={key} order = {state.all_ord[key] } itemList = {props.itemList}/>
                                })
                            }
                        </tbody>
                    </table>
            </section>
        </div>
    );
    
}