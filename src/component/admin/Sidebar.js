import React from "react";
import {Link, Outlet} from 'react-router-dom';
const Sidebar =()=>{
    return(
  
<div className="container-fluid">
  <div className="row">
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to='dashboard' className="nav-link active" aria-current="page">
              <span data-feather="home"></span>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to='order' className="nav-link">
              <span data-feather="file"></span>
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to='category' className="nav-link">
              <span data-feather="file"></span>
             Add Category
            </Link>
          </li>
          <li className="nav-item">
            <Link to='categorylist' className="nav-link">
              <span data-feather="file"></span>
             Category List
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/add-product' className="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
             Add Product
            </Link>
            </li>
          <li className="nav-item">
            <Link to='/admin/view-product' className="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
            View Product
            </Link>
          </li>
          <li className="nav-item">
            <Link to='product-qty' className="nav-link" href="#">
              <span data-feather="users"></span>
             Product Qty
            </Link>
          </li>
          <li className="nav-item">
            <Link to='profit' className="nav-link" href="#">
              <span data-feather="users"></span>
             Profits
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="bar-chart-2"></span>
              Reports
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="layers"></span>
              Integrations
            </a>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Last quarter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Social engagement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </a>
          </li>
        </ul>
      </div>
    </nav>
 </div>
 
 
 
 
 </div>
    );

}
export default Sidebar;