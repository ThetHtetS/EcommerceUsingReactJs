import React, {useState, useEffect} from "react";
import {  useParams, Link } from "react-router-dom";
import axios from "axios";
const EditProduct =()=>{
   

   const [loading, setLoading]= useState(true); 
const [input, setInput]= useState(
    {   'category_id': '',
        "slug": '',
        'name':'',
        'description':'',

        'meta_title':'',
        'meta_keyword':'',
        'meta_description':'',

        'seeling_price': '',
        'original_price':'',
        'qty':'',
       
        'brand':'',
        
        'featured': '',
        'popular': '',
        'status':'',
    }
   );
const [picture, setPicture]=useState({
  image: []
});
const handleChangeFile = e => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    createImage(files[0]);
  };

 const createImage = file => {
    let reader = new FileReader();
    reader.onload = e => {
      setPicture({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

    const [err, setErr]= useState({});
     let params = useParams();
     const id= params.id;
   
    useEffect(() => {
     axios.get(`http://localhost/laravel/public/api/edit-product/${id}`).then(res=>{
        if(res.status===200){
        setInput(res.data.product);
        setLoading(false);
        } 
         })  },[]);

        
     const [category, setCategory]= useState([]);
      useEffect(() => {
      axios.get('http://localhost/laravel/public/api/categorylist').then(res=>{
          
          if(res.status===200){
           
              setCategory(res.data.category);
              
          } 
        }) },[]);
    
    const handleInput =(e)=>
        {
          const target = e.target;
          const value = target.value;
          const name = target.name;
          setInput({...input, [name]: value});
         }
       
    const handleSubmit=(e)=>
    {  e.preventDefault();
        const Data = { 
            image: picture.image,
            category_id:input.category_id,
            slug:   input.slug,
            name: input.name,
            description:      input.description,
           meta_title:       input.meta_title,
            meta_keyword:    input.meta_keyword,
           meta_description: input.meta_description,
           seeling_price:     input.seeling_price,
           original_price: input.original_price,
           qty: input.qty,
           brand: input.brand,
           featured:input.featured,
           popular:input.popular,
           status:input.status,
            };
       
        axios.post(`http://localhost/laravel/public/api/edit-product/${id}`, Data ).then(res=>{  
          if(res.data.status===200)
          {
         alert(res.data.message); 
          } 
          else{
            alert('Some fields are needed');
            setErr(res.data.message);
          }
          })  
    }
    
    if(loading){
        return(<div>loading</div>)
    }
return(
    <div className="container-fluid card px-4">
    <h2 className="mt-4 card-header">Add Product <Link to='/admin/view-product'  className="btn btn-primary float-end">View Product</Link></h2>
<form encType="multipart/form-data" onSubmit={handleSubmit}>
    <ul className="nav nav-tabs" id="myTab" role="tablist">
<li className="nav-item" role="presentation">
<button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
</li>
<li className="nav-item" role="presentation">
<button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seotag" type="button" role="tab" aria-controls="seo-tag" aria-selected="false">Seo Tag</button>
</li>
<li className="nav-item" role="presentation">
<button className="nav-link" id="detail-tab" data-bs-toggle="tab" data-bs-target="#detail" type="button" role="tab" aria-controls="detail" aria-selected="false">Others detail</button>
</li>
</ul>
<div className="tab-content" id="myTabContent">
<div className="tab-pane card-body border fade mb-4 show active" id="home" role="tabpanel" aria-labelledby="home-tab">

<div className="form-group mt-3 mb-3">
<select onChange={handleInput} value={input.category_id} name='category_id' class="form-select" aria-label="Default select example">
<option selected>Select Category</option>
{ category.map((i)=>{
  return( <option value={i.id}>{i.name}</option>
 )
})}
</select>
</div>
<div className="form-group mb-3">

<label>Slug</label>
  <input onChange={handleInput} type='text' name='slug' value={input.slug} className='form-control' />
  <span className="danger">{err.slug}</span>
</div>
<div className="form-group mb-3">
<label>Name</label>
<input onChange={handleInput} type='text' name='name' value={input.name}  className='form-control' />
<span className="danger">{err.name}</span>
</div>
<div className="form-group mb-3">
<label>Description</label>
<textarea onChange={handleInput} type='text' name='description' value={input.description} className='form-control' />
</div>
</div>
<div className="tab-pane card-body border fade mb-4" id="seotag" role="tabpanel" aria-labelledby="seo-tab">
<div className="form-group mt-3 mb-3">
<label>Meta Title</label>
<input onChange={handleInput} type='text' name='meta_title' value={input.meta_title} className='form-control' />
</div>
 <div className="form-group mb-3">
    <label>Meta Keywords</label>
    <input onChange={handleInput} type='text' name='meta_keyword' value={input.meta_keyword} className='form-control' />
</div>
<div className="form-group mb-3">
    <label>Meta Description</label>
    <input onChange={handleInput} type='text' name='meta_description' value={input.meta_description} className='form-control' />
</div>
</div>
<div className="tab-pane card-body border fade" id="detail" role="tabpanel" aria-labelledby="detail-tab">
<div className="row">
<div className="form-group col-md-4 mb-3">
<label>Selling Price</label>
<input onChange={handleInput} type='text' name='seeling_price' value={input.seeling_price} className='form-control' />
<span className="danger">{err.seeling_price}</span>
</div>
<div className="form-group col-md-4 mb-3">
<label>Original Price</label>
<input onChange={handleInput} type='text' name='original_price' value={input.original_price} className='form-control' />
<span className="danger">{err.original_price}</span>
</div>
<div className="form-group col-md-4 mb-3">
<label>Qty</label>
<input onChange={handleInput} type='text' name='qty' value={input.qty} className='form-control' />
<span className="danger">{err.qty}</span>
</div>
<div className="form-group col-md-4 mb-3">
<label>Brand</label>
<input onChange={handleInput} type='text' name='brand' value={input.brand} className='form-control' />
<span className="danger">{err.brand}</span>
</div>
<div className="form-group col-md-8 mb-3">
<label>Image</label>
<input onChange={handleChangeFile} type='file' name='image' className='form-control' />
<span className="danger">{err.image}</span>
</div>
<div className="form-group col-md-4 mt-2 mb-2">
<label>Featured (Checked = shown)</label>
<input className="ms-2" onChange={handleInput} type='checkbox' value={input.featured} name='featured' />
</div>
<div className="form-group col-md-4 mt-2 mb-2">
<label>Popular(Checked= shown)</label>
<input className="ms-2" onChange={handleInput} type='Checkbox' value={input.popular} name='popular'  />
</div>
<div className="form-group col-md-4 mt2 mb-2">
<label >Status (Checked= hidden)</label> 
<input className="ms-2" onChange={handleInput} type='checkbox' value={input.status} name='status' />
</div>
</div>
<button  type="submit" className="btn mt-3 btn-primary float-end">Submit</button>
</div>
</div>
</form>
</div>
)
       
}
export default EditProduct;