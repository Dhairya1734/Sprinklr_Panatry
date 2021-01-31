// data

let items={
    "Sandwich" : {
        id : "Sandwich",
        "Paneer Sandwich" : {
            className : "images",
            src : "sandwich.jpg",
            alt : "Paneer Sandwich",
        },
        "Veg Sandwich" : {
            className : "images",
            src : "Veg Sandwich.webp",
            alt : "Veg Sandwich",
        },
        "Club Sandwich" : {
            className : "images",
            src : "Club Sandwich.jpg",
            alt : "Club Sandwich",
        },
    },

    "Hot Drinks" : {
        id : "HotDrinks",
        "Tea" : {
            className : "images",
            src : "Tea.jpeg",
            alt : "Tea",
        },
        "Black Tea" : {
            className : "images",
            src : "Black-Tea.jpeg",
            alt : "Black Tea",
        },
        "Coffee" : {
            className : "images",
            src : "Coffee.jpg",
            alt : "Coffee",
        },
        "Black Coffee" : {
            className : "images",
            src : "Black Coffee.jpg",
            alt : "Black Coffee",
        },
        "Green Tea" : {
            className : "images",
            src : "Green Tea.jpeg",
            alt : "Green Tea",
        },
    },

    "Cold Drinks" : {
        id : "ColdDrinks",
        "Sprite" : {
            className : "images",
            src : "Sprite.jpg",
            alt : "Sprite",
        },
        "Energy Drink" : {
            className : "images",
            src : "Energy Drink.webp",
            alt : "Energy Drink",
        },
        "Coffee" : {
            className : "images",
            src : "Coffee.jpg",
            alt : "Coffee",
        },
        "Black Coffee" : {
            className : "images",
            src : "Black Coffee.jpg",
            alt : "Black Coffee",
        },
        "Green Tea" : {
            className : "images",
            src : "Green Tea.jpeg",
            alt : "Green Tea",
        },
    },

    "Smoothy" : {
        id : "Smoothy",
        "Tea" : {
            className : "images",
            src : "Tea.jpeg",
            alt : "Tea",
        },
        "Black Tea" : {
            className : "images",
            src : "Black-Tea.jpeg",
            alt : "Black Tea",
        },
        "Coffee" : {
            className : "images",
            src : "Coffee.jpg",
            alt : "Coffee",
        },
        "Black Coffee" : {
            className : "images",
            src : "Black Coffee.jpg",
            alt : "Black Coffee",
        },
        "Green Tea" : {
            className : "images",
            src : "Green Tea.jpeg",
            alt : "Green Tea",
        },
    },

    "Ice Cream" : {
        id : "IceCream",
        "Tea" : {
            className : "images",
            src : "Tea.jpeg",
            alt : "Tea",
        },
        "Black Tea" : {
            className : "images",
            src : "Black-Tea.jpeg",
            alt : "Black Tea",
        },
        "Coffee" : {
            className : "images",
            src : "Coffee.jpg",
            alt : "Coffee",
        },
        "Black Coffee" : {
            className : "images",
            src : "Black Coffee.jpg",
            alt : "Black Coffee",
        },
        "Green Tea" : {
            className : "images",
            src : "Green Tea.jpeg",
            alt : "Green Tea",
        },
    },
};

let cart_map=new Map();
let all_ord=[];

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
    let temp_obj={};
    temp_obj.date=new Date();
    temp_obj.id="u01"+all_ord.length.toString();
    temp_obj.status="Pending";
    for(let key of cart_map.keys()){
        temp_obj[key]=cart_map.get(key);
    }
    all_ord.unshift(JSON.stringify(temp_obj));
    cart_map=new Map();
}

// View

document.querySelector('body').addEventListener("load",DisplayItem());

function DisplayItem () {

    let sec=document.getElementById("LeftContent");

    for(let key in items){

        let sub_sec=document.createElement("section");
        sub_sec.className="Inline_Flex";

        for(let j in items[key]){

            if(j=="id"){

                let heading=document.createElement("h1");
                heading.innerHTML=key;
                heading.id=items[key][j];
                sec.append(heading);

            }
            else{

                let temp_div=document.createElement("div");
                temp_div.className="Create_Box Show_box";
                
                let temp_img=document.createElement("img");
                for(let k in items[key][j]){
                    temp_img[k]=items[key][j][k];
                }
                temp_div.append(temp_img);

                temp_div.append(document.createElement("br"));

                let text_style=document.createElement("span");
                text_style.className="Item_Name";
                text_style.innerHTML=j;
                temp_div.append(text_style);
                
                let cart_but=document.createElement("button");
                cart_but.className="AddButton";
                cart_but.value=j;
                cart_but.insertAdjacentHTML('beforeend'," Add to Cart");
                temp_div.append(cart_but);

                sub_sec.append(temp_div);
            }
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
        data.innerHTML=key;
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
    
    for(let ord of all_ord){

        let temp_obj = JSON.parse(ord, function(key, value) {
                if (key == 'date') return new Date(value);
                return value;
            });

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

            if(key !== "id" && key!=="date" && key!="status"){
                let sub_row=document.createElement("tr");
                sub_row.style.width="100%";

                let sub_data=document.createElement("td");
                sub_data.style.width="90%";
                sub_data.style.textAlign="center";
                sub_data.innerHTML=key;
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

        let butt=document.createElement("button");
        butt.className="editButton";
        butt.innerHTML="Edit";
        butt.value=temp_obj.id;
        data.append(butt);

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
    else if(e.target.className="editButton"){
        alert(e.target.value);
    }
}

// Controller

document.getElementById('LeftContent').onclick = function(e){
    if(e.target.className=="AddButton")
        addToCart(e);
};

function addToCart(e){
    addQty(e.target.previousElementSibling.innerHTML.toString());
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
