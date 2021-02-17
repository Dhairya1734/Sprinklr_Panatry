import React, { useCallback, useState } from 'react';
import OnWay from './OnWay.js';
import Processing from './Processing.js'
import Pending from './Pending.js'

/* class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            items : JSON.parse(localStorage.getItem("items")),
            pen_ord : JSON.parse(localStorage.getItem("Pending_Order")),
            processing_ord : JSON.parse(localStorage.getItem("Processing_Order")),
            on_way_ord : JSON.parse(localStorage.getItem("On_Way_Order")),
            delivered_ord : JSON.parse(localStorage.getItem("Delivered_order")),
            all_ord : JSON.parse(localStorage.getItem("all_order")),

        };
        console.log("Constructor main content");
        this.updateStatus = this.updateStatus.bind(this);
        this.deleteFromPendig = this.deleteFromPendig.bind(this);
        this.addToProcessing = this.addToProcessing.bind(this);
        this.deleteFromProcessing = this.deleteFromProcessing.bind(this);
        this.addToOnWay = this.addToOnWay.bind(this);
        this.deleteFromOnWay = this.deleteFromOnWay.bind(this);
        this.addToDeliverd = this.addToDeliverd.bind(this);
        this.moveToProcessingHandler = this.moveToProcessingHandler.bind(this);
        this.moveToOnWayHandler = this.moveToOnWayHandler.bind(this);
        this.moveToDeliveredHandler = this.moveToDeliveredHandler.bind(this);
    };

    updateStatus(key,value){
        let newAllOrd = {...this.state.all_ord};
        //console.log(newAllOrd[key]["status"]);
        newAllOrd[key]["status"]=value;
        localStorage.setItem("all_order",JSON.stringify(newAllOrd));
        this.setState( { all_ord :  newAllOrd} );
        
    }

    deleteFromPendig(key){
        let newPenOrder = [...this.state.pen_ord];
        newPenOrder.splice(newPenOrder.indexOf(key),1);
        localStorage.setItem("Pending_Order",JSON.stringify(newPenOrder));
        this.setState({pen_ord : newPenOrder});
    }

    addToProcessing(key){
        let newProcessing = [...this.state.processing_ord];
        newProcessing.push(key);
        localStorage.setItem("Processing_Order",JSON.stringify(newProcessing));
        this.setState({processing_ord : newProcessing});
    }

    deleteFromProcessing(key){
        let newProcessing = [...this.state.processing_ord];
        newProcessing.splice(newProcessing.indexOf(key),1);
        localStorage.setItem("Processing_Order",JSON.stringify(newProcessing));
        this.setState({processing_ord : newProcessing});
    }

    addToOnWay(key){
        let newOnWay = [...this.state.on_way_ord];
        newOnWay.push(key);
        localStorage.setItem("On_Way_Order",JSON.stringify(newOnWay));
        this.setState({ on_way_ord : newOnWay});
    }

    deleteFromOnWay(key){
        let newOnWay = [...this.state.on_way_ord];
        newOnWay.splice(newOnWay.indexOf(key),1);
        localStorage.setItem("On_Way_Order",JSON.stringify(newOnWay));
        this.setState({ on_way_ord : newOnWay});
    }

    addToDeliverd(key){
        let newDelivered = [...this.state.delivered_ord];
        newDelivered.push(key);
        localStorage.setItem("Delivered_order",JSON.stringify(newDelivered));
        this.setState({ delivered_ord : newDelivered});
    }

    moveToProcessingHandler(e){
        if(e.target.tagName == "BUTTON"){
            this.addToProcessing(e.target.value);
            this.updateStatus(e.target.value,"Processing")
            this.deleteFromPendig(e.target.value);
        }
    } 

    moveToOnWayHandler(e){
        if(e.target.tagName == "BUTTON"){
            this.addToOnWay(e.target.value);
            this.updateStatus(e.target.value,"On Way");
            this.deleteFromProcessing(e.target.value);
        }
    }

    moveToDeliveredHandler(e){
        if(e.target.tagName == "BUTTON"){
            this.addToDeliverd(e.target.value);
            this.updateStatus(e.target.value,"Deliverd");
            this.deleteFromOnWay(e.target.value);
        }
    }



    render() { 
        return(
            <section className="Content">
                <div className="Order_Status" id="onWay" onClick={this.moveToDeliveredHandler}>
                    <OnWay items={this.state.items} on_way_ord={this.state.on_way_ord} all_ord={this.state.all_ord} table={this.props.table}/>
                </div>
                <div className="Order_Status" id="processing" onClick={this.moveToOnWayHandler}>
                    <Processing items={this.state.items} processing_ord={this.state.processing_ord} all_ord={this.state.all_ord} table={this.props.table}/>
                </div>
                <div className="Order_Status" id="pending" onClick={this.moveToProcessingHandler}>
                    <Pending items={this.state.items} pen_ord={this.state.pen_ord} all_ord={this.state.all_ord} table={this.props.table}/>
                </div>
            </section>
        );
    }
}
 
export default MainContent; */

export default function MainContent(props){
    let [state,setState] = useState({
        "items" : JSON.parse(localStorage.getItem("items")),
        "pen_ord" : JSON.parse(localStorage.getItem("Pending_Order")),
        "processing_ord" : JSON.parse(localStorage.getItem("Processing_Order")),
        "on_way_ord" : JSON.parse(localStorage.getItem("On_Way_Order")),
        "delivered_ord" : JSON.parse(localStorage.getItem("Delivered_order")),
        "all_ord" : JSON.parse(localStorage.getItem("all_order")),
    },[]);

    let updateStatus = useCallback((key,value) => {
        let newAllOrd = {...state.all_ord};
        //console.log(newAllOrd[key]["status"]);
        newAllOrd[key]["status"]=value;
        localStorage.setItem("all_order",JSON.stringify(newAllOrd));
        //setState( { ...state , all_ord :  newAllOrd} );
        return newAllOrd;
    },[state.all_ord]);

    let deleteFromPendig = useCallback( (key) =>{
        let newPenOrder = [...state.pen_ord];
        newPenOrder.splice(newPenOrder.indexOf(key),1);
        localStorage.setItem("Pending_Order",JSON.stringify(newPenOrder));
        //setState({...state, pen_ord : newPenOrder});
        return newPenOrder;
    },[state.pen_ord])

    let addToProcessing = useCallback( (key) => {
        let newProcessing = [...state.processing_ord];
        newProcessing.push(key);
        localStorage.setItem("Processing_Order",JSON.stringify(newProcessing));
        //setState({...state , processing_ord : newProcessing});
        return newProcessing;
    },[state.processing_ord]);

    let deleteFromProcessing = useCallback( (key) => {
        let newProcessing = [...state.processing_ord];
        newProcessing.splice(newProcessing.indexOf(key),1);
        localStorage.setItem("Processing_Order",JSON.stringify(newProcessing));
        //setState({...state , processing_ord : newProcessing});
        return newProcessing;
    },[state.processing_ord]);

    let addToOnWay = useCallback( (key) => {
        let newOnWay = [...state.on_way_ord];
        newOnWay.push(key);
        localStorage.setItem("On_Way_Order",JSON.stringify(newOnWay));
        return newOnWay;
    },[state.on_way_ord])

    let deleteFromOnWay = useCallback( (key) => {
        let newOnWay = [...state.on_way_ord];
        newOnWay.splice(newOnWay.indexOf(key),1);
        localStorage.setItem("On_Way_Order",JSON.stringify(newOnWay));
        //setState({ ...state ,on_way_ord : newOnWay});
        return newOnWay;
    },[state.on_way_ord]);

    let addToDeliverd = useCallback( (key) => {
        let newDelivered = [...state.delivered_ord];
        newDelivered.push(key);
        //localStorage.setItem("Delivered_order",JSON.stringify(newDelivered));
        return newDelivered;
    }, [state.delivered_ord])

    let moveToProcessingHandler = useCallback( (e) => {
        if(e.target.tagName == "BUTTON"){
            let newProcessing = addToProcessing(e.target.value);
            let newAllOrd = updateStatus(e.target.value,"Processing")
            let newPenOrder = deleteFromPendig(e.target.value);
            setState({...state , processing_ord : newProcessing, all_ord :  newAllOrd, pen_ord : newPenOrder})
        }
    } ,[state] ) ;

    let moveToOnWayHandler = useCallback( (e) => {
        if(e.target.tagName == "BUTTON"){
            let newOnWay = addToOnWay(e.target.value);
            let newAllOrd = updateStatus(e.target.value,"On Way");
            let newProcessing = deleteFromProcessing(e.target.value);
            setState({...state , on_way_ord : newOnWay, all_ord :  newAllOrd, processing_ord : newProcessing})
        }
    }, [state] );

    let moveToDeliveredHandler = useCallback( (e) => {
        if(e.target.tagName == "BUTTON"){
            let newDelivered = addToDeliverd(e.target.value);
            let newAllOrd = updateStatus(e.target.value,"Deliverd");
            let newOnWay = deleteFromOnWay(e.target.value);
            setState({...state , delivered_ord : newDelivered, all_ord :  newAllOrd, on_way_ord : newOnWay})
        }
    }, [state]);

    return(
        <section className="Content">
            <div className="Order_Status" id="onWay" onClick={moveToDeliveredHandler}>
                <OnWay items={state.items} on_way_ord={state.on_way_ord} all_ord={state.all_ord} table={props.table}/>
            </div>
            <div className="Order_Status" id="processing" onClick={moveToOnWayHandler}>
                <Processing items={state.items} processing_ord={state.processing_ord} all_ord={state.all_ord} table={props.table} />
            </div>
            <div className="Order_Status" id="pending" onClick={moveToProcessingHandler}>
                <Pending items={state.items} pen_ord={state.pen_ord} all_ord={state.all_ord} table={props.table}/>
            </div>
        </section>
    );
}