import React from 'react';
//import TableRow from './TableRow';
import PropTypes from 'prop-types';

function DisplayOrderCard(props){
    console.log("Card");
    return(
        <div className = "order" datasettable = {props.allOrd[props.id]["no"]} >
            <header className="name">
                Table No {props.allOrd[props.id]["no"]}
            </header>
            <section className = "items">
                <table className = "list">
                    <tbody>
                        {Object.keys(props.allOrd[props.id]).map( name => {
                            return (name !== "no" && name!="date" && name!="status" && name!="id") ? (
                            //<TableRow key={name} name={ props.items ?  props.items[name]["itemName"] : ""} qty={props.allOrd[props.id][name]} type="SERVER_TYPE"/> 
                            <tr key={name}>
                                <td className="itemName">{props.items ?  props.items[name]["itemName"] : ""}</td>
                                <td className="itemQty">{props.allOrd[props.id][name]}</td>
                            </tr>
                            ): null
                        })}
                    </tbody>
                </table>
            </section>
            <button className="done" value={props.id}> {props.buttonDisplayValue} </button>
        </div>
    );
};

DisplayOrderCard.propTypes = {
    id: PropTypes.string,
    allOrd: PropTypes.object,
    buttonDisplayValue: PropTypes.string.isRequired,
    items: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string,
        )
    )

}

export default React.memo(DisplayOrderCard);