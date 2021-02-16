import React from 'react';
import PropTypes from 'prop-types';

function DisplayNavigationItemHeading(props) {
    return (
        <>
        <br />
        <li key={props.id}>
            <a className="white naviItemHead" href={"#"+props.id}>{props.name}</a>
        </li>
        <br />
        <hr />
        </>
    );
};

DisplayNavigationItemHeading.propTypes = {
    id : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
}

export default DisplayNavigationItemHeading;