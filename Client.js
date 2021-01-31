// let cart_map=new Map();
// //cart_map.set("temp",1);
// let Items=document.querySelectorAll('.AddButton');

// // function displayItemList(){
// //     let navItemList=document.getElementsByClassName("Nav_Item_Name")[0];
// //     if(navItemList.style.display=="block")
// //     {
// //         navItemList.style.display="none";
// //         return;
// //     }
// //     let st=getComputedStyle(navItemList);
// //     navItemList.style.display="block";
// // }

// // function remov(eve){
// //     //alert("Half Way");
// //     eve.target.closest("tr").remove();
// //     //setTimeout(setSrNo());
// //     cart_map.delete(eve.target.closest("tr").querySelector('.table_item_name').innerHTML);
// //     setSrNo();
// // };

// // function addQty(){
// //     let item=this.closest("tr").querySelector('.Display_Qty');
// //     item.value=Number(item.value)+1;
// //     let item_name=this.closest("tr").cells[1];
// //     cart_map.set(item_name.innerHTML,item.value);
// //     //alert(cart_map.get(item_name.innerHTML));
// // };

// // function setQty(tx){
// //     let r=document.querySelector("#SelectedTable").firstElementChild.rows;
// //     for(let item of r){
// //         if(item.cells[1].innerHTML === tx){
// //             //alert(cart_map.get(tx));
// //             let temp=Number(cart_map.get(tx));
// //             temp=temp+1;
// //             cart_map.set(tx,temp.toString());
// //             //alert("02");
// //             //alert(cart_map.get(tx));
// //             item.querySelector('.Display_Qty').value=cart_map.get(tx);
// //             return true;
// //         }
// //     }
// //     return false;
// // }

// // function setSrNo(){
// //     //alert("Start");
// //     let r=document.querySelector("#SelectedTable").firstElementChild.rows;
// //     // let r=document.querySelectorAll('.Example_row');
// //     //alert(r.length);
// //     let cntr=0;

// //     for(let item of r){
// //         // let temp=item;
// //         // temp.cells[0].innerHTML=1;
// //         // ctr++;
// //         // item.replaceWith(temp);
// //         item.cells[0].innerHTML=cntr.toString();
// //         cntr=cntr+1;
// //     }
// // };

// for(let item of Items){
//     item.onclick=function addItemToCart(){
//         //alert(Items.length);
//         let tx=this.value;
//         let flag=false;
//         for(let k of cart_map.keys()){
//             if(setQty(tx))
//             {
//                 flag=true;
//                 break;
//             }
//         }
//         if(flag){
//             //alert("no");
//             return;
//         }
//         let table=document.querySelector("#SelectedTable").firstElementChild;
//         let cart=document.querySelector("#SelectedTable").firstElementChild.rows;
//         let r=cart[0].cloneNode(true);
//         r.cells[0].innerHTML=table.rows.length;
//         r.cells[1].innerHTML=this.value;
//         r.style.display="block";
//         let cancel=r.querySelector('.Cancel');
//         cancel.onclick=remov;
//         let add=r.querySelector('.table_item_add');
//         add.onclick=addQty;
//         let sub=r.querySelector('.table_item_subtract');
//         sub.onclick=subQty;
//         cart_map.set(r.cells[1].innerHTML,"1");
//         //alert(cart_map.get(r.cells[1].innerHTML));
//         table.append(r);
//     }
// }

// let sub_but=document.querySelector('#SubmitButton');
// sub_but.onclick=function SubmitItem(e){
//     if(confirm("sure ??" ) ){
//         let cart=document.querySelector("#SelectedTable").firstElementChild.rows;
//         let temp={};
//         temp.date=new Date();
//         for(let i=1;i<cart.length;){
//             item=cart[i];
//             if(item.cells[1].innerHTML != "Temp")
//             {
//                 temp[item.cells[1].innerHTML]=item.cells[3].firstElementChild.value;
//                 item.remove();
//             }
//         }
//         add_row_pr_table(JSON.stringify(temp));
//     }
// }

// function add_row_pr_table(str){
//     let table=document.querySelector('.Previous_Order_Table').firstElementChild.rows;
//     //alert(table.length);
//     let temp_obj = JSON.parse(str, function(key, value) {
//         if (key == 'date') return new Date(value);
//         return value;
//       });
//     let r=table[table.length-1].cloneNode(true);
//     r.cells[0].innerHTML=temp_obj.date.toDateString();
//     r.cells[1].innerHTML=temp_obj.date.toTimeString().split(' ')[0];
//     //alert(r.cells[2].firstElementChild.tagName);
//     let item_table=r.cells[2].firstElementChild.firstElementChild;
//     let item_table_rows=r.cells[2].firstElementChild.firstElementChild.rows;
//     for(let key in temp_obj)
//     {
//         //alert(key + "-----" +temp_obj[key]);
//         if(key!=="date"){
//             let temp_row=item_table_rows[0].cloneNode(true);
//             temp_row.cells[0].innerHTML=key;
//             temp_row.cells[1].innerHTML=temp_obj[key];
//             //alert(temp_row.cells[0].innerHTML + temp_row.cells[1].innerHTML);
//             temp_row.style.display="block";
//             item_table.append(temp_row);
//         }
//         //alert("done");
//     }
//     //alert("yo");
//     r.style.display="block";
//     //alert("yo");
//     document.querySelector('.Previous_Order_Table').firstElementChild.prepend(r);
//     //alert("yo");
// }

// let pr_ord=document.querySelector('.Previous_Order_Display');
// pr_ord.onclick=function pr_ord_box(e){
//     if(e.target.className == "Cancel_Button"){
//         e.currentTarget.style.display="none";
//     }
//     else
//         return;
// }

// let all_ord=document.getElementById("All_Order");
// all_ord.onclick=function(e){
//     document.querySelector('.Previous_Order_Display').style.display="flex";
// }