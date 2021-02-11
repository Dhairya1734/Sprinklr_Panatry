import React ,{ useState} from 'react';

export default function Parent(){
    const [itemList, setItemList] = useState("")
    let ans ;
    window.fetch('https://raw.githubusercontent.com/Dhairya1734/Sprinklr_Panatry/main/itemdata.json',{mode : 'cors', method : 'GET'})
    .then(res => res.json())
    .then ((res) => console.log(res["i001"]));
    return(
        <>
            {/* {itemList["i001"]["itemName"]} */}
        </>
    )
}