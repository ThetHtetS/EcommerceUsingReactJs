import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
const UserCategory=()=>{
const [category, setCategory]= useState([]);
const [loading, setLoading]= useState(true);
useEffect(() => {
    axios.get('http://localhost/laravel/public/api/view-category').then(res=>{
        if(res.status===200){
            setCategory(res.data.category);
           setLoading(false);
        } 
    })  
  },[]);


var cat ='';
var no= 0;
cat =  category.map((i)=> {return(
 <div className="col-md-2 col-sm-3 col-6">
   <div className="">
     <div className="card bordered my-3  ps-auto shadow-sm py-2">
     <Link className="btn" to={`/cat-product/${i.slug}`}>    {i.name} </Link>
     </div>
     </div>
 </div>
)})

if(loading){
  return(<div></div>)
}
    return(
        <div className="container-fluid mt-2">
          <div className="row">
            <div className=" mx-auto">
           <div className="card  ps-5 py-3">Category</div>
           </div>
           </div>
            <div className="row">
          {cat}
          </div>
     
     </div>
    )
}
export default UserCategory;