import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ProductQty =()=>{

    const [product, setProduct]= useState(); 
 const [loading, setLoading]= useState(true);
useEffect(() => {
    axios.get('http://localhost/laravel/public/api/product-qty').then(res=>{
        
        if(res.status===200){
        
            console.log(res.data.result); 
            setProduct(res.data.result);
           setLoading(false);
        } 
    })  
  },[]);

  
 

if(loading){
    return(<div>loading</div>)
}
 
var prod ='';
var no= 0;
prod =  product.map((i)=> {return(
<tr key={i.id} className="align-middle">
<th scope="row">{no=no + 1}</th>
<td >{i.category_id}</td>
<td>{i.name}</td>
<td>{i.seeling_price}</td>
<td><img src={`http://localhost/laravel/blog/public/${i.image}`} width='50px' alt="image"/></td>
<td>{i.qty}</td>
</tr>)});

    return(
        <div className="container-fluid mt-5">
        <div className="card border">    
        <h2  className="card-header"> Low stock Product 
        
        </h2>    
       <table className="table table-bordered table-light table-hover">          
         <thead>
           <tr>
             <th scope="col">No.</th>
             <th scope="col">Category Name</th>
             <th scope="col">product Name</th>
             <th scope="col">price</th>
             <th scope="col">image</th>
             <th scope="col">Qty</th>
             
           </tr>
         </thead>
         <tbody className="table-hover">
          {prod}
         </tbody>
         </table>
         </div>
        </div>

    )

}
export default ProductQty;