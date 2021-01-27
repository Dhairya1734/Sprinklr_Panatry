function displayItemList(){
    let navItemList=document.getElementsByClassName("Nav_Item_Name")[0];
    if(navItemList.style.display=="block")
    {
        navItemList.style.display="none";
        return;
    }
    let st=getComputedStyle(navItemList);
    navItemList.style.display="block";
}

function addItemToCart(){
    let Itemname=document.querySelectorAll(".AddButton");
    //alert(Itemname.length);
    let table=document.querySelector("#SelectedTable").firstElementChild;
    let cart=document.querySelector("#SelectedTable").firstElementChild.rows;
    let r=cart[0].cloneNode(true);
    r.cells[0].innerHTML=table.rows.length;
    r.style.display="block";
    table.append(r);
    //alert(r.cells[0].style.width);
}