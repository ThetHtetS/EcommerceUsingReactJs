import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
const Profit=()=>{
   const [order, setOrder]= useState("2022-07-03");
   const[loading, setLoading]= useState(true);
   const [startDate, setStartDate] = useState(new Date());
   const [date,setDate]= useState('');
   useEffect(() => {
 
    axios.post(`http://localhost/laravel/blog/public/api/view-orders-history/${date}`).then(res=>{
    
        if(res.status===200){
        
            console.log(res.data); 
            setOrder(res.data.data);
           setLoading(false);
        }
    
    })  
   
  }, []);



  if (loading){
    return(<div>loading...</div>)
}
var orde ='';
var no= 0;
var total= 0;
orde =  order.map((i)=> {return(

i.orderitems.map(i=>{  
        total += (i.product.seeling_price-i.product.original_price )* i.qty;
})

)});




    return(
        <div className="container-fluid mt-5">
      <DatePicker dateFormat="dd/MM/yy"  selected={startDate} onChange={(Date) => setStartDate(Date)} />
<p> Your Profit is    ${total} </p>



      
         
        </div>
    )
}
export default Profit;