import React, { useCallback ,useState, useMemo} from 'react';
import DisplayNavigationItemHeading from './DisplayNavigationItemHeading'
import DisplayPreviousOrder from './DisplayPreviousOrder'

export default React.memo(function Navigation(props){

    const [shouldDisplayPrevious,setShouldDisplayPrevious] = useState(0);
    const [shouldDisplayItemList,setShouldDisplayItemList] = useState(0);

    const displayItemList = () => {
        console.log("Navigation displayItemList");
        setShouldDisplayItemList((shouldDisplayItemList + 1)%2);
    };

    const displayPreviousList =  () => {
        console.log("Display Previous List");
        setShouldDisplayPrevious((shouldDisplayPrevious + 1)%2);
    };


    return (
        <nav className="BoxType" id="Navigation">
        <ol id="Display_Items">
            <button className="White Main_Nav" onClick={displayItemList}> <li><strong>Items</strong></li> </button><br /> 
            { shouldDisplayItemList === 1 ?<ol className="Nav_Item_Name">
                {Object.keys(props.itemHeading).map( key => {
                    return <DisplayNavigationItemHeading key={key} id={key} name={props.itemHeading[key].visibleName}/>
                })}
            </ol> : " "}
            <button className="White Main_Nav" id="All_Order" onClick = {displayPreviousList}> <strong>My Order</strong></button><br /> 
        </ol>
        { shouldDisplayPrevious === 1 ? <DisplayPreviousOrder itemList = {props.itemList} copyToCartHandler = {props.copyToCartHandler} displayPreviousListHandler={displayPreviousList}/> : null }
    </nav>
    );
    
});
