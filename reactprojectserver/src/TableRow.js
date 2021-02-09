import React from 'react';

export default function TableRow(props){
    return(
        <tr>
            <td className="ItemName">{props.name}</td>
            <td className="ItemQty">{props.qty}</td>
        </tr>
    );
}