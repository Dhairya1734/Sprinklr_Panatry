
//let pen_ord=[]; 

//let processing_ord=[ ];

// let on_way_ord=[ { "no" : "1", "coffee" : "2" , "Tea" : "3"} //Object Time, QTy ,Name , TAble, { "no" : "2", "coffee" : "2" , "Tea" : "3"} ];

//let delivered_ord = [];

//localStorage.setItem("Pending_Order",JSON.stringify(pen_ord));
//localStorage.setItem("Processing_Order",JSON.stringify(processing_ord));
//localStorage.setItem("On_Way_Order",JSON.stringify(on_way_ord));
//localStorage.setItem("Delivered_order",JSON.stringify(delivered_ord));

document.querySelector('body').addEventListener('load',displayPending());
document.querySelector('body').addEventListener('load',displayProcessing());
document.querySelector('body').addEventListener('load',displayOnWay());

//Model
let process=document.querySelectorAll('.Order_Status');

process[0].onclick=function onWay(e){
    if(e.target.tagName=="BUTTON"){

        let temp_id=e.target.value;
        let on_way_ord = JSON.parse(localStorage.getItem("On_Way_Order"));
        on_way_ord.splice(on_way_ord.indexOf(temp_id),1);
        localStorage.setItem("On_Way_Order",JSON.stringify(on_way_ord));

        let all_ord=JSON.parse(localStorage.getItem("all_order"));
        all_ord[temp_id]["status"]="Delivered";
        localStorage.setItem("all_order",JSON.stringify(all_ord));

        let delivered_ord = JSON.parse(localStorage.getItem("Delivered_order"));
        delivered_ord.push(temp_id);
        localStorage.setItem("Delivered_order",JSON.stringify(delivered_ord));

        displayOnWay();
    }
};

process[1].onclick=function processing(e){
    if(e.target.tagName=="BUTTON"){

        let temp_id=e.target.value;
        let processing_ord = JSON.parse(localStorage.getItem("Processing_Order"));
        processing_ord.splice(processing_ord.indexOf(temp_id),1);
        localStorage.setItem("Processing_Order",JSON.stringify(processing_ord));

        let all_ord=JSON.parse(localStorage.getItem("all_order"));
        all_ord[temp_id]["status"]="On_Way";
        localStorage.setItem("all_order",JSON.stringify(all_ord));
        
        let on_way_ord = JSON.parse(localStorage.getItem("On_Way_Order"));
        on_way_ord.push(temp_id);
        localStorage.setItem("On_Way_Order",JSON.stringify(on_way_ord));
        
        displayProcessing();
        displayOnWay();
    }
}

process[2].onclick=function pending(e){
    if(e.target.tagName=="BUTTON"){

        let temp_id=e.target.value;
        let pen_ord=JSON.parse(localStorage.getItem("Pending_Order"));
        pen_ord.splice(pen_ord.indexOf(temp_id),1);
        localStorage.setItem("Pending_Order",JSON.stringify(pen_ord));

        let all_ord=JSON.parse(localStorage.getItem("all_order"));
        all_ord[temp_id]["status"]="Processing";
        localStorage.setItem("all_order",JSON.stringify(all_ord));

        let processing_ord = JSON.parse(localStorage.getItem("Processing_Order"));
        processing_ord.push(temp_id);
        localStorage.setItem("Processing_Order",JSON.stringify(processing_ord));
        
        displayPending();
        displayProcessing();
    }

}

// controller
document.querySelector('.Search_Button').onclick=function sel(e){
    let drop_down_val=document.querySelector('.Find_Table').value;
    let all_div=document.querySelectorAll('.Order');
    for(let item of all_div){
        if(drop_down_val == "all"){
            item.style.display="block";
        }
        else if(item.dataset.table != drop_down_val){
            item.style.display="none";
        }
        else{
            item.style.display="block";
        }
    }
}

setTimeout(checkUpdate,5000);

function checkUpdate(){

    if(localStorage.getItem("order_updated") === "true"){
        displayPending();
        localStorage.setItem("order_updated","false");
    }
    setTimeout(checkUpdate,5000);
}

// View
function displayPending(){

    //let elem=document.getElementById("displayPendingId");
    //alert(elem.tagName);

    let items=JSON.parse(localStorage.getItem("items"));
    let all_ord=JSON.parse(localStorage.getItem("all_order"));

    let sec_main=document.createElement("section");
    sec_main.id="displayPendingId";

    let pen_ord=JSON.parse(localStorage.getItem("Pending_Order"));

    for(let index in pen_ord){

        let ord=all_ord[pen_ord[index]];

        let temp=document.createElement("div");
        temp.className="Order";
        let title=document.createElement("header");
        title.className="Name";
        let sec=document.createElement("section");
        sec.className="Items";
        let table=document.createElement("table");
        table.className="List";

        for(let name in ord){

            if(name !== "no" && name!="date" && name!="status" && name!="id"){

                let row=document.createElement("tr");

                let data=document.createElement("td");
                data.className="ItemName";
                data.innerHTML=items[name].itemName;
                row.append(data);

                data=document.createElement("td");
                data.className="ItemQty";
                data.innerHTML=ord[name];
                row.append(data);

                table.append(row);
            }
            else{

                temp.dataset.table=ord["no"];
                title.innerHTML="Table No: " + ord["no"];
            }

        }

        let butt=document.createElement("button");
        butt.className="done On_Way";
        butt.value=pen_ord[index];
        butt.innerHTML="Move To Processing";

        temp.append(title);
        sec.append(table);
        temp.append(sec);
        temp.append(butt);
        sec_main.append(temp);
    }

    document.getElementById("displayPendingId").replaceWith(sec_main);

}

function displayProcessing(){

    //let elem=document.getElementById("displayProcessingId");
    //alert(elem.tagName);

    let items=JSON.parse(localStorage.getItem("items"));
    let all_ord=JSON.parse(localStorage.getItem("all_order"));

    let processing_ord = JSON.parse(localStorage.getItem("Processing_Order"));

    let sec_main=document.createElement("section");
    sec_main.id="displayProcessingId";

    for(let index in processing_ord){

        let ord=all_ord[processing_ord[index]];

        let temp=document.createElement("div");
        temp.className="Order";
        let title=document.createElement("header");
        title.className="Name";
        let sec=document.createElement("section");
        sec.className="Items";
        let table=document.createElement("table");
        table.className="List";

        for(let name in ord){

            if(name !== "no" && name!="date" && name!="status" && name!="id"){

                let row=document.createElement("tr");

                let data=document.createElement("td");
                data.className="ItemName";
                data.innerHTML=items[name].itemName;;
                row.append(data);

                data=document.createElement("td");
                data.className="ItemQty";
                data.innerHTML=ord[name];
                row.append(data);

                table.append(row);
            }
            else{

                temp.dataset.table=ord["no"];
                title.innerHTML="Table No: " + ord["no"];
            }

        }

        let butt=document.createElement("button");
        butt.className="done On_Way";
        butt.value=processing_ord[index];
        butt.innerHTML="Deliver Order";

        temp.append(title);
        sec.append(table);
        temp.append(sec);
        temp.append(butt);
        sec_main.append(temp);

    }

    document.getElementById("displayProcessingId").replaceWith(sec_main);

}

function displayOnWay(){

    let sec_main=document.createElement("section");
    sec_main.id="displayOnWay";

    let items=JSON.parse(localStorage.getItem("items"));
    let all_ord=JSON.parse(localStorage.getItem("all_order"));

    let on_way_ord = JSON.parse(localStorage.getItem("On_Way_Order"));

    for(let index in on_way_ord){

        let ord=all_ord[on_way_ord[index]];

        let temp=document.createElement("div");
        temp.className="Order";
        let title=document.createElement("header");
        title.className="Name";
        let sec=document.createElement("section");
        sec.className="Items";
        let table=document.createElement("table");
        table.className="List";

        for(let name in ord){

            if(name !== "no" && name!="date" && name!="status" && name!="id"){

                let row=document.createElement("tr");

                let data=document.createElement("td");
                data.className="ItemName";
                data.innerHTML=items[name].itemName;;
                row.append(data);

                data=document.createElement("td");
                data.className="ItemQty";
                data.innerHTML=ord[name];
                row.append(data);

                table.append(row);
            }
            else{

                temp.dataset.table=ord["no"];
                title.innerHTML="Table No: " + ord["no"];
            }

        }

        let butt=document.createElement("button");
        butt.className="done On_Way";
        butt.value=on_way_ord[index];
        butt.innerHTML="Delivered";

        temp.append(title);
        sec.append(table);
        temp.append(sec);
        temp.append(butt);
        sec_main.append(temp);

    }

    document.getElementById("displayOnWay").replaceWith(sec_main);

}
