import React from 'react';
import PropTypes from 'prop-types';
import changeStyle from "./hocStyleForItemTable";

const PreviousOrderSubRow = React.memo((props) => {
    return (
        <tr className={props.allClassNames.rowClassName}>
            <td className = {props.allClassNames.cellClassName[0]} > {props.name} </td>
            <td className = {props.allClassNames.cellClassName[1]} > {props.qty} </td>
        </tr>
    );
});

PreviousOrderSubRow.propTypes = {
    name : PropTypes.string,
    qty : PropTypes.number,
}

export default changeStyle(PreviousOrderSubRow);