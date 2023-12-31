import React, { useState, useEffect } from "react";
import * as knowledgeApi from "../../api/knowledgeApi";
import { CreateNotification } from "../../Utils/notification";
import { Link} from "react-router-dom";

const Dashboard = (props) => {
  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [unit, setUnit] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [scopes, setScope] = useState([]);

  const isFormValid = () => {
    
    if (!data.name) {
      setError({ name: "Name is required!"});
        return false;
    }
    else if (data.co2_factor && !data.co2_unit) {
      setError({ co2_unit: "Please select Co2 unit!"});
        return false;
    }
    else if (data.ch4_factor && !data.ch4_unit) {
      setError({ ch4_unit: "Please select Ch4 unit!"});
        return false;
    }
    else if (data.n2o_factor && !data.n2o_unit) {
      setError({ n2o_unit: "Please select N2o unit!"});
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
      let id = props.match.params.id;
      const Response = await knowledgeApi.UpdateKnowledgeAPI(data,id);
    
      if(Response.data.status == 200)
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
    
  }

  const getSingleKnowledge = async() =>
  {
    let id = props.match.params.id;
      const Response = await knowledgeApi.getSingleKnowledgeAPI(id);
    
      if(Response.data.status == 200)
      {
        setData(Response.data.data);
        setCategory(Response.data.category);
        setSubCategory(Response.data.subcategory);
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

  const getAddData = async() =>
  {
    let id = props.match.params.id;
      const Response = await knowledgeApi.getAddKnowledgeDataAPI();
    
      if(Response.data.status == 200)
      {
        setUnit(Response.data.data);
        setScope(Response.data.scopes);
        
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



  const getCategoryData = async(id) =>
  {   
    if(!id)
    {
      id = "451ba1fcfceb43977503242a";
    }
      const Response = await knowledgeApi.getCategoryDataAPI(id);
    
      if(Response.data.status == 200)
      {
        setCategory(Response.data.data);
        
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

  const getSubCategoryData = async(id) =>
  {
    if(!id)
    {
      id = "451ba1fcfceb43977503242a";
    }
      const Response = await knowledgeApi.getSubCategoryDataAPI(id);
    
      if(Response.data.status == 200)
      {
        setSubCategory(Response.data.data);
        
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
    if(event.target.name == 'scope_id')
    {
      setData(prevState => ({ ...prevState, ['category']: '' }));
      getCategoryData(value)
    }
    else if(event.target.name == 'category')
    {
      setData(prevState => ({ ...prevState, ['sub_category']: '' }));
      getSubCategoryData(value)

    }
    
      setData(prevState => ({ ...prevState, [name]: value }));
    
   
  }

  useEffect(async()=>{
    getSingleKnowledge();
    getAddData();

  },[]);

    return (
      <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h3>Edit Knowledge</h3>
              </div>
           
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap">
              <Link className="btn btn-primary mt-2 mt-xl-0" variant="primary" to="/knowledge">Knowledge base</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-12 grid-margin">
      <div className="card">
        <div className="card-body">
          {/* <h4 className="card-title">Edit Knowledge</h4> */}
          <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Scope</label>
                  <div className="col-sm-9">
                    <select name="scope_id" value={data.scope_id} className="form-control" disabled>
                      <option value="">Select Scope</option>
                      {scopes && scopes.length>0 && scopes.map((value, index) => (
                      <option value={value._id}>{value.name}</option>
                      ))}
                      </select>
                    <span className="form-error">{error.scope_id}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Category</label>
                    <div className="col-sm-9">
                      <select name="category" value={data.category} className="form-control" disabled>
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
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Sub Category</label>
                  <div className="col-sm-9">
                    <select name="sub_category" value={data.sub_category} className="form-control" disabled>
                      <option value="">Select Sub category</option>
                      {subcategory && subcategory.length>0 && subcategory.map((value, index) => (
                        <option value={value._id}>{value.name}</option>
                        ))}
                      </select>
                    <span className="form-error">{error.sub_category}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Name</label>
                  <div className="col-sm-9">
                    <input type="text" name="name" value={data.name} placeholder="Name"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Heat Content</label>
                  <div className="col-sm-9">
                  <input type="text" name="heat_content" value={data.heat_content} placeholder="heat_content"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.heat_content}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Co2 Factor</label>
                  <div className="col-sm-9">
                    <input type="number" name="co2_factor" value={data.co2_factor} placeholder="Co2 Factor"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.co2_factor}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Co2 Unit</label>
                  <div className="col-sm-9">
                    <select name="co2_unit" value={data.co2_unit} onChange={(e) => {onchange(e)}} className="form-control">
                      <option value="">Select Co2 Unit</option>
                      <option value="Kg">Kg</option>
                      <option value="Gm">Gm</option>
                    
                      </select>
                    <span className="form-error">{error.co2_unit}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Ch4 Factor</label>
                  <div className="col-sm-9">
                  <input type="number" name="ch4_factor" value={data.ch4_factor} placeholder="Ch4 Factor"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.ch4_factor}</span>
                  </div>
                </div>
              </div>
              </div>
              <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Ch4 Unit</label>
                  <div className="col-sm-9">
                    <select name="ch4_unit" value={data.ch4_unit} onChange={(e) => {onchange(e)}} className="form-control">
                      <option value="">Select Ch4 unit</option>
                      <option value="Kg">Kg</option>
                      <option value="Gm">Gm</option>
                    
                      </select>
                    <span className="form-error">{error.ch4_unit}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">N2o Factor</label>
                  <div className="col-sm-9">
                    <input type="number" name="n2o_factor" value={data.n2o_factor} placeholder="N2o Factor"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.n2o_factor}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">N2o Unit</label>
                  <div className="col-sm-9">
                    <select name="n2o_unit" value={data.n2o_unit} onChange={(e) => {onchange(e)}} className="form-control">
                      <option value="">Select N2o unit</option>
                      <option value="Kg">Kg</option>
                      <option value="Gm">Gm</option>
                    
                      </select>
                    <span className="form-error">{error.n2o_unit}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Biogenic</label>
                  <div className="col-sm-9">
                  <input type="number" name="biogenic" value={data.biogenic} placeholder="Biogenic CO2 Factor"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.biogenic}</span>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Biofuel</label>
                  <div className="col-sm-9">
                  <select name="biofuel" value={data.biofuel} onChange={(e) => {onchange(e)}} className="form-control" >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      </select>
                    <span className="form-error">{error.biofuel}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Formula</label>
                  <div className="col-sm-9">
                  <input type="text" value={data.formula} name="formula" placeholder="Formula"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.formula}</span>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                <label className="col-sm-3 col-form-label">Gas</label>
                  <div className="col-sm-9">
                  <input type="text" value={data.gas} name="gas" placeholder="Gas"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.gas}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Chemical Name</label>
                  <div className="col-sm-9">
                  <input type="text" value={data.chemical_name} name="chemical_name" placeholder="Chemical Name"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.chemical_name}</span>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Ar4</label>
                  <div className="col-sm-9">
                  <input type="number" value={data.ar4} name="ar4" placeholder="AR4(kgCO2e)"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.ar4}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Ar5</label>
                  <div className="col-sm-9">
                  <input type="number" name="ar5" value={data.ar5} placeholder="Ar5(kgCO2e)"  onChange={(e) => {onchange(e)}} className="form-control" />
                    <span className="form-error">{error.ar5}</span>
                  </div>
                </div>
              </div>
              </div>
              <div className="row">
              <div className="col-md-6">
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">Units</label>
                  <div className="col-sm-9">
                  <select name="unit" value={data.unit} placeholder="Units"  onChange={(e) => {onchange(e)}} className="form-control" >
                    <option value="">Select Unit</option>

                  {unit && unit.length>0 && unit.map((value, index) => (
                      <option value={value._id}>{value._id}</option>
                      ))}
                      </select>
                    <span className="form-error">{error.unit}</span>
                  </div>
                </div>
              </div>
            </div>
            
            

            <button type="submit" className="btn btn-primary mr-2" onClick={() => {handleSubmit()}}>Update</button>
           
        
        </div>
      </div>
    </div>
    </div>
    </>
    );
};

export default Dashboard;