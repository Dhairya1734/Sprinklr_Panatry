function applicationType(string){
    switch(string){
        case 'CLIENT_TYPE':
            return { 
                rowClassName : "previousOrderItemRow" , 
                cellClassName : ["previousOrderItemTableItemName" , ""] 
            };
        case 'SERVER_TYPE' : 
            return {
                rowClassName : "",
                cellClassName : ["itemName" , "itemQty"] 
            }
        default :
            return {
                rowClassName : "",
                cellClassName : ["",""]
            }
    }
}

function changeStyle(WrappedComponent){
    return (props) => {
        return <WrappedComponent {...props} allClassNames={applicationType(props.type)}></WrappedComponent>
    }
}

export default changeStyle;