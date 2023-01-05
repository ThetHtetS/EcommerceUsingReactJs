import react, {useState, useEffect} from "react";
import logo from '../logo/logo.jpg';
import { Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

const Navi =()=>{
  const [input, setInput]= useState(   { 
    'search': '',
   } );
    
   const [category, setCategory]= useState([]);

   useEffect(() => {
       axios.get('http://localhost/laravel/public/api/view-category').then(res=>{
           
           if(res.status===200){
            
               setCategory(res.data.category);
           } 
         }) },[]);

   const[loading, setLoading]= useState(false);


   const [product, setProduct]=useState( [{   'category_id': '',
   "slug": '',
   'name':'',
   'description':'',

   'meta_title':'',
   'meta_keyword':'',
   'meta_description':'',

   'seeling_price': '',
   'original_price':'',
   'qty':'',
   'image':'',
  
   'brand':'',
   
   'featured': '',
   'popular': '',
   'status':'',
}]);

  const handleSearch =(e)=>{
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setInput({...input, [name] : value});
   
  }
console.log(input);

const submit=(e)=>{
  e.preventDefault();

  axios.get('http://localhost/laravel/public/sanctum/csrf-cookie').then(response => {
    axios.post('http://localhost/laravel/public/api/search', input)
    .then(function (response) {
      if(response.data.status ===200){
        //console.log(response.data.result);
    setProduct(response.data.result);
    setLoading(true);
      }
      else {
        console.log("error")
        //console.log(response)
      }
    })
});

}

  let navigate = useNavigate();
  
    const logOut =e =>{
        e.preventDefault();
        axios.post('http://localhost/laravel/blog/public/api/logout')
        .then(function (response) {
          if(response.data.status === 200){
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_name');
            alert(response.data.message);
            navigate('/');
          }
         
        })
   
    }

    var prod ='';
if(loading){
prod =  product.map((i)=> {return(
 <div className="col-md-4 col-6 col-lg-3">
     <div className="card bordered mt-3  bg-light pt-2 ">
     <img src={`http://localhost/laravel/blog/public/${i.image}`} className="mx-auto" alt="image"/>

     <div class="card-body mx-auto">
        <div className=" category"> {i.name} <span>${i.seeling_price}</span> </div> 
        <span> <button className="btn btn-outline-warning">Add to cart</button> </span>
     </div>
     </div>
 </div> 
)}
)
}

    var authbuttons= '';
    if(!localStorage.getItem('auth_token'))
    {
        authbuttons = (
            <div>
                <Link to="/login" className="nav-link">Login</Link>   
                <Link to="/signup" className="navlink"><button className="btn btn-primary">SignUp</button> </Link>   
            </div>
           )
    }
    else{
        authbuttons=(
        <Link to="/signup" className="signup"><button onClick={logOut} className="btn btn-danger">log Out</button> </Link> 
        )
    }

    return(
      <div>
       <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
  <div class="container-fluid">
    <Link to='/' className="navbar-brand"><img className="logo" src={logo}/> </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
     
       <ul className="navbar-nav ">
      <li className="nav-link active">
      <Link to='/home' className="nav-link">Home</Link> 
      </li>
      <li className="nav-link active">
    <Link to='/category' className="nav-link">Collection</Link> 
      
      </li>
     
        </ul>
      
        <ul className="navbar-nav ms-auto">
      <li className="nav-link active">
      <Link to='/view-cart' className="nav-link">Cart</Link> 
      </li>
      <li className="nav-link active">
          {authbuttons}
      
      </li>
        </ul>
     
    </div>
  </div>
</nav>
<section className="search-bar">
<div  className="container mt-3 "> 
    <div className="row">
     <div className="col-lg-8 mx-auto ">
      <form onChange={submit}>
        <div>
          <div className="input-group shadow-sm">
          <div className="input-group-append">
              <div className="btn-group">
              
              <select onChange={handleSearch} value={input.category_id} name='category_id' className="form-select btn btn-light " aria-label="Default select example">
  <option selected>All</option>
 { category.map((i)=>{
          return( <option value={i.id}>{i.name}</option>
         )
      })}
</select>
                
              </div>
            </div>

            <input type='search' placeholder="Search Products..." name="search" onChange={handleSearch} className="form-control"/>
            <div className="input-group-append">
              
          <button type="submit" onClick={submit} className="btn btn-light">Search</button>
         
             </div>
         
        </div>
        </div>
      </form>
     </div>
   </div>
</div>
</section>
<div>
   
<div className="row">
   {prod}

   </div>

</div>
     <div>

        <Outlet />
     </div> 
</div>
    )

}
export default Navi;