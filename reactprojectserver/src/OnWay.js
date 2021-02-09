import React from 'react';
import DisplayOrderCard from './DisplayOrderCard.js';

export default React.memo(function OnWay(props){
    return (
        <>
        <header>
            <span className="Order_Status_Header"><strong>On Way</strong></span>
        </header>
        {Object.keys(props.on_way_ord).map( key => {
            return ( props.table == "all" || props.all_ord[props.on_way_ord[key]]["no"].toString() == props.table.toString()) ?
            <DisplayOrderCard key={props.on_way_ord[key]} id={props.on_way_ord[key]} all_ord={props.all_ord} onButton={"Delivered"} items= {props.items}/> : "";
        })}
        <section id="displayOnWay"></section>
        </>
    );
});

/* class OnWay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
        <>
            <header>
                <span className="Order_Status_Header"><strong>On Way</strong></span>
            </header>
            {Object.keys(this.props.on_way_ord).map( key => {
                return ( this.props.table == "all" || this.props.all_ord[this.props.on_way_ord[key]]["no"].toString() == this.props.table.toString()) ?
                <DisplayOrderCard key={this.props.on_way_ord[key]} id={this.props.on_way_ord[key]} all_ord={this.props.all_ord} onButton={"Delivered"} items= {this.props.items}/> : "";
            })}
            <section id="displayOnWay"></section>
        </> 
        );
    }
}
 
export default OnWay; */