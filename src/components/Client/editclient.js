import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
import { CreateNotification } from "../../Utils/notification";
import { Link} from "react-router-dom";

const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [category, setCategory] = useState({});
  const [licence, setLicence] = useState({});

  const isFormValid = () => {
    const domain_regx = /^[A-Za-z0-9-]+$/;
    
    var regex_email = /^(([^!<>#$%^&*()[\]\\.,;:\s@\"]+(\.[^#$%^&*!<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!data.licence_type)
    {
      setError({ licence_type: "licence type is required!"});
      return false;
    }
    else if (!data.subdomain) {
      setError({ subdomain: "Subdomain is required!"});
        return false;
    }
    else if (!data.subdomain.match(domain_regx)) {
      setError({ subdomain: "Enter a valid Subdomain (Without any space and special character)"});
      CreateNotification("danger","Please enter a valid Subdomain!")
      return false;
    }
    else if (!data.first_name) {
      setError({ first_name: "First name is required!"});
        return false;
    }
    else if (!data.last_name) {
      setError({ last_name: "Last name is required!"});
        return false;
    }
    else if (!data.email) {
      setError({ email: "Email is required!"});
        return false;
    }
    else if (data.email && !data.email.match(regex_email)) {
      setError({email: "Enter a valid email" });
      CreateNotification("danger","Please enter a valid email!")
        return false;
    }
    else if (!data.phone) {
      setError({ phone: "Phone no. is required!"});
        return false;
    }
    else if (!data.category) {
      setError({ category: "Category is required!"});
        return false;
    }
    else if (!data.company) {
      setError({ company: "Company Name is required!"});
        return false;
    }
    else if (!data.bio) {
      setError({ bio: "Company bio is required!"});
        return false;
    }
    // else if (!data.no_facility) {
    //   setError({ no_facility: "facility is required!"});
    //     return false;
    // }
    else {
      setError({});
        return true;
    }

}
  const handleSubmit = async() =>
  {
    const isValid = await isFormValid();
    console.log(props.history,'121212')
    if(isValid)
    {
      let id = props.match.params.id;
      const Response = await USERAPI.UpdateClientAPI(data,id);
      if(Response.data.status == 200 )
      {
        CreateNotification("success",Response.data.message)

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
    
      // props.history.push('/')
  }

  const getSingleCLient = async() =>
  {
    let id = props.match.params.id;
      const Response = await USERAPI.getSingleClientAPI(id);
    
      if(Response.data.status == 200)
      {
        setData(Response.data.data);
        setCategory(Response.data.category);
        setLicence(Response.data.licence);
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
   
    const value = event.target.value.trimStart().replace(/ {2,}/g,' ');
    const name = event.target.name;
    if(event.target.name == 'subdomain')
    {
      setData(prevState => ({ ...prevState, [name]: value.trim().replace(/ {2,}/g,' ').split(' ').join('-').toLowerCase() }));
    }
    else
    {
      setData(prevState => ({ ...prevState, [name]: value }));
    }
   
  }


  useEffect(async()=>{
    getSingleCLient();
  },[]);

  console.log(data,'11111')
    return (
      <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h3>Edit Client</h3>
              </div>
           
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap">
              <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/client">Client List</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-12 grid-margin">
      <div className="card">
        <div className="card-body">
          <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Licence Type</label>
                  <div className="col-sm-9">
                  <select value={data.licence_type} onChange={(e) => {onchange(e)}} name="licence_type" className="form-control">
                      <option value="">Select Type</option>
                      {licence && licence.length>0 && licence.map((value, index) => (
                      <option value={value._id}>{value.name}</option>
                      ))}
                    </select>
                    <span className="form-error">{error.licence_type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Subdomain</label>
                  <div className="col-sm-6">
                    <input type="text" name="subdomain" value={data.subdomain} className="form-control" readOnly/>
                    <span className="form-error">{error.subdomain}</span>
                  </div>
                  <div className="col-sm-3">
                    <span className="subdomain">{process.env.REACT_APP_DOMAIN_URL}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">First Name</label>
                  <div className="col-sm-9">
                    <input type="text" value={data.first_name} name="first_name" onChange={(e) => {onchange(e)}} className="form-control" />
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
                    <input type="text" name="last_name" value={data.last_name} onChange={(e) => {onchange(e)}} className="form-control" />
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
                    <input type="email" name="email" value={data.email} className="form-control" readOnly/>
                    <span className="form-error">{error.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Phone No.</label>
                  <div className="col-sm-9">
                    <input type="text" name="phone" value={data.phone} onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.phone}</span>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Company Name</label>
                  <div className="col-sm-9">
                    <input type="text" value={data.company} name="company" onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.company}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Company Category</label>
                  <div className="col-sm-9">
                  <select value={data.category} onChange={(e) => {onchange(e)}} name="category" className="form-control">
                      <option value="">Select Category</option>
                      {category && category.length>0 && category.map((value, index) => (
                      <option value={value._id}>{value.name}</option>
                      ))}
                    </select>
                    <span className="form-error">{error.category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Company Bio</label>
                  <div className="col-sm-9">
                    <textarea type="text" value={data.bio} name="bio" onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.bio}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-8">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">No. of facility</label>
                  <div className="col-sm-9">
                    <input type="number" value={data.no_facility} name="no_facility" onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.no_facility}</span>
                  </div>
                </div>
              </div>
            </div> */}
            
            <button type="submit" className="btn btn-primary mr-2" onClick={() => {handleSubmit()}}>Submit</button>
           
        
        </div>
      </div>
    </div>
    </div>
    </>
    );
};

export default Dashboard;