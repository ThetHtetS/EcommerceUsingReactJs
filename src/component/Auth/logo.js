import react from "react";
import logo from '../logo/logo.jpg';
import { Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

const Logo =()=>{
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

    var authbuttons= '';
    if(!localStorage.getItem('auth_token'))
    {
        authbuttons = (
            <div>
                <Link to="/login" className="login">Login</Link>   
                <Link to="/signup" className="signup"><button className="btn btn-primary">SignUp</button> </Link>   
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
        <div className="logo">
          
           <div>
                <Link to='/' ><img  src={logo}/> </Link>
           </div>
           <form className="d-flex search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  
    <div className="login">
    <Link to='/home' className="text">Home</Link> 
    <Link to='/category' className="text">Collection</Link> 
    <Link to='/view-cart' className="text">Cart</Link> 
      {authbuttons}
    </div>
       
</div>
     <div>
        <Outlet />
     </div> 
</div>
    )

}
export default Logo;