import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    onSetTable : (e: React.ChangeEvent<HTMLSelectElement>) => void,
    searchRef : any
}

function returnList(num : number){
    let allList : JSX.Element[]=[];
    for(let i=1;i<=num;i++){
        allList.push(<option key={i} value={i<10 ? "0" + i.toString() : i.toString()}>{i}</option>);
    }
    return allList;
}

function Header(props : Props){

    return (
        <header id="heading">
            <span id="headingName">Sprinklr Pantry</span>
            <section className="search">
                <label> Table Number: 
                    <select className="findTable" onChange ={props.onSetTable} name="findTable" ref = {props.searchRef}> 
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
    onSetTable : PropTypes.func.isRequired,
    searchRef : PropTypes.object,
}

export default React.memo(Header);
