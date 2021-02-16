import React from 'react';
import PropTypes from 'prop-types';

function returnList(num){
    let allList=[];
    for(let i=1;i<=num;i++){
        allList.push(<option key={i} value={i<10 ? "0" + i.toString() : i.toString()}>{i}</option>);
    }
    return allList;
}

function Header(props){

    return (
        <header id="heading">
            <span id="headingName">Sprinklr Pantry</span>
            <section className="search">
                <label> Table Number: 
                    <select className="findTable" onChange ={props.handler} name="findTable" > 
                        <option key="all" value="all"> All</option>
                        {returnList(10)}
                    </select>
                </label>
                    {/* {<button className="searchButton" onClick = {(e) => console.log(document.querySelector('.Find_Table').value)}> OK </button>} */}
            </section>
        </header>

    );

};

Header.propTypes = {
    handler : PropTypes.func.isRequired,
}

export default React.memo(Header);