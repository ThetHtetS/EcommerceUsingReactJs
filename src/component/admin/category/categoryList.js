import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
const CategoryList =()=>{
const [category, setCategory]= useState([]);
const [loading, setLoading]= useState(true);
useEffect(() => {
    axios.get('http://localhost/laravel/blog/public/api/view-category').then(res=>{
        if(res.status===200){
            setCategory(res.data.category);
           setLoading(false);
           console.log(res.data.category)
        } 
    })  
  },[]);

const deleteCategory=(e, id)=>{
  e.preventDefault();
 const thisClicked= e.currentTarget;
  axios.post(`http://localhost/laravel/blog/public/api/delete-category/${id}`).then(res=>{ 
    if(res.status===200){
   thisClicked.closest("tr").remove();
    } 
})
}

var cat ='';
var no= 0;
cat =  category.map((i)=> {return(
<tr key={i.id} className="align-middle">
<th scope="row">{no=no + 1}</th>
<td >{i.name}</td>
<td>{i.slug}</td>
<td>{i.status}</td>
 <td><Link to={`/admin/edit-category/${i.id}`}  className="btn btn-success btn-sm">Edit</Link></td>
<td><button type="button" onClick={(e) => deleteCategory(e, i.id)} className="btn btn-danger btn-sm">Delete</button></td>
</tr>
)})

if(loading){
  return(<div>loading</div>)
}
    return(
        <div className="container-fluid mt-5">
 <div className="card border">    
 <h2  className="card-header"> Category List
 <Link to='/admin/category'  className="btn btn-primary float-end">+Add</Link>
 </h2>    
<table className="table table-bordered table-light table-hover">          
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Slug</th>
      <th scope="col">Status</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody className="table-hover">
   {cat}
  </tbody>
  </table>
  </div>
 </div>
    )
}
export default CategoryList;