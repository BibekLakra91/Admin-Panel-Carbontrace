import React, { useState, useEffect } from "react";
import * as USERAPI from "../../api/userApi";
import { CreateNotification } from "../../Utils/notification";
import { Link} from "react-router-dom";

const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({email:'',password:''});


  const getClient = async() =>
  {
      const Response = await USERAPI.getClientAPI(data);
    
      if(Response.data.status == 200)
      {
        setData(Response.data.data);
      }
      else if(Response.data.status == 401)
      {
        CreateNotification("danger","Session has been expired!");
        localStorage.clear();
        props.history.push('/login')
      }
      else
      {
        CreateNotification("danger","Something went wrong, please try again later!")
      }
     
  }

  useEffect(async()=>{
    getClient();
  },[]);

    return (
      <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h3>Client List</h3>
              </div>
           
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap">
              <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/add-client">Add Client</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
         
          <div className="table-responsive">
            <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  Sr. No.
                </th>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>
                  Licence
                </th>
                <th>
                  Subdomain
                </th>
               
                <th>
                  Date
                </th>
                <th>
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              {data && data.length>0 && data.map((value, index) => (
              <tr>
                <td className="py-1">
                {index+1}
                </td>
                <td>
                {value.first_name} {value.last_name}
                </td>
                <td>
                {value.email}
                </td>
                <td>
                {value.licence_type.name}
                </td>
                <td>
                {value.subdomain}{process.env.REACT_APP_DOMAIN_URL}

                </td>
             
                <td>
                {value.created_at}
                </td>
                <td>
                  <span className="icon_act">
                <Link to={`/edit-client/${value._id}`}><i className="mdi mdi-pencil-box"></i></Link>
                </span>
                </td>
              </tr>
              ))
              }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
    );
};

export default Dashboard;