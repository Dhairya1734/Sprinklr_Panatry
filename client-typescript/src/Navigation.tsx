import React, { useCallback, useState, /* lazy, */ Suspense } from 'react';
import DisplayNavigationItemHeading from './DisplayNavigationItemHeading'
import DisplayPreviousOrder from './DisplayPreviousOrder'
import PropTypes from 'prop-types'
import {ItemHeading, ItemList} from './Types'

type Props = {
    itemHeading : ItemHeading,
    itemList : ItemList
}

const Navigation = (props : Props) : JSX.Element=> {

    const [visibleBlock , setVisibleBlock] = useState<string | null>(null);

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
                        {visibleBlock === "itemNavigation" ? <ol><div className="navItemName">
                            {Object.keys(props.itemHeading).map(key => {
                                return <DisplayNavigationItemHeading key={key} id={key} name={props.itemHeading[key].visibleName} />
                            })}
                        </div></ol> : " "}
                    </li>
                    <li>
                        <button className="white mainNav" onClick={displayPreviousList}> <strong>My Order</strong></button><br />
                    </li>
                </ol>
                { visibleBlock == "PreviousOrder" ?<DisplayPreviousOrder itemList={props.itemList} onDisplayPreviousList={displayPreviousList} />: null}
            </Suspense>
        </nav>
    );

};

Navigation.propTypes = {
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string)),
    itemHeading: PropTypes.object.isRequired,
}

export default React.memo(Navigation);
