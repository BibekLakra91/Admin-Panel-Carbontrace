import React, { useState, useEffect,useContext } from "react";
import * as USERAPI from "../../api/userApi";
import { CreateNotification } from "../../Utils/notification";
import {
  userContext,
} from "../../context/userContext";

const Dashboard = (props) => {
var  context = useContext(userContext);

  const [error, setError] = useState({});
  const [data, setData] = useState({});


  const isFormValid = () => {
    if (!data.current_password) {
      setError({ current_password: "Current password is required!"});
        return false;
    }
    else if (!data.new_password) {
      setError({ new_password: "New password is required!"});
        return false;
    }
    else if (!data.verify_password) {
      setError({ verify_password: "Verify password is required!"});
        return false;
    }
    else if (data.verify_password != data.new_password) {
      setError({ verify_password: "New password and verify password do not match"});
        return false;
    }
    else {
      setError({});
        return true;
    }

}
  const handleSubmit = async() =>
  {
    const isValid = await isFormValid();

    if(isValid)
    {
      let id = '';
      const Response = await USERAPI.changePwAPI(data);
    
      if(Response.data.status == 200)
      {
        CreateNotification("success",Response.data.message)
        let userData = JSON.parse(localStorage.getItem('userData'));
          if(userData)
          {
            userData.first_name = data.first_name;
            userData.last_name = data.last_name;
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        context.UpdateUserContext({...context.user,first_name:data.first_name,last_name:data.last_name});
      }
      else if(Response.data.status == 401)
      {
      CreateNotification("danger","Session has been expired!")
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
      CreateNotification("danger",Response.data.message)
      }
    }
    
  }

  const getSingleLicence = async() =>
  {
    let id = '';
      const Response = await USERAPI.getSingleClientAPI(id);
    
      if(Response.data.status == 200)
      {
        setData(Response.data.data);
      }
      else if(Response.data.status == 401)
      {
      CreateNotification("danger","Session has been expired!")
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
      CreateNotification("danger","Something went wrong, please try again later!")
      }
     
  }

  const onchange = async(event) =>
  {
    setError({});
   
    const { name, value } = event.target;
    setData(prevState => ({ ...prevState, [name]: value }));
   
  }

  useEffect(async()=>{
    getSingleLicence();
  },[]);

    return (
      <div className="col-12 grid-margin">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Change Password</h4>
   
         
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Current password</label>
                  <div className="col-sm-9">
                    <input type="password" name="current_password"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.current_password}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">New password</label>
                  <div className="col-sm-9">
                    <input type="password" name="new_password" onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.new_password}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Verify password</label>
                  <div className="col-sm-9">
                    <input type="password" name="verify_password" value={data.verify_password} onChange={(e) => {onchange(e)}} className="form-control"/>
                    <span className="form-error">{error.verify_password}</span>

                  
                  </div>
                </div>
              </div>
            </div>
            

            <button type="submit" className="btn btn-primary mr-2" onClick={() => {handleSubmit()}}>Submit</button>
           
        
        </div>
      </div>
    </div>
    );
};

export default Dashboard;