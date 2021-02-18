import React from 'react';

const Header:React.FunctionComponent =()=>{
    console.log("Header")
    return(
    <header id="heading">
        Sprinklr Pantry
    </header>
    );
};

export default React.memo(Header);