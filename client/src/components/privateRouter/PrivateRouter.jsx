import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../../src/redux/actions/userAction';
import SignIn from '../forms/signIn/SignIn';

function PrivateRoute({  el }) {
  
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
    dispatch(checkAuth());
    } 
    if(user === 'noUser') {
      setIsLoading(false)
    }}, [user]);
 
  return (
    user && user != 'noUser' ? el : 
    isLoading ?  <center><h1>LOADING!</h1></center> : 
    <SignIn />
  );
}

export default PrivateRoute;
