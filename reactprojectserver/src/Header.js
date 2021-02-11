import React from 'react';

function returnList(num){
    let allList=[];
    for(let i=1;i<=num;i++){
        allList.push(<option key={i} value={i<10 ? "0" + i.toString() : i.toString()}>{i}</option>);
    }
    return allList;
}

export default React.memo(function Header(props){

    return (
        <header id="Heading">
            <span id="Heading_name">Sprinklr Pantry</span>
            <section className="Search">
                <label> Table Number: 
                    <select className="Find_Table" onChange ={props.handler} name="Find_Table" > 
                        <option key="all" value="all"> All</option>
                        {returnList(10)}
                    </select>
                </label>
                    {/* {<button className="Search_Button" onClick = {(e) => console.log(document.querySelector('.Find_Table').value)}> OK </button>} */}
            </section>
        </header>

    );

});