import {React, useState} from "react";
import axios from 'axios';
const SignUp =()=>{

  const [input, setInput]= useState(
  {  'name': '',
    'email': '' ,
    'password': '',
    'err_list': []
  });

  const handleInput =(e)=>{
 
    setInput({...input, [e.target.name]: e.target.value });
         
  }
  console.log(input);
 const signUp =(e)=>{
   e.preventDefault();
   axios.get('http://localhost/laravel/public/sanctum/csrf-cookie').then(response => {
    axios.post('http://localhost/laravel/public/api/register', input)
    .then(function (response) {
      if(response.data.status ===200){
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_name', response.data.username);
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
         <div className="card mt-3 col-6">
         <div className="card-header">SignUp</div>
          <div className="card-body">
          <form className="loginform">
                           
  <div className="mb-3 ">
    <label for="exampleInputEmail1" className="form-label ">Name</label>
    <input name="name" onChange={handleInput} className="form-control"  aria-describedby="emailHelp" />
    <span className="danger">{input.err_list.name}</span>
  </div>

  <div className="mb-3 ">
    <label for="exampleInputEmail1" className="form-label ">Email address</label>
    <input name="email" onChange={handleInput} type="email" className="form-control" aria-describedby="emailHelp" />
    <span className="danger">{input.err_list.email}</span>
  </div>
  <div className="mb-3 ">
    <label for="exampleInputPassword1" className="form-label">Password</label>
  
    <input name="password" onChange={handleInput} type="password" className="form-control" id="exampleInputPassword1"/>
    <span className="danger">{input.err_list.password}</span>
  </div>

  <button onClick={signUp} type="submit" className="btn btn-primary">SignUp</button>
  
</form>
</div>
</div>
</div>  
    )
}
export default SignUp;