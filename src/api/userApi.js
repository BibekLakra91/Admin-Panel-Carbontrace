import axios from "axios";

export const getAddLicenceAPI = async() => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/client/client-add-data`,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const getSingleClientAPI = async(id) => {
  
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/client/single-client/${(id)?id:userData.id}`,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const getSingleLicenceAPI = async(id) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/client/single-licence/${id}`,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const getLicenceAPI = async(data) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/client/licence`,
        data,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}


export const getClientAPI = async(data) => {
  // console.log("CreateClientAPI", data);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;
      // axios.defaults.headers.common['Accept'] = 'application/json';
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/client/get-client`,
        data,
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const UpdateClientAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/update-client/${id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const changePwAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/change-password/${userData.id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const UpdateProfileAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/update-collaborator/${(id)?id:userData.id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error("Something went wrong, please try again later!");
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}


export const UpdateLicenceAPI = async(data,id) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {
    try{
      axios.defaults.headers.common['Authorization'] = userData.jwt;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/client/update-licence/${id}`,
        data,
        {headers:{"Content-Type":"application/json"}}
      );
      // console.log("LoginAPI response", response);
      if (response.status === 200) {
      
        return {
          data: response.data,
        };
      } else {
        throw new Error(response.message);
      }

    }catch(error){
      console.log("error", error);
      return {
        status: 400,
        message: error.message,
        data: "",
      };
    }
  }
}

export const CreateLicenceAPI = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {

  try{
    axios.defaults.headers.common['Authorization'] = userData.jwt;

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/client/add-licence`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    // console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}
}

export const CreateClientAPI = async(data) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if(userData)
  {

  try{
    axios.defaults.headers.common['Authorization'] = userData.jwt;

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/client/add-user`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    // console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}
}
export const LoginAPI = async(data) => {
  console.log("LoginAPI", data);
  try{
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/admin/login`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}


export const ForgotAPI  = async(data) => {
  console.log("LoginAPI", data);
  try{
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/client/forgot`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}


export const ResetAPI  = async(data) => {
  console.log("LoginAPI", data);
  try{
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/client/reset`,
      data,
      {headers:{"Content-Type":"application/json"}}
    );
    console.log("LoginAPI response", response);
    if (response.status === 200) {
     
      return {
        data: response.data,
      };
    } else {
      throw new Error(response.message);
    }

  }catch(error){
    console.log("error", error);
    return {
      status: 400,
      message: error.message,
      data: "",
    };
  }
}



