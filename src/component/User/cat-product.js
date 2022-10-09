import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import axios from "axios";

const CatProduct=()=>{
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
   
    let params = useParams();
    const slug= params.slug;
    
    
    useEffect(() => {
 
        axios.get(`http://localhost/laravel/blog/public/api/slug/${slug}`).then(res=>{
        
            if(res.status===200){
            
                console.log(res.data.product); 
                setProduct(res.data.product);
               setLoading(false);
            }
        
        })  
       
      }, []);

    
const AddtoCart = (e, id) =>{
    var cart ={product_id: id, qty: 1 };

axios.post('http://localhost/laravel/blog/public/api/add-to-cart', cart).then(res=>{
        
    if(res.data.status===200){
        alert(res.data.message);         
    } 
})  

}

 if(loading){
    return(<div></div>)
}
var checkStock= '';


var prod ='';

prod =  product.map((i)=> {return(
 <div className="col-md-4 col-6 col-lg-3">
     <div className="card bordered mt-3  bg-light pt-2 ">
     <img src={`http://localhost/laravel/blog/public/${i.image}`} className="mx-auto" alt="image"/>

     <div class="card-body mx-auto">
        <div className=" category"> {i.name} <span>${i.seeling_price}</span> </div> 
 
       {i.qty>0 ? (<span> <button onClick={(e)=>AddtoCart(e, i.id, i.seeling_price, i.name, i.image)} className="btn btn-outline-warning">Add to cart</button> </span>) : (<div className="warning"> out Of stock </div>)}
      
     </div>
     </div>
 </div> 
)}
)
 
return( <div className="container-fluid mt-2">
<div className="card ps-5 shadow-sm py-2"> Category/ {slug}</div>
 <div class="row">
{prod}
</div>

</div>)
}
export default CatProduct;