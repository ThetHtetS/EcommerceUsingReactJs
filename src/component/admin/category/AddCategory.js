import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Category= ()=>{
    const [input, setInput]= useState(
        {
            "slug": '',
            'name':'',
            'description':'',
            'meta_title':'',
            'meta_keyword':'',
            'meta_description':''

        }
       );
  const[err, setErr]= useState({});
 
    const handleInput =(e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
  
        setInput({...input, [name]: value});
    
      }
      console.log(input);

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.get('http://localhost/laravel/public/sanctum/csrf-cookie').then(response => {
      axios.post('http://localhost/laravel/public/api/add-category', input)
      .then(function (response) {
        if(response.data.status ===200){
          alert(response.data.message);
        }
        else{
          setErr(response.data.message);
        
        }
      })
  });

  }

    return(<div className="container-fluid px-4">
      <div className="card">
            <h2 className=" card-header mt-4">Add Category  <Link to='/admin/categorylist'  className="btn btn-primary float-end">View Category</Link></h2>
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
          <input onChange={handleInput} type='text' name='slug' className='form-control' />
          <span className="danger">{err.slug}</span>
        </div>
 <div className="form-group mb-3">
        <label>Name</label>
        <input onChange={handleInput} type='text' name='name' className='form-control' />
        <span className="danger">{err.name}</span>
 </div>
 <div className="form-group mb-3">
        <label>Description</label>
        <textarea onChange={handleInput} type='text' name='description' className='form-control' />
 </div>
 <div className="form-group mb-3">
        <label>Status</label>
        <input type='checkbox' name='status'/> 0=show, 1=hidden
 </div>
    </div>

   <div className="tab-pane card-body border fade" id="seotag" role="tabpanel" aria-labelledby="seo-tab">
  <div className="form-group mt-3 mb-3">
        <label>Meta Title</label>
        <input onChange={handleInput} type='text' name='meta_title' className='form-control' />
 </div>
 <div className="form-group mb-3">
        <label>Meta Keywords</label>
        <input onChange={handleInput} type='text' name='meta_keyword' className='form-control' />
 </div>
 <div className="form-group mb-3">
        <label>Meta Description</label>
        <input onChange={handleInput} type='text' name='meta_description' className='form-control' />
 </div>
 <button  type="submit" className="btn mt-3 btn-primary float-end">Submit</button>
   </div>
</div>
</form>
</div>
</div>)
}
export default Category;