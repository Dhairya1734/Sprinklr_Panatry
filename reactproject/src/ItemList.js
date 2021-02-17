import React from 'react';
import ItemCard from './ItemCard';
import ItemHeading from './ItemHeading';

export default React.memo(function ItemList(props){
    console.log("ItemList");
    return(
        <section className="BoxType" id="LeftContent" onClick={props.handler}>
            {Object.keys(props.itemHeading).map( key => {
                return (
                    <ItemHeading  key = {key}  content = {props.itemHeading[key]} itemList ={props.itemList}/>
                )
            })}
        </section>
    );
});

