import React, {useState, useEffect} from "react";
import {  useParams, Link } from "react-router-dom";
import axios from "axios";
const Detail =()=>{
    const [order, setOrder]= useState([]);
    const [loading, setLoading]= useState(true);

    let params = useParams();
    const id= params.id;
    
useEffect(() => {
    axios.get(`http://localhost/laravel/public/api/detail/${id}`).then(res=>{
        
        if(res.status===200){
        setOrder(res.data.data);
        setLoading(false);
        } 
    })  
  },[]);
 

if(loading){
  return(<div>loading</div>)
}


const handleSubmit=(e, id)=>{

const data={'status': 1}
e.preventDefault();
  axios.put(`http://localhost/laravel/public/api/updatestatus/${id}`, data).then(res=>{
        
    if(res.status===200){
   
    console.log(res.data.message);
   
    } 
})
}

var prod ='';
var total= 0;
let no=0;
prod=    order.orderitems.map(i=>{  
         total += i.product.seeling_price * i.qty;
       return(
         <tr key={i.id} className="align-middle">
         <th scope="row">{no=no + 1}</th>
         <td>{i.product.name}</td>
       
      <td>{i.qty}</td>
      <td>{i.product.seeling_price}</td>
      <td>{i.product.seeling_price * i.qty}</td>
         </tr>
         

       )
   });

var but = '';
 if(order.status=== 0){
 but = (
    
        <button className="form-control mt-2 btn-warning" onClick={ (e)=> handleSubmit(e, order.id)} type="submit">Mark Done</button>
    
   )
 }

    return(
        <div className=" row container-fluid mt-5 border ps-5 py-5">
       
        
        <div className="card col-md-6 card border mx-auto shadow">  
        <h2  className="card-header"> Shipping Details
       </h2>    
       <div className="card-body">
         <label for="">Name</label>
               <div className="border mb-3 ps-2 py-2">{order.name}</div>
               <label for="">phone</label>
               <div className="border mb-3 ps-2 py-2">{order.phone }</div>
               <label for="">email</label>
               <div className="border mb-3 ps-2 py-2"> {order.email }</div>
               <label for="">address</label>
               <div className="border mb-3 ps-2 py-2">
                 {order.address} <br />
                 {order.town} <br />
                 {order.State} <br />
               
               </div>
         </div>   
        </div>
        <div className=" col-md-5 mx-auto">  
        <div className="card border shadow">
        <h2  className="card-header"> Orderitems
       </h2> 
       <div className="card-body">
        <table className="table table-bordered table-light ">          
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">qty</th>
      <th scope="col">price</th>
      <th scope="col">total</th>
     
    </tr>
  </thead>
  <tbody className="table-hover">
   {prod}
   <tr>
            <td colspan='3' className="text-end">grand total</td>
            <td colspan="2"className="text-end">{total}</td>
          </tr>
  </tbody>
  </table>
  </div>
  </div>
  
  <form className="mt-3" onSubmit={ (e)=> handleSubmit(e, order.id)}>
  <div className="form-group" >
  
    <label for="" className="fw-bold" >Order Status</label>
    
    <div className="border py-2 text-center bg-success fst-italic">{order.status=== 0? 'Pending' : 'Completed'}</div>
    {but}
 
      
       </div>
       </form>
        </div>
        </div>    
        

  

    )
}
export default Detail;