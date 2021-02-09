import React from 'react';

export default function DisplayNavigationItemHeading(props) {
    return (
        <>
        <br />
        <li key={props.id}>
            <a className="White Navi_Item_Head" href={"#"+props.id}>{props.name}</a>
        </li>
        <br />
        <hr />
        </>
    );
}