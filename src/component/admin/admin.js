import React from "react";
import { BrowserRouter,Routes, Route, Outlet} from "react-router-dom";
import Dashboard from "./dashboar";
import './dashboard.css';
//import './dashboard.js';
import './dashboard.rtl.css';
import Nav from "./Nav";
import Sidebar from "./Sidebar";
const Admin =()=>{
    return(
        <div>
            <Nav />
        
            <Sidebar />
                
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
     
     <Outlet />
    </main>
        
            
        </div>
    )
}
export default Admin;