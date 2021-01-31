let process=document.querySelectorAll('.Order_Status');

process[0].onclick=function onWay(e){
    if(e.target.tagName=="BUTTON"){
        e.target.parentElement.remove();
    }
};

process[1].onclick=function processing(e){
    if(e.target.tagName=="BUTTON"){
        e.target.innerHTML="Delivered";
        process[0].append(e.target.parentElement);
    }
}

process[2].onclick=function processing(e){
    if(e.target.tagName=="BUTTON"){
        e.target.innerHTML="Deliver Order";
        process[1].append(e.target.parentElement);
    }
}

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

let pen_ord=[ { "no" : "5", "coffee" : "2" , "Tea" : "3"} , { "no" : "6", "coffee" : "2" , "Tea" : "3"} ];

let processing_ord=[ { "no" : "3", "coffee" : "2" , "Tea" : "3"} , { "no" : "4", "coffee" : "2" , "Tea" : "3"} ];

let on_way_ord=[ { "no" : "1", "coffee" : "2" , "Tea" : "3"} , { "no" : "2", "coffee" : "2" , "Tea" : "3"} ];

document.querySelector('body').addEventListener('load',displayPending());
document.querySelector('body').addEventListener('load',displayProcessing());
document.querySelector('body').addEventListener('load',displayOnWay());

function displayPending(){

    let elem=document.getElementById("pending");

    for(let ord of pen_ord){

        let temp=document.createElement("div");
        temp.className="Order";
        let title=document.createElement("header");
        title.className="Name";
        let sec=document.createElement("section");
        sec.className="Items";
        let table=document.createElement("table");
        table.className="List";

        for(let name in ord){

            if(name !== "no"){

                let row=document.createElement("tr");

                let data=document.createElement("td");
                data.className="ItemName";
                data.innerHTML=name;
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
        butt.innerHTML="Processing";

        temp.append(title);
        sec.append(table);
        temp.append(sec);
        temp.append(butt);
        elem.append(temp);

    }

}

function displayProcessing(){

    let elem=document.getElementById("processing");

    for(let ord of processing_ord){

        let temp=document.createElement("div");
        temp.className="Order";
        let title=document.createElement("header");
        title.className="Name";
        let sec=document.createElement("section");
        sec.className="Items";
        let table=document.createElement("table");
        table.className="List";

        for(let name in ord){

            if(name !== "no"){

                let row=document.createElement("tr");

                let data=document.createElement("td");
                data.className="ItemName";
                data.innerHTML=name;
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
        butt.innerHTML="Deliver Order";

        temp.append(title);
        sec.append(table);
        temp.append(sec);
        temp.append(butt);
        elem.append(temp);

    }

}

function displayOnWay(){

    let elem=document.getElementById("onWay");

    for(let ord of on_way_ord){

        let temp=document.createElement("div");
        temp.className="Order";
        let title=document.createElement("header");
        title.className="Name";
        let sec=document.createElement("section");
        sec.className="Items";
        let table=document.createElement("table");
        table.className="List";

        for(let name in ord){

            if(name !== "no"){

                let row=document.createElement("tr");

                let data=document.createElement("td");
                data.className="ItemName";
                data.innerHTML=name;
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
        butt.innerHTML="Delivered";

        temp.append(title);
        sec.append(table);
        temp.append(sec);
        temp.append(butt);
        elem.append(temp);

    }

}