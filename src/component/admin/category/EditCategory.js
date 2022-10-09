import React, {useState, useEffect} from "react";
import {  useParams, Link } from "react-router-dom";
import axios from "axios";
const EditCategory =()=>{
    const [cat, setCat]= useState([]);
    const [loading, setLoading]= useState(true);
  const[err, setErr]= useState({});
 

    let params = useParams();
    const id= params.id;
   
     
useEffect(() => {
    axios.get(`http://localhost/laravel/blog/public/api/edit-category/${id}`).then(res=>{
        
        if(res.status===200){
        setCat(res.data.category);
        setLoading(false);
        } 
    })  
  },[]);
  const handleInput =(e)=>{
     
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setCat({...cat, [name]: value});

  }
console.log(cat);
const handleSubmit=(e)=>{
e.preventDefault();
axios.post(`http://localhost/laravel/blog/public/api/edit-category/${id}`, cat).then(res=>{
        
    if(res.status===200){
   alert(res.data.message);
      
    } 
})  


}
if(loading){
  return(<div>loading</div>)
}
    return(<div className="container-fluid card">
      <h2 className="card-header mt-4">Category <Link to='/admin/categorylist'  className="btn btn-primary float-end">View Category</Link></h2>
            <form onSubmit={handleSubmit}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seotag" type="button" role="tab" aria-controls="profile" aria-selected="false">Seo Tag</button>
  </li>
 
</ul>
<div className="tab-content" id="myTabContent">
    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

      <div className="form-group mt-3 mb-3">
        <label>Slug</label>
          <input value={cat.slug} onChange={handleInput} type='text' name='slug' className='form-control' />
          <span className="danger">{err.slug}</span>
        </div>
 <div className="form-group mb-3">
        <label>Name</label>
        <input value={cat.name}  onChange={handleInput} type='text' name='name' className='form-control' />
        <span className="danger">{err.name}</span>
 </div>
 <div className="form-group mb-3">
        <label>Description</label>
        <textarea value={cat.description}  onChange={handleInput} type='text' name='description' className='form-control' />
 </div>
 <div className="form-group mb-3">
        <label>Status</label>
        <input  type='checkbox' name='status'/> 0=show, 1=hidden
 </div>
    </div>

   <div className="tab-pane card-body border fade" id="seotag" role="tabpanel" aria-labelledby="seo-tab">
  <div className="form-group mt-3 mb-3">
        <label>Meta Title</label>
        <input value={cat.meta_title}  onChange={handleInput} type='text' name='meta_title' className='form-control' />
 </div>
 <div className="form-group mb-3">
        <label>Meta Keywords</label>
        <input value={cat.meta_keyword}  onChange={handleInput} type='text' name='meta_keyword' className='form-control' />
 </div>
 <div className="form-group mb-3">
        <label>Meta Description</label>
        <input value={cat.meta_descrip}  onChange={handleInput} type='text' name='meta_description' className='form-control' />
 </div>
 <button  type="submit" className="btn mt-3 btn-primary float-end">Update</button>
   </div>
   </div>
</form>
    </div>)
}
export default EditCategory;