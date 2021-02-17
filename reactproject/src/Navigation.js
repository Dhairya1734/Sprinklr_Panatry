import React, { useCallback, useState, lazy, Suspense } from 'react';
import DisplayNavigationItemHeading from './DisplayNavigationItemHeading'
import DisplayPreviousOrder from './DisplayPreviousOrder'
import PropTypes from 'prop-types'

const Navigation = React.memo((props) => {

    // const [shouldDisplayPrevious, setShouldDisplayPrevious] = useState(0);
    // const [shouldDisplayItemList, setShouldDisplayItemList] = useState(0);

    // const displayItemList = useCallback(() => {
    //     setShouldDisplayItemList((shouldDisplayItemList + 1) % 2);
    // }, [shouldDisplayItemList]);

    // const displayPreviousList = useCallback(() => {
    //     setShouldDisplayPrevious((shouldDisplayPrevious + 1) % 2);
    // }, [shouldDisplayPrevious]);

    const [visibleBlock , setVisibleBlock] = useState(null);

    const displayItemList = useCallback(() => {
        if(visibleBlock != "itemNavigation"){
            setVisibleBlock("itemNavigation");
        }
        else if( visibleBlock == "itemNavigation"){
            setVisibleBlock(null);
        }
    }, [visibleBlock]);

    const displayPreviousList = useCallback(() => {
        if(visibleBlock != "PreviousOrder"){
            setVisibleBlock("PreviousOrder");
        }
        else if( visibleBlock == "PreviousOrder"){
            setVisibleBlock(null);
        }
    }, [visibleBlock]);

    return (
        <nav className="boxType" id="navigation">
            <Suspense fallback = {<div className="loading"> This is Loading </div>}>
                <ol id="displayItems">
                    <li><button className="white mainNav" onClick={displayItemList}><strong>Items</strong> </button><br />
                        {visibleBlock === "itemNavigation" ? <ol className="navItemName">
                            {Object.keys(props.itemHeading).map(key => {
                                return <DisplayNavigationItemHeading key={key} id={key} name={props.itemHeading[key].visibleName} />
                            })}
                        </ol> : " "}
                    </li>
                    <li>
                        <button className="white mainNav" onClick={displayPreviousList}> <strong>My Order</strong></button><br />
                    </li>
                </ol>
                { visibleBlock == "PreviousOrder" ?<DisplayPreviousOrder itemList={props.itemList} displayPreviousListHandler={displayPreviousList} />: null}
            </Suspense>
        </nav>
    );

});

Navigation.propTypes = {
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string,
            PropTypes.string,
            PropTypes.string)),
    itemHeading: PropTypes.object.isRequired,
}

export default Navigation;
