import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Forget from "./components/Login/Forget";
import Reset from "./components/Login/Reset";
import Logout from "./components/Login/Logout";

import Dashboard from "./components/Dashboard/Dashboard";

import BeforeLoginRoute from "./components/common/BeforeLoginRoute";
import PrivateRoute from "./components/common/PrivateRoute";
import ScrollToTop from 'react-router-scroll-top';
import './css/custom.css';
import {ReactNotifications} from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Layout from "./components/common/Layout";
import Client from "./components/Client/Client";
import Addclient from "./components/Client/addclient";
import Editclient from "./components/Client/editclient";
import Licences from "./components/Licencing/Licence";
import AddLicence from "./components/Licencing/addLicence";
import EditLicence from "./components/Licencing/editLicence";
import Profile from "./components/Profile/Profile";
import changePassword from "./components/Profile/changePassword";
import Knowledge from "./components/Knowledge/knowledge";
import AddKnowledge from "./components/Knowledge/addKnowledge";
import EditKnowledge from "./components/Knowledge/editKnowledge";
import Category from "./components/Category/Category";
import SubCategory from "./components/SubCategory/SubCategory";


import {
  userContext,
} from "./context/userContext";


const App = (props) => {
  const [user, setUser] = useState({
    first_name:"",
    last_name:"",
    email:"",
    profile_img:""
  });

  useEffect(async()=>{},[]);

  const UpdateUserContext = (data) => {
      
    setUser(data);
  };

  return (
    <userContext.Provider
    value={{
      user: user,
      UpdateUserContext: UpdateUserContext,
    }}
  >
    <Router>
        <ReactNotifications />
       <ScrollToTop>
        <Switch>
            <BeforeLoginRoute
                exact
                path="/login"
                component={Login}
             />
             <BeforeLoginRoute
                exact
                path="/forgot"
                component={Forget}
             />
             <BeforeLoginRoute
              exact
              path="/reset/:user_id/:pw_token"
              component={Reset}
              />
            <Layout location_props={props}>
               
                <PrivateRoute
                  exact
                  path="/"
                  component={Dashboard}
                />
                <PrivateRoute
                  exact
                  path="/profile"
                  component={Profile}
                />
                <PrivateRoute
                  exact
                  path="/change-password"
                  component={changePassword}
                />
                <PrivateRoute
                  exact
                  path="/client"
                  component={Client}
                />
                <PrivateRoute
                  exact
                  path="/add-client"
                  component={Addclient}
                />
                <PrivateRoute
                  exact
                  path="/edit-client/:id"
                  component={Editclient}
                />
                
                <PrivateRoute
                  exact
                  path="/licence"
                  component={Licences}
                />
                <PrivateRoute
                  exact
                  path="/add-licence"
                  component={AddLicence}
                />
                <PrivateRoute
                  exact
                  path="/edit-licence/:id"
                  component={EditLicence}
                />
                <PrivateRoute
                  exact
                  path="/logout"
                  component={Logout}
                />
                <PrivateRoute
                  exact
                  path="/knowledge"
                  component={Knowledge}
                />
                <PrivateRoute
                  exact
                  path="/add-knowledge"
                  component={AddKnowledge}
                />
                <PrivateRoute
                  exact
                  path="/edit-knowledge/:id"
                  component={EditKnowledge}
                />
                <PrivateRoute
                  exact
                  path="/category"
                  component={Category}
                />
                <PrivateRoute
                  exact
                  path="/sub-category"
                  component={SubCategory}
                />
           
            </Layout>
        </Switch>
    </ScrollToTop>
  </Router>
  </userContext.Provider>
  );
}

export default App;
