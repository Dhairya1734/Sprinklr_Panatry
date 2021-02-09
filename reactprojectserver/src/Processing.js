import React from 'react';
import DisplayOrderCard from './DisplayOrderCard.js'

export default React.memo(function Processing(props){
    return(
        <>
        <header>
            <span className="Order_Status_Header"><strong> Processing </strong></span>
        </header>
        {Object.keys(props.processing_ord).map( key => {
            return ( props.table == "all" || props.all_ord[props.processing_ord[key]]["no"].toString() == props.table.toString()) ?
                <DisplayOrderCard key={key} id={props.processing_ord[key]} all_ord={props.all_ord} onButton={"Deliver"} items= {props.items}/> : "";
        })}
        <section id="displayProcessingId"></section>
        </>
    );
})

/* class Processing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <>
            <header>
                <span className="Order_Status_Header"><strong> Processing </strong></span>
            </header>
            {Object.keys(this.props.processing_ord).map( key => {
                return ( this.props.table == "all" || this.props.all_ord[this.props.processing_ord[key]]["no"].toString() == this.props.table.toString()) ?
                    <DisplayOrderCard key={key} id={this.props.processing_ord[key]} all_ord={this.props.all_ord} onButton={"Deliver"} items= {this.props.items}/> : "";
            })}
            <section id="displayProcessingId"></section>
            </>
        );
    }
}
 
export default Processing; */