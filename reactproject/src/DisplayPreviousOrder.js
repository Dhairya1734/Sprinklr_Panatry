import React from 'react';
import DisplayPreviousOrderRow from './DisplayPrevoiusOrderRow'

export default class DisplayPreviousOrder extends React.Component {

    constructor(props){
        console.log("DisplayPreviousOrder Constructor");
        super(props);
        this.state = {
            all_ord : JSON.parse(localStorage.getItem("all_order") , function(key, value) {
                if (key == 'date') return new Date(value);
                return value;
            })
        }
        this.removeOredrfromPrevious = this.removeOredrfromPrevious.bind(this);
        this.displayAllOrderHandler=this.displayAllOrderHandler.bind(this);
        this.removeFromPending = this.removeFromPending.bind(this);
    }


    removeOredrfromPrevious(e){
        let newOrd = {...this.state.all_ord};
        let deletedObj = newOrd[e.target.value];
        delete newOrd[e.target.value];
        this.setState({all_ord: newOrd});
        localStorage.setItem("all_order",JSON.stringify(newOrd));
        return deletedObj;
    }

    removeFromPending(temp_id){

        let pen_ord=JSON.parse(localStorage.getItem("Pending_Order"));
        pen_ord.splice(pen_ord.indexOf(temp_id),1);
        localStorage.setItem("Pending_Order",JSON.stringify(pen_ord));
        localStorage.setItem("order_updated","true");
    
    }

    displayAllOrderHandler(e){
        if(e.target.className == "Cancel_Button"){
            this.props.displayPreviousListHandler();
        }
        else if(e.target.className == "editButton"){

            console.log(e.target.value);
    
            let temp_id=e.target.value;
    
            this.removeFromPending(temp_id);
    
            let deletedObj = this.removeOredrfromPrevious(e);
    
            this.props.copyToCartHandler(deletedObj);
    
            // document.querySelector('.Previous_Order_Display').style.display="none";
    
            // DisplayCart();
    
        } else if(e.target.className == "removeButton"){
    
            this.removeOredrfromPrevious(e);
    
            // document.querySelector('.Previous_Order_Display').style.display="none";
    
        }
    }
    
    render(){
        return(
            <div className="Previous_Order_Display" onClick = {this.displayAllOrderHandler}>
                <button className="Cancel_Button">
                    [X]
                </button>
                <section className="Previous_Order_Section">
                        <table className="Previous_Order_Table">
                            <tbody>
                                {
                                    Object.keys(this.state.all_ord).map( (key) => {
                                        return <DisplayPreviousOrderRow id={key} order = { this.state.all_ord[key] } itemList = {this.props.itemList}/>
                                    })
                                }
                            </tbody>
                        </table>
                </section>
            </div>
        );
    }
    
}