import React from 'react';
import PropTypes from 'prop-types';
import changeStyle from './hocStyleForItemTable'
function TableRow(props){
    return(
        <tr className={props.allClassNames.rowClassName}>
            <td className={props.allClassNames.cellClassName[0]}>{props.name}</td>
            <td className={props.allClassNames.cellClassName[1]}>{props.qty}</td>
        </tr>
    );
};

TableRow.propTypes = {
    name : PropTypes.string,
    qty : PropTypes.number,
}

export default React.memo(changeStyle(TableRow));