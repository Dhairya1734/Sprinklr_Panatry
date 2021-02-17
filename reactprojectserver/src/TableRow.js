import React from 'react';

export default React.memo(function TableRow(props){
    return(
        <tr>
            <td className="ItemName">{props.name}</td>
            <td className="ItemQty">{props.qty}</td>
        </tr>
    );
});