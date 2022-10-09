
import './App.css';

import { BrowserRouter,Routes, Route} from "react-router-dom";
import Login from './component/Auth/login';
import SignUp from './component/Auth/signup';
import axios from 'axios';
import Admin from './component/admin/admin';
import Dashboard from './component/admin/dashboar';
import Order from './component/admin/order/Order';
import RequireAuth from './component/admin/requireAuth';
import Category from './component/admin/category/AddCategory';
import CategoryList from './component/admin/category/categoryList';
import EditCategory from './component/admin/category/EditCategory';
import AddProduct from './component/admin/product/AddProduct';
import ViewProduct from './component/admin/product/ViewProduct';
import AddCourse from './component/AddCourse';
import AddCourse2 from './component/Addcourse2';
import EditProduct from './component/admin/product/EditProduct';
import UserCategory from './component/User/category';
import UserProduct from './component/User/product';
import CatProduct from './component/User/cat-product';
import { CartProvider } from './component/User/CartContext';
import ViewCart from './component/User/viewCart';
import Checkout from './component/User/checkout';
import Detail from './component/admin/order/detail';
import OrderHistory from './component/admin/order/history';
import Navi from './component/Auth/Nav';
import Home from './component/User/home';
import ProductQty from './component/admin/product/ProductQty';
import Profit from './component/admin/profit/profit';
import Profi from './component/admin/profit/aa';

function App() {
 
  axios.defaults.headers.post['Content-type']='multipart/form-data';
  axios.defaults.headers.post['Accept']='application/json';
  axios.defaults.headers.post['boundary']=" + Math.random().toString().substr(2)";
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(function (config) {
   const token = localStorage.getItem('auth_token');
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;  
  });
  
  return (
   
    <div className="App">


      <Routes>
        <Route path='/' element={<Navi />} >
          <Route path='/home' element={<Home />} />
           <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/category' element={<UserCategory />} />
          <Route path='/cat-product/:slug' element={<CatProduct />} />
          <Route path='/product' element={<UserProduct />} />
          <Route path='/view-cart' element={<ViewCart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
        <Route element={<RequireAuth />}>
        <Route path='/admin' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='order' element={<Order />}/>
          <Route path='category' element={<Category />}/>
          <Route path='categorylist' element={<CategoryList />}/>
          <Route path='edit-category/:id' element={<EditCategory />}/>
          <Route path='add-product' element={<AddProduct />} />
          <Route path='product-qty' element={<ProductQty />} />
          <Route path='view-product' element={<ViewProduct />} />
          <Route path='add-course' element={<AddCourse />}/>
          <Route path='add-course2' element={<AddCourse2 />} />
          <Route path='edit-product/:id' element={<EditProduct />} />
          <Route path='detail/:id' element={<Detail />} />
          <Route path='order-history' element={<OrderHistory />} />
          <Route path='prof' element={<Profi />} />
          <Route path='profit' element={<Profit />} />
        </Route>
        </Route>
        
      </Routes>
     
    </div>
  );
}

export default App;
