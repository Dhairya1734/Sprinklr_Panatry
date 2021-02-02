// data

let items=JSON.parse(localStorage.getItem("items"));
let heading=JSON.parse(localStorage.getItem("heading"));
let cart_map=new Map(); // cart 

/*let items = {
    "i001" : {
        "itemName" : "Paneer Sandwich",
        "src" : "sandwich.jpg",
        "alt" : "Paneer Sandwich",
    },

    "i002" : {
        "itemName" : "Veg Sandwich",
        "src" : "Veg Sandwich.webp",
        "alt" : "Veg Sandwich",
    },

    "i003" : {
        "itemName" : "Club Sandwich",
        "src" : "Club Sandwich.jpg",
        "alt" : "Club Sandwich",
    },

    "i004" : {
        "itemName" : "Tea",
        "src" : "Tea.jpeg",
        "alt" : "Tea",
    },

    "i005" : {
        "itemName" : "Black Tea",
        "src" : "Black-Tea.jpeg",
        "alt" : "Black Tea",
    },

    "i006" : {
        "itemName" : "Coffee",
        "src" : "Coffee.jpg",
        "alt" : "Coffee",
    },

    "i007" : {
        "itemName" : "Black Coffee",
        "src" : "Black Coffee.jpg",
        "alt" : "Black Coffee",
    },

    "i008" : {
        "itemName" : "Green Tea",
        "src" : "Green Tea.jpeg",
        "alt" : "Green Tea",
    },

    "i009" : {
        "itemName" : "Sprite",
        "src" : "Sprite.jpg",
        "alt" : "Sprite",
    },

    "i010" : {
        "itemName" : "Energy Drink",
        "src" : "Energy Drink.webp",
        "alt" : "Energy Drink",
    },
}

let heading = {
    "h01" : {
        "visibleName": "Sandwich",
        "visbleId": "Sandwich",
        "itemList" : ["i001", "i002", "i003"],
    },
    "h02" : {
        "visibleName": "Hot Drinks",
        "visbleId": "HotDrinks",
        "itemList" : ["i004", "i005", "i006", "i007", "i008"],
    },
    "h03" : {
        "visibleName": "Cold Drink",
        "visbleId": "ColdDrinks",
        "itemList" : ["i009", "i010", "i006", "i007", "i008"],
    },
    "h04" : {
        "visibleName": "Smoothy",
        "visbleId": "Smoothy",
        "itemList" : ["i009", "i010", "i006", "i007", "i008"],
    },
    "h05" : {
        "visibleName": "Ice Cream",
        "visbleId": "IceCream",
        "itemList" : ["i009", "i010", "i006", "i007", "i008"],
    },
};

localStorage.setItem("items",JSON.stringify(items));
localStorage.setItem("heading",JSON.stringify(heading));

/*let all_ord={};

localStorage.setItem("all_order",JSON.stringify(all_ord));

localStorage.setItem( "Order_Id" , "1");

localStorage.setItem("order_updated","false");*/


// Model

function removeQty(key){
    cart_map.delete(key);
}

function subQty(key){
    if(cart_map.get(key)=="1"){
        removeQty(key);
    }
    else{
        let temp_num=Number(cart_map.get(key))-1;
        cart_map.set(key,temp_num);
    }
};

function addQty(key){
    if(cart_map.get(key) === undefined){
        cart_map.set(key,"1");
    }
    else{
        let temp_num=Number(cart_map.get(key))+1;
        cart_map.set(key,temp_num);
    }
}

function addOredrToPrevious(e){
    
    let all_ord=JSON.parse(localStorage.getItem("all_order"));

    let allOrdId;

    let temp_obj={};
    temp_obj.date=new Date();
    let id_num=Number(localStorage.getItem("Order_Id"));
    temp_obj.no="05"; 
    allOrdId="u"+temp_obj.no+id_num.toString();
    id_num++;
    localStorage.setItem("Order_Id", id_num.toString());
    temp_obj.status="Pending";

    // Order List
    for(let key of cart_map.keys()){
        temp_obj[key]=cart_map.get(key);
    }

    //all_ord.unshift(JSON.stringify(temp_obj));
    all_ord[allOrdId]=temp_obj;
    localStorage.setItem("all_order",JSON.stringify(all_ord));

    let pen_ord=JSON.parse(localStorage.getItem("Pending_Order"));
    pen_ord.push(allOrdId);
    localStorage.setItem("Pending_Order",JSON.stringify(pen_ord));
    localStorage.setItem("order_updated","true");
    
    cart_map=new Map();
}

function removeOredrfromPrevious(e){
 
    let all_ord=JSON.parse(localStorage.getItem("all_order"));

    let temp_obj=all_ord[e.target.value];

    delete all_ord[e.target.value];

    localStorage.setItem("all_order",JSON.stringify(all_ord));

    return temp_obj;
}

function copyToCart(obj){
    cart_map = new Map();

    for(let key in obj){
        
        if(key !== "id" && key!=="date" && key!="status" && key!="no"){
            cart_map.set(key,obj[key]);
        }
    }
}

function removeFromPending(temp_id){

    let pen_ord=JSON.parse(localStorage.getItem("Pending_Order"));
    pen_ord.splice(pen_ord.indexOf(temp_id));
    localStorage.setItem("Pending_Order",JSON.stringify(pen_ord));
    localStorage.setItem("order_updated","true");

}


// View

document.querySelector('body').addEventListener("load",DisplayItem());

function DisplayItem () {

    let sec=document.getElementById("LeftContent");

    for(let indexHeading in heading){

        let sub_sec=document.createElement("section");
        sub_sec.className="Inline_Flex";

        let title=document.createElement("h1");
        title.innerHTML=heading[indexHeading]["visibleName"];
        title.id=indexHeading;
        sec.append(title);

        for(let key of heading[indexHeading]["itemList"]){

            let temp_div=document.createElement("div");
            temp_div.className="Create_Box Show_box";
            
            let temp_img=document.createElement("img");
            temp_img.className="images"
            temp_img["src"] = items[key]["src"];
            temp_img["alt"] = items[key]["alt"];
            temp_div.append(temp_img);

            temp_div.append(document.createElement("br"));

            let text_style=document.createElement("span");
            text_style.className="Item_Name";
            text_style.innerHTML=items[key]["itemName"];
            temp_div.append(text_style);
            
            let cart_but=document.createElement("button");
            cart_but.className="AddButton";
            cart_but.value=key;
            cart_but.insertAdjacentHTML('beforeend'," Add to Cart");
            temp_div.append(cart_but);

            sub_sec.append(temp_div);
        }

        sec.append(sub_sec);
    }
    
};

if(cart_map.size)
    DisplayCart();

function DisplayCart(){

    let table=document.createElement('table');
    let ctr=1;

    for(let [key,value] of cart_map){

        let row=document.createElement("tr");
        
        let data=document.createElement("td");
        data.className="table_sr_no";
        data.innerHTML=ctr;
        ctr++;
        row.append(data);
        
        data=document.createElement("td");
        data.className="table_item_name";;
        data.innerHTML=items[key].itemName;
        row.append(data);
        
        data=document.createElement("td");
        data.className="table_item_subtract";;
        data.insertAdjacentHTML('afterbegin', '<button class="Change_Qty">-</button>');
        row.append(data);
        
        data=document.createElement("td");
        data.className="table_item_qty";;
        data.insertAdjacentHTML('afterbegin', '<input name="" id="" cols="5" rows="1" class="Display_Qty" value= ' + value +'></input>');
        row.append(data);
        
        data=document.createElement("td");
        data.className="table_item_add";
        data.insertAdjacentHTML('afterbegin', '<button class="Change_Qty">+</button>');
        row.append(data);
        
        data=document.createElement("td");
        data.className="table_item_remove";;
        data.insertAdjacentHTML('afterbegin', '<button class="Cancel">X</button>');
        row.append(data);
        
        table.append(row);
    }

    let temp_table=document.querySelector('#SelectedTable').firstElementChild;
    table.className=temp_table.className;
    table.style=temp_table.style;
    temp_table.replaceWith(table);
};

document.getElementById("All_Order").onclick=function displayAllOrder(e){
    
    let temp_block=document.querySelector('.Previous_Order_Display');
    temp_block.style.display="flex";
    
    let sec=document.createElement("section");
    sec.className="Previous_Order_Section";

    let table=document.createElement("table");
    table.className="Previous_Order_Table";

    let all_ord=JSON.parse(localStorage.getItem("all_order"));
    
    for(let ord in all_ord){

        // let temp_obj = JSON.parse(all_ord[ord], function(key, value) {
        //         if (key == 'date') return new Date(value);
        //         return value;
        //     });

        let temp_obj=all_ord[ord];
        temp_obj.date=new Date(temp_obj.date);
        let row=document.createElement("tr");

        let data=document.createElement("td");
        data.className="Pr_Or_Date";
        data.innerHTML=temp_obj.date.toDateString();
        row.append(data);

        data=document.createElement("td");
        data.className="Pr_Or_Time";
        data.innerHTML=temp_obj.date.toTimeString().split(' ')[0];
        row.append(data);

        data=document.createElement("td");
        data.className="Pr_Or_Items";

        let sub_table=document.createElement("table");
        sub_table.className="sub_table";
        for(let key in temp_obj){

            if(key !== "id" && key!=="date" && key!="status" && key!="no"){
                let sub_row=document.createElement("tr");
                sub_row.style.width="100%";

                let sub_data=document.createElement("td");
                sub_data.style.width="90%";
                sub_data.style.textAlign="center";
                sub_data.innerHTML=items[key]["itemName"];
                sub_row.append(sub_data);
                
                sub_data=document.createElement("td");
                sub_data.style.width="10%";
                sub_data.innerHTML=temp_obj[key];
                sub_row.append(sub_data);

                sub_table.append(sub_row);
            }
        }
        data.append(sub_table);

        row.append(data);

        data=document.createElement("td");
        data.className="Pr_Or_Edit";

        if(temp_obj.status == "Pending"){
            let butt=document.createElement("button");
            butt.className="editButton";
            butt.innerHTML="Edit";
            butt.value=ord;
            data.append(butt);
        } else if(temp_obj.status == "Delivered"){
            butt=document.createElement("button");
            butt.className="removeButton";
            butt.innerHTML="Remove";
            butt.value=ord;
            data.append(butt);
        }

        row.append(data);

        data=document.createElement("td");
        data.className="Pr_Or_Status";
        data.innerHTML=temp_obj.status;
        row.append(data);

        table.append(row);
    }
    
    sec.append(table);
    document.querySelector('.Previous_Order_Section').replaceWith(sec);

    // let close_button=temp_block.querySelector('.Cancel_Button');
    // close_button.onclick = function () {
    //     temp_block.style.display="none";
    // }
};

document.querySelector('.Previous_Order_Display').onclick = function(e) {

    if(e.target.className == "Cancel_Button"){
        document.querySelector('.Previous_Order_Display').style.display="none";
    }
    else if(e.target.className == "editButton"){

        let temp_id=e.target.value;

        removeFromPending(temp_id);

        let temp_obj = removeOredrfromPrevious(e);

        copyToCart(temp_obj);

        document.querySelector('.Previous_Order_Display').style.display="none";

        DisplayCart();

    } else if(e.target.className == "removeButton"){

       removeOredrfromPrevious(e);

        document.querySelector('.Previous_Order_Display').style.display="none";

    }
}

// Controller

document.getElementById('LeftContent').onclick = function(e){
    if(e.target.className=="AddButton")
        addToCart(e);
};

function addToCart(e){
    addQty(e.target.value);
    DisplayCart();
};

document.querySelector('#SelectedTable').onclick = function tableAction(e){
    let key=e.target.closest('tr').querySelector('.table_item_name').innerHTML;
    if(e.target.parentElement.className == "table_item_subtract"){
        subQty(key);
        DisplayCart();
    }
    else if(e.target.parentElement.className == "table_item_add"){
        addQty(key);
        DisplayCart();
    }
    else if(e.target.parentElement.className == "table_item_remove"){
        removeQty(key);
        DisplayCart();
    }
};

document.querySelector('#SubmitButton').onclick = function submitAction(e){

    addOredrToPrevious(e);
    DisplayCart();
};

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

