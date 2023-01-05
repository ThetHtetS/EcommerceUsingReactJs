import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";


//import { CartContext } from "./CartContext";
import axios from "axios";
const ViewCart =()=>{
    const [cart, setCart]= useState([]);
    const[loading, setLoading]= useState(true);
    
    useEffect(() => {
        axios.get(`http://localhost/laravel/public/api/view-cart`).then(res=>{
        
            if(res.status===200){
              console.log(res.data.cartitem);
                setCart(res.data.cartitem);
               setLoading(false);
            }
             })}, []);

     const handleDecrement=(card_id) =>{
       setCart(cart => cart.map(i => card_id === i.id ? {...i, product_qty: i.product_qty - (i.product_qty >1 ? 1 : 0)}: i));
       updateQuantity(card_id,"dec");
     }
     const handleIncrement=(card_id) =>{
      setCart(cart => cart.map(i => card_id === i.id ? {...i, product_qty: i.product_qty +1}: i));
      updateQuantity(card_id,"inc");
    }

    const updateQuantity = (card_id, scope) =>
     {
      axios.put(`http://localhost/laravel/public/api/cart-updatequantity/${card_id}/${scope}`).then(res=>{
        
        if(res.status===200){
            console.log(res.data.message); 
           
         }
        }
         )
    }
  

    const DeleteItem=(e, id)=>{
        const thisClicked= e.currentTarget;
         axios.post(`http://localhost/laravel/public/api/delete-item/${id}`).then(res=>{

        if(res.status===200){
            alert(res.data.message); 
            thisClicked.remove();
        }
          })}

       if (loading){
             return(<div></div>)
              } 
console.log(cart);

 var prod ='';
 var total= 0;
 prod=    cart.map(i=>{  
 total += i.product.seeling_price * i.product_qty;
        return(
        <div className="border mt-3">
     
      <div className="row mx-auto ">
        <div className="col-md-3 me-md-4 my-2 me-lg-1 px-5" >
           <img src={`http://localhost/laravel/public/${i.product.image}`} className="" alt="image"/>
        </div>
         <div className="col-md-2 my-md-5 py-md-3 px-5">
       <span className="fw-bold"> {i.product.name} </span><br />
         {i.product.Description}
         </div>
       <div className="col-md-2 my-md-5 py-md-3 px-5">
       <span class="align-middle"> $ {i.product.seeling_price}</span>
       </div>
        <div className="col-md-2 my-md-5 py-md-3 px-5">
          <a onClick={(e)=>DeleteItem(e, i.id)}  className="text-c">remove</a>
        </div>
     
     
      <div className="col-md-2 mb-2 my-md-5 py-md-3 px-5" >
        <div className="input-group">
          <button  type="button" onClick={()=> handleDecrement(i.id)} className="input-group-text">-</button>
          <button  type="button" className="input-group-text btn-light-outline">{i.product_qty} </button>
          <button type="button" onClick={()=> handleIncrement(i.id)} className="input-group-text">+</button>
        </div>
      </div>
        </div>
        </div>
        )
    });

    return(
        <div className="container-fluid mt-2 mx-2">
<div className="border"></div>
 <div class="row">
{prod}
</div>
<div> <h1 className="float-start">total= {total}</h1> <Link to='/checkout' type="button" className="btn btn-success float-end mt-2">Proceed to Checkout</Link></div>

</div>
    )
}
export default ViewCart;