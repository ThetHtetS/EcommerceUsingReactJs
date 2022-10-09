import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Checkout = ()=>{
    const [input, setInput]= useState(   { 
      'name': '',
      'address': '',
      'city': '',
      'phone': '',
    'email': '',
    'state': ''

     } );
    const handleInput =(e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
  
        setInput({...input, [name]: value});
    
      }

      const[loading, setLoading]= useState(true);
      const [cart, setCart]= useState([]);
    useEffect(() => {
 
      axios.get(`http://localhost/laravel/blog/public/api/view-cart`).then(res=>{
      
          if(res.status===200){
          
              console.log(res.data.cartitem); 
              setCart(res.data.cartitem);
             setLoading(false);
          }
      
      })  
     
    }, []);

      const[err, setErr]= useState({});
      const handleSubmit=(e)=>{
        e.preventDefault();

        axios.get('http://localhost/laravel/blog/public/sanctum/csrf-cookie').then(response => {
          axios.post('http://localhost/laravel/blog/public/api/checkout', input)
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
if(loading){
  return(<div></div>)
}
      
 var prod ='';
 var total= 0;
 let no=0;
 prod=    cart.map(i=>{  
          total += i.product.seeling_price * i.product_qty;
        return(
          <tr key={i.id} className="align-middle">
          <th scope="row">{no=no + 1}</th>
          <td>{i.product.name}</td>
        
       <td>{i.product_qty}</td>
       <td>{i.product.seeling_price}</td>
       <td>{i.product.seeling_price * i.product_qty}</td>
          </tr>
          

        )
    });

    return(
        <div className="row container-fluid pt-4  px-4">
      <div className="card col-md-6 mx-auto shodow mb-2 ">
            <h2 className=" card-header mt-4">billing / shipping <Link to='/view-cart'  className="btn btn-primary float-end">View Cart</Link></h2>
            
    
   <div className="card-body">
   <form onSubmit={handleSubmit}>
 <div className="form-group mb-3">
        <label>Name</label>
        <input onChange={handleInput} type='text' name='name' className='form-control' />
        <span className="danger"></span>
 </div>
 <div className="form-group mb-3">
        <label>Address</label>
        <input onChange={handleInput} type='text' name='address' className='form-control' />
        <span className="danger"></span>
 </div>
 <div className="form-group mb-3">
        <label>Town / City</label>
        <input onChange={handleInput} type='text' name='city' className='form-control' />
        <span className="danger"></span>
 </div>
 <div className="form-group mb-3">
 <label>State / region </label>
 <select onChange={handleInput} name='state' class="form-select" aria-label="Default select example">
  <option selected>Mandalay</option>
  <option selected>Yangon</option>

</select>
 </div>
 <div className="form-group mb-3">
        <label>Phone</label>
        <input onChange={handleInput} type='text' name='phone' className='form-control' />
        <span className="danger"></span>
 </div>
 <div className="form-group mb-3">
        <label>Email address</label>
        <input onChange={handleInput} type='text' name='email' className='form-control' />
        <span className="danger"></span>
 </div>

 <button  type="submit" className="btn mt-3 btn-primary float-end">Place Order</button>
</form>
</div>
</div>
<div className="col-md-6 ps-5 shadow">
<div className="mx-auto mt-5  my-2"><h3 className="mx-auto">Your Orders</h3></div>
       <table className="table table-bordered table-light table-hover">          
         <thead>
           <tr>
             <th scope="col">No.</th>
             <th scope="col">Name</th>
             <th scope="col">qty</th>
             <th scope="col">price</th>
             <th scope="col">total</th>
           </tr>
         </thead>
         <tbody className="table-hover">
          {prod}
          <tr>
            <td colspan='3' className="text-end">grand total</td>
            <td colspan="2"className="text-end">{total}</td>
          </tr>
         </tbody>
         </table>

</div>
</div>
    )

}
export default Checkout;