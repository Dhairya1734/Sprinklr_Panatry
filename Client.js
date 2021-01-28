let cart_map=new Map();
cart_map.set("temp",1);
let Items=document.querySelectorAll('.AddButton');

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

function remov(){
    //alert("Half Way");
    this.closest("tr").remove();
    //setTimeout(setSrNo());
    //map add left
    setSrNo();
};

function subQty(){
    let item=this.closest("tr").querySelector('.Display_Qty');
    item.value=Number(item.value)-1;
    let item_name=this.closest("tr").cells[1];
    cart_map.set(item_name.innerHTML,item.value);
    //alert(cart_map.get(item_name.innerHTML));
    if (Number(item.value) == 0) {
        //alert("yup");
        //this.closest("tr").remove();
        //setTimeout(remov());
        remov();
    }
};

function addQty(){
    let item=this.closest("tr").querySelector('.Display_Qty');
    item.value=Number(item.value)+1;
    let item_name=this.closest("tr").cells[1];
    cart_map.set(item_name.innerHTML,item.value);
    //alert(cart_map.get(item_name.innerHTML));
};

function setQty(tx){
    let r=document.querySelector("#SelectedTable").firstElementChild.rows;
    for(let item of r){
        if(item.cells[1].innerHTML === tx){
            //alert(cart_map.get(tx));
            let temp=Number(cart_map.get(tx));
            temp=temp+1;
            cart_map.set(tx,temp.toString());
            //alert("02");
            //alert(cart_map.get(tx));
            item.querySelector('.Display_Qty').value=cart_map.get(tx);
            return true;
        }
    }
    return false;
}

function setSrNo(){
    //alert("Start");
    let r=document.querySelector("#SelectedTable").firstElementChild.rows;
    // let r=document.querySelectorAll('.Example_row');
    //alert(r.length);
    let cntr=0;

    for(let item of r){
        // let temp=item;
        // temp.cells[0].innerHTML=1;
        // ctr++;
        // item.replaceWith(temp);
        item.cells[0].innerHTML=cntr.toString();
        cntr=cntr+1;
    }
};

for(let item of Items){
    item.onclick=function addItemToCart(){
        //alert(Items.length);
        let tx=this.value;
        let flag=false;
        for(let k of cart_map.keys()){
            if(setQty(tx))
            {
                flag=true;
                break;
            }
        }
        if(flag){
            //alert("no");
            return;
        }
        let table=document.querySelector("#SelectedTable").firstElementChild;
        let cart=document.querySelector("#SelectedTable").firstElementChild.rows;
        let r=cart[0].cloneNode(true);
        r.cells[0].innerHTML=table.rows.length;
        r.cells[1].innerHTML=this.value;
        r.style.display="block";
        let cancel=r.querySelector('.Cancel');
        cancel.onclick=remov;
        let add=r.querySelector('.table_item_add');
        add.onclick=addQty;
        let sub=r.querySelector('.table_item_subtract');
        sub.onclick=subQty;
        cart_map.set(r.cells[1].innerHTML,"1");
        //alert(cart_map.get(r.cells[1].innerHTML));
        table.append(r);
    }
}