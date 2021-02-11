import React, { useCallback ,useState, useMemo} from 'react';
import DisplayNavigationItemHeading from './DisplayNavigationItemHeading'
import DisplayPreviousOrder from './DisplayPreviousOrder'

export default React.memo(function Navigation(props){

    const [shouldDisplayPrevious,setShouldDisplayPrevious] = useState(0);
    const [shouldDisplayItemList,setShouldDisplayItemList] = useState(0);

    const displayItemList = () => {
        setShouldDisplayItemList((shouldDisplayItemList + 1)%2);
    };

    const displayPreviousList =  () => {
        setShouldDisplayPrevious((shouldDisplayPrevious + 1)%2);
    };


    return (
        <nav className="BoxType" id="Navigation">
        <ol id="Display_Items">
            <li><button className="White Main_Nav" onClick={displayItemList}><strong>Items</strong> </button><br /> 
            { shouldDisplayItemList === 1 ?<ol className="Nav_Item_Name">
                {Object.keys(props.itemHeading).map( key => {
                    return <DisplayNavigationItemHeading key={key} id={key} name={props.itemHeading[key].visibleName}/>
                })}
            </ol> : " "}
            </li>
            <li>
            <button className="White Main_Nav" id="All_Order" onClick = {displayPreviousList}> <strong>My Order</strong></button><br /> 
            </li>
        </ol>
        { shouldDisplayPrevious === 1 ? <DisplayPreviousOrder itemList = {props.itemList} displayPreviousListHandler={displayPreviousList}/> : null }
    </nav>
    );
    
});
