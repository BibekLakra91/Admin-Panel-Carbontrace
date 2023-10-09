import React, { useState, useEffect,useContext } from "react";
import {
  userContext,
} from "../../context/userContext";
import { Link} from "react-router-dom";
import $ from "jquery";
const Header = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({email:'',password:''});
  var  context = useContext(userContext)


  useEffect(async()=>{
    let user_data =  JSON.parse(localStorage.getItem('userData'));
    console.log(user_data,'user_data');
    if(user_data)
    {
      context.UpdateUserContext(user_data);

    }
  },[]);

  const handleLogout = async() => {
     localStorage.clear();
    window.location.href = "/login";


  }

  const onToggleSidebar = async() => {
    
      $("body").toggleClass("sidebar-icon-only");
  
   }
    return (
 <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
 <div className="navbar-brand-wrapper d-flex justify-content-center">
   <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">  
     <Link className="navbar-brand brand-logo" to="/"><b>Super Admin</b></Link>
     <Link className="navbar-brand brand-logo-mini" to="/"><b>SA</b></Link>
     <button className="navbar-toggler navbar-toggler align-self-center"  onClick={() =>{onToggleSidebar()}}>
       <span className="mdi mdi-sort-variant" />
     </button>
   </div>  
 </div>
 <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
   <ul className="navbar-nav mr-lg-4 w-100">
     {/* <li className="nav-item nav-search d-none d-lg-block w-100">
       <div className="input-group">
         <div className="input-group-prepend">
           <span className="input-group-text" id="search">
             <i className="mdi mdi-magnify" />
           </span>
         </div>
         <input type="text" className="form-control" placeholder="Search now" aria-label="search" aria-describedby="search" />
       </div>
     </li> */}
   </ul>
   <ul className="navbar-nav navbar-nav-right">
     {/* <li className="nav-item dropdown mr-1">
       <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
         <i className="mdi mdi-message-text mx-0" />
         <span className="count" />
       </a>
       <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="messageDropdown">
         <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
         <a className="dropdown-item">
           <div className="item-thumbnail">
             <img src="/assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
           </div>
           <div className="item-content flex-grow">
             <h6 className="ellipsis font-weight-normal">David Grey
             </h6>
             <p className="font-weight-light small-text text-muted mb-0">
               The meeting is cancelled
             </p>
           </div>
         </a>
         
       </div>
     </li>
     <li className="nav-item dropdown mr-4">
       <a className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center notification-dropdown" id="notificationDropdown" href="#" data-toggle="dropdown">
         <i className="mdi mdi-bell mx-0" />
         <span className="count" />
       </a>
       <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
         <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
         <a className="dropdown-item">
           <div className="item-thumbnail">
             <div className="item-icon bg-success">
               <i className="mdi mdi-information mx-0" />
             </div>
           </div>
           <div className="item-content">
             <h6 className="font-weight-normal">Application Error</h6>
             <p className="font-weight-light small-text mb-0 text-muted">
               Just now
             </p>
           </div>
         </a>
         <a className="dropdown-item">
           <div className="item-thumbnail">
             <div className="item-icon bg-warning">
               <i className="mdi mdi-settings mx-0" />
             </div>
           </div>
           <div className="item-content">
             <h6 className="font-weight-normal">Settings</h6>
             <p className="font-weight-light small-text mb-0 text-muted">
               Private message
             </p>
           </div>
         </a>
         <a className="dropdown-item">
           <div className="item-thumbnail">
             <div className="item-icon bg-info">
               <i className="mdi mdi-account-box mx-0" />
             </div>
           </div>
           <div className="item-content">
             <h6 className="font-weight-normal">New user registration</h6>
             <p className="font-weight-light small-text mb-0 text-muted">
               2 days ago
             </p>
           </div>
         </a>
       </div>
     </li> */}
     <li className="nav-item nav-profile dropdown">
       <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
         <img src={`${process.env.REACT_APP_API_URL}/uploads/${context.user.profile_img}`} alt="profile" />
         <span className="nav-profile-name">{context.user.first_name} {context.user.last_name}</span>
       </a>
       <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
       <Link className="dropdown-item" to="/profile">
           <i className="mdi mdi-account text-primary" />
           Profile
         </Link>
         <Link className="dropdown-item" to="/change-password">
           <i className="mdi mdi-settings text-primary" />
           Settings
         </Link>
         <Link className="dropdown-item"  onClick={() =>{handleLogout()}}>
           <i className="mdi mdi-logout text-primary" />
           Logout
         </Link>
       </div>
     </li>
   </ul>
   <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
     <span className="mdi mdi-menu" />
   </button>
 </div>
</nav>
  );
};

export default Header;