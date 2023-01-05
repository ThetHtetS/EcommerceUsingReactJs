import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import { CartContext } from "./CartContext";
import axios from "axios";
const Home =()=>{
    const [cart, setCart]= useState([]);
    const[loading, setLoading]= useState(true);
    
    useEffect(() => {
        axios.get(`http://localhost/laravel/public/api/view-cart`).then(res=>{
        
            if(res.status===200){
              
                setCart(res.data.cartitem);
               setLoading(false);
            }
             })}, []);

       if (loading){
             return(<div>loading...</div>)
              } 

console.log(cart);

    return(
       <div>
            {cart.map(i=> {
                return(
                    <div>
                        {i.product_qty}
                    
                         </div>
                )
            })}
        
       </div>


    )
}
export default Home;