import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    itemId : string,
    id : string,
    srNo : number,
    name : string,
    qty : number
}

const DisplayCartRow = (props : Props)  : JSX.Element=> {
    return (  
        <tr key={props.id}>
            <td className = "tableSrNo">{props.srNo}</td>
            <td className = "tablItemName"> {props.name} </td>
            <td className = "tableItemSubtract">
                <button className="changeQty" value={props.itemId} data-button-name = "subQty">-</button>
            </td>
            <td className = "tableItemQty">
                {props.qty}
            </td>
            <td className="tableItemAdd">
                <button className="changeQty" value={props.itemId} data-button-name = "addQty">+</button>
            </td>
            <td className="tableItemRemove">
                <button className="cancel" value={props.itemId} data-button-name = "removeQty">X</button>
            </td>
        </tr>
    );
};

DisplayCartRow.propTypes = {
    itemId : PropTypes.string,
    id : PropTypes.string,
    srNo: PropTypes.number,
    name: PropTypes.string,
    qty: PropTypes.number,
}

export default React.memo(DisplayCartRow);
