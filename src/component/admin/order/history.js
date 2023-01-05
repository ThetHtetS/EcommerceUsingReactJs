import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const OrderHistory=()=>{
   const [order, setOrder]= useState();
   const[loading, setLoading]= useState(true);
   useEffect(() => {
 
    axios.get(`http://localhost/laravel/public/api/view-orders-history`).then(res=>{
    
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
orde =  order.map((i)=> {return(
<tr key={i.id} className="align-middle">
<th scope="row">{no=no + 1}</th>
<td >{i.name}</td>

<td>{i.status===1? 'completed': 'pending'}</td>

 <td><Link to={`/admin/detail/${i.id}`}  className="btn btn-success btn-sm">view</Link></td>
</tr>
)});
    return(
        <div className="container-fluid mt-5">
        <div className="card border shadow">    
        <h2  className="card-header">Completed Order 
        <Link to='/admin/order'  className="btn btn-success float-end">Orders</Link>
 </h2>    
<table className="table table-bordered table-light table-hover">          
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      
      <th scope="col">Status</th>
      <th scope="col">view</th>
     
    </tr>
  </thead>
  <tbody className="table-hover">
   {orde}
  </tbody>
  </table>
      
         </div>
        </div>
    )
}
export default OrderHistory;