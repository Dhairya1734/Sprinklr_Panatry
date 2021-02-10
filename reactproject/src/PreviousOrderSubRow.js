import React from 'react';

export default React.memo(function PreviousOrderSubRow(props) {
    return (
        <tr style = { {width : "100%"} }>
            <td style= { {width: "90%" , textAlign: "center" , borderCollapse: "collapse" } } > {props.name} </td>
            <td > {props.qty} </td>
        </tr>
    );
});