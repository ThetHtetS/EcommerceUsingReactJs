import React, { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
const UserProduct=()=>{
   const [product, setProduct]= useState(); 
 const [loading, setLoading]= useState(true);
useEffect(() => {
    axios.get('http://localhost/laravel/blog/public/api/view-product').then(res=>{
        
        if(res.status===200){
        
            console.log(res.data.product); 
            setProduct(res.data.product);
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
 <td><Link to={`/admin/edit-product/${i.id}`}  className="btn btn-success btn-sm">Edit</Link></td>

</tr>)});

    return( 
        <div className="container-fluid mt-5">
        <div className="card border">    
        i am user porduct
        {prod}
         </div>
        </div>

    )
}
export default UserProduct;