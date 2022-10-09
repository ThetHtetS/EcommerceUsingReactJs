import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const RequireAuth =()=>{
   const [Auth, setAuth]= useState();
   const [load, setLoad]= useState(true);
   let navigate = useNavigate();
   useEffect(() => {
    axios.get('http://localhost/laravel/blog/public/api/checkingAuth').then(res=>{
      
        if(res.status===200){
            setAuth(true);
        }
        else{
            setAuth(false);
        }
        setLoad(false);
    })
    
  },[]);
  
  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
      if(err.response.status===401){
        navigate('/');
      }
      else if (err.response.status === 403){
        navigate('/');
        alert('not admin');
    }
  })


  if (load){
      return <h1>please Wait a second </h1>
  }

    return(<div>
       {Auth ? <Outlet /> :
       <Navigate to='/'/>}
    </div>)
}
export default RequireAuth;