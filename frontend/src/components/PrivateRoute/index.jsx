import React,{useEffect }   from 'react';
import { useLocation,Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
//import { updateaccess } from '../../api/apiSlice';


export const PrivateRoute =props=> {
  let location = useLocation();
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect((user)=>{
if(user)
{
    //dispatch(updateaccess({"url": "/api/auth/refresh/", "method": "post","data" :{'refresh':user?.refresh}}));
}
},[dispatch]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
 
  return props.children;
}

