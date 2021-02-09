import React from 'react';

export default React.memo(function Header(props){

    return (
        <header id="Heading">
            <span id="Heading_name">Sprinklr Pantry</span>
            <section className="Search">
                Table Number: 
                    <select className="Find_Table" onChange ={props.handler} name="Find_Table" > 
                        <option value="all"> All</option>
                        <option value="01">1</option>
                        <option value="02">2</option>
                        <option value="03">3</option>
                        <option value="04">4</option>
                        <option value="05">5</option>
                        <option value="06">6</option>
                        <option value="07">7</option>
                        <option value="08">8</option>
                        <option value="09">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    {/* {<button className="Search_Button" onClick = {(e) => console.log(document.querySelector('.Find_Table').value)}> OK </button>} */}
            </section>
        </header>

    );

});