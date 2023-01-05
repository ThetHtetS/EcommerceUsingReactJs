import {React, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login =()=>{
  const [input, setInput]= useState(
   {
    
    'email': '' ,
    'password': '',
    'err_list': []
   } 
  );

    const handleInput =(e)=>{
      const target = e.target;
      const value = target.value;
      const name = target.name;

      setInput({...input, [name]: value});
  
    }
    let navigate = useNavigate();
  
    const handleLogin = e =>{
   
      const data={ 'email': input.email,
                   'password': input.password
    }
      e.preventDefault();
      axios.get('http://localhost/laravel/public/sanctum/csrf-cookie').then(response => {
        axios.post('http://localhost/laravel/public/api/login', data)
        .then(function (response) {
          if(response.data.status ===200){
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user_name', response.data.username);
            localStorage.setItem('user_id', response.data.id);
            alert(response.data.message);
            if(response.data.role=== 'admin'){
              navigate('/admin');
            }
          else{
            navigate('/');
         }
          }
          else if(response.data.status=== 401){
            alert(response.data.message);
          }
          else{
            setInput({...input, err_list : response.data.validation_error});
            console.log(input.err_list);
          }
        })
    });
      
    }

    return(
        <div className="row justify-content-center">
         <div className="card mt-5 col-6">
         <div className="card-header">Login</div>
          <div className="card-body">
          <form className="loginform">
              
  <div className="mb-3 ">
    <label for="exampleInputEmail1" className="form-label ">Email address</label>
    <input name="email" onChange={handleInput} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <span className="danger">{input.err_list.email}</span>
  </div>
  <div className="mb-3 ">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input name="password" onChange={handleInput} type="password" className="form-control" id="exampleInputPassword1"/>
    <span className="danger">{input.err_list.password}</span>
  </div>
 
  <button onClick={handleLogin} type="submit" className="btn btn-primary">Login</button>
  
</form>
</div>
</div>
</div>  
    )
}
export default Login;