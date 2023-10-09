import React, { useState, useEffect } from "react";


const Login = (props) => {
 



  useEffect(async()=>{
    props.history.push('/login')
  },[]);

    return (
      <></>
    );
};

export default Login;