import React from 'react';

export default function PreviousOrderSubRow(props) {
    return (
        <tr style = { {width : "100%"} }>
            <td style= { {width: "90%" , textAlign: "center" } } > {props.name} </td>
            <td > {props.qty} </td>
        </tr>
    );
}