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
    
    
    var regex_email = /^(([^!<>#$%^&*()[\]\\.,;:\s@\"]+(\.[^#$%^&*!<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!data.first_name) {
      setError({ first_name: "First name is required!"});
        return false;
    }
    else if (!data.last_name) {
      setError({ last_name: "Last name is required!"});
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
      const Response = await USERAPI.UpdateProfileAPI(data,id);
    
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
          <h4 className="card-title">Profile update</h4>
   
         
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">First Name</label>
                  <div className="col-sm-9">
                    <input type="text" name="first_name" value={data.first_name} onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.first_name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Last Name</label>
                  <div className="col-sm-9">
                    <input type="text" name="last_name" value={data.last_name} min={1} onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.last_name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="text" name="no_collaborator" value={data.email} className="form-control" readOnly/>
                  
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