import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
const Sidebar = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({email:'',password:''});


  useEffect(async()=>{

  },[]);
console.log(props.location_props.location.pathname,'pathname');
    return (
 <nav className="sidebar sidebar-offcanvas" id="sidebar">
 <ul className="nav">
   <li className={props.location_props.location.pathname == '/' ?"nav-item active":"nav-item"}>
     <Link className="nav-link" to="/">
       <i className="mdi mdi-home menu-icon" />
       <span className="menu-title">Dashboard</span>
     </Link>
   </li>
   <li className={(props.location_props.location.pathname == '/client' || props.location_props.location.pathname == '/add-client') ?"nav-item active":"nav-item"}>
     <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
       <i className="mdi mdi-account menu-icon" />
       <span className="menu-title">Client</span>
       <i className="menu-arrow" />
     </a>
     <div className="collapse" id="ui-basic">
       <ul className="nav flex-column sub-menu">
         <li className="nav-item"> <Link className={props.location_props.location.pathname == '/client' ?"nav-link active":"nav-link"} to="/client">Client List</Link></li>
         <li className="nav-item"> <Link className={props.location_props.location.pathname == '/add-client' ?"nav-link active":"nav-link"} to="/add-client">Add Client</Link></li>
       </ul>
     </div>
   </li>
   <li className={(props.location_props.location.pathname == '/category')?"nav-item active":"nav-item"}>
     <Link className="nav-link" to="/category">
       <i className="mdi mdi-format-list-bulleted menu-icon" />
       <span className="menu-title">Category</span>
     </Link>
   </li>
   <li className={(props.location_props.location.pathname == '/sub-category')?"nav-item active":"nav-item"}>
     <Link className="nav-link" to="/sub-category">
       <i className="mdi mdi-format-list-bulleted-type menu-icon" />
       <span className="menu-title">Subcategory</span>
     </Link>
   </li>
   <li className={(props.location_props.location.pathname == '/knowledge' || props.location_props.location.pathname == '/add-knowledge') ?"nav-item active":"nav-item"}>
     <a className="nav-link" data-toggle="collapse" href="#ui-knowledge" aria-expanded="false" aria-controls="ui-knowledge">
       <i className="mdi mdi-information menu-icon" />
       <span className="menu-title">Knowledge Base</span>
       <i className="menu-arrow" />
     </a>
     <div className="collapse" id="ui-knowledge">
       <ul className="nav flex-column sub-menu">
         <li className="nav-item"> <Link className={props.location_props.location.pathname == '/knowledge' ?"nav-link active":"nav-link"} to="/knowledge">Knowledge Base</Link></li>
         <li className="nav-item"> <Link className={props.location_props.location.pathname == '/add-knowledge' ?"nav-link active":"nav-link"} to="/add-knowledge">Add Knowledge</Link></li>
       </ul>
     </div>
   </li>
   {/* <li className={props.location_props.location.pathname == '/knowledge' ?"nav-item active":"nav-item"}>
     <Link className="nav-link" to="/">
       <i className="mdi mdi-information menu-icon" />
       <span className="menu-title">Knowledge</span>
     </Link>
   </li> */}
   <li className={(props.location_props.location.pathname == '/licence' || props.location_props.location.pathname == '/add-licence') ?"nav-item active":"nav-item"}>
     <a className="nav-link" data-toggle="collapse" href="#ui-basic1" aria-expanded="false" aria-controls="ui-basic1">
       <i className="mdi mdi-circle-outline menu-icon" />
       <span className="menu-title">Licencing</span>
       <i className="menu-arrow" />
     </a>
     <div className="collapse" id="ui-basic1">
       <ul className="nav flex-column sub-menu">
         <li className="nav-item"> <Link className={props.location_props.location.pathname == '/licence' ?"nav-link active":"nav-link"} to="/licence">Licence List</Link></li>
         <li className="nav-item"> <Link className={props.location_props.location.pathname == '/add-licence' ?"nav-link active":"nav-link"} to="/add-licence">Add Licence</Link></li>
       </ul>
     </div>
   </li>
   {/* <li className={(props.location_props.location.pathname == '/licence' || props.location_props.location.pathname == '/add-licence') ?"nav-item active":"nav-item"}>
     <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
       <i className="mdi mdi-circle-outline menu-icon" />
       <span className="menu-title">Licencing</span>
       <i className="menu-arrow" />
     </a>
     <div className="collapse" id="auth">
       <ul className="nav flex-column sub-menu">
       <li className="nav-item"> <Link className="nav-link" to="/licence">Licence List</Link></li>
         <li className="nav-item"> <Link className="nav-link" to="/add-licence">Add Licence</Link></li>
       </ul>
     </div>
   </li> */}
   {/* <li className="nav-item">
     <a className="nav-link" href="pages/forms/basic_elements.html">
       <i className="mdi mdi-view-headline menu-icon" />
       <span className="menu-title">Form elements</span>
     </a>
   </li>
   <li className="nav-item">
     <a className="nav-link" href="pages/charts/chartjs.html">
       <i className="mdi mdi-chart-pie menu-icon" />
       <span className="menu-title">Charts</span>
     </a>
   </li>
   <li className="nav-item">
     <a className="nav-link" href="pages/tables/basic-table.html">
       <i className="mdi mdi-grid-large menu-icon" />
       <span className="menu-title">Tables</span>
     </a>
   </li>
   <li className="nav-item">
     <a className="nav-link" href="pages/icons/mdi.html">
       <i className="mdi mdi-emoticon menu-icon" />
       <span className="menu-title">Icons</span>
     </a>
   </li>
  
   <li className="nav-item">
     <a className="nav-link" href="documentation/documentation.html">
       <i className="mdi mdi-file-document-box-outline menu-icon" />
       <span className="menu-title">Documentation</span>
     </a>
   </li> */}
 </ul>
</nav>
  );
};

export default Sidebar;