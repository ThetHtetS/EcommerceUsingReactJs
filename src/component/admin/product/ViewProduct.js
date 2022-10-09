import React, { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
const ViewProduct=()=>{
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

  
 

const deleteProduct =(e, id)=>{
    e.preventDefault();
    const thisClicked= e.currentTarget;
     axios.post(`http://localhost/laravel/blog/public/api/delete-product/${id}`).then(res=>{ 
       if(res.status===200){
      thisClicked.closest('tr').remove();
       } 
   })
}
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
<td><button type="button" onClick={(e) => deleteProduct(e, i.id)} className="btn btn-danger btn-sm">Delete</button></td>
<td><Link to={`/admin/detail/${i.id}`}  className="btn btn-success btn-sm">view</Link></td>
</tr>)});

    return(
        <div className="container-fluid mt-5">
        <div className="card border">    
        <h2  className="card-header"> Product List
        <Link to='/admin/add-product'  className="btn btn-primary float-end">+Add</Link>
        </h2>    
       <table className="table table-bordered table-light table-hover">          
         <thead>
           <tr>
             <th scope="col">No.</th>
             <th scope="col">Category Name</th>
             <th scope="col">product Name</th>
             <th scope="col">price</th>
             <th scope="col">image</th>
             <th scope="col">Edit</th>
             <th scope="col">Delete</th>
             <th scope="col">detail</th>
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
export default ViewProduct;