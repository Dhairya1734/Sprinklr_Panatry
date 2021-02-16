import React from 'react';

export default React.memo(function Header(){
    console.log("Header")
    return(
    <header id="heading">
        Sprinklr Pantry
    </header>
    );
});