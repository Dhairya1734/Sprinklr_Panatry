import React, { useCallback } from 'react';
import ItemTypeSection from './ItemTypeSection';
import {useDispatch, /* useSelector */ } from 'react-redux'
import PropTypes from 'prop-types'
import { ACTIONS } from "./Reducer";
import {ItemHeading, ItemList} from './Types'

type Props = {
    itemHeading : ItemHeading,
    itemList : ItemList
}

// let elem : ( [Element , string] )[] =[];

const ItemListSection = (props : Props) : JSX.Element => {

    const dispatch = useDispatch();
    // const cart = useSelector(state => state.cart);

    console.log("ItemList");

    //Commented Code is for animation 

    const onAddToCart = useCallback((e) : void => {
        if(e.target.dataset.buttonType){
            console.log(e.target.value);
            dispatch ({type : ACTIONS.ADD_QTY_TO_CART , key : e.target.value});
            // e.target.parentElement.className = "createBox showBox animation";
            // elem.push([e.target.parentElement,e.target.value]);
            
        }
    } , /* [elem] */ [])

    // const animationEndHandler = useCallback(() => {
    //     elem.forEach( key => {key[0].className = "createBox showBox"; dispatch ({type : ACTIONS.ADD_QTY_TO_CART , key : key[1]});})
    //     elem = [];
    // },[elem])

    return(
        <section className="boxType" id="leftContent" onClick={onAddToCart} /* onAnimationEnd={animationEndHandler} */>
            {Object.keys(props.itemHeading).map( key => {
                return (
                    <ItemTypeSection  key = {key} id={key} content = {props.itemHeading[key]} itemList ={props.itemList}/>
                )
            })}
        </section>
    );
};

ItemListSection.propTypes={
    itemList : PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.string)),
    itemHeading : PropTypes.object.isRequired,
}

export default React.memo(ItemListSection);