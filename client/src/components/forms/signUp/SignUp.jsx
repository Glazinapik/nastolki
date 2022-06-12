import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../redux/actions/userAction';

function SignUp() {

  const [userSignUp, setUserSignUp] = useState({
    email: '',
    password: '',
    userName: '',
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUserSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.entries(userSignUp).filter((el) => (el[1] ? el[1].trim() : el[1]));
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(signUp(payload, navigate));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={submitHandler} className="form">
        <legend className="text-center mb-4"><h1>Регистрация</h1></legend>
        <div className="mb-3">
          <input onChange={changeHandler} className="form-control" value={userSignUp.email} type="email" name="email" placeholder="Email" />
        </div>
        <div className="mb-3">
          <input onChange={changeHandler} className="form-control" value={userSignUp.userName} type="text" name="userName" placeholder="Name" />
        </div>
        <div className="mb-3">
          <input onChange={changeHandler} className="form-control" value={userSignUp.password} type="password" name="password" placeholder="Pass" />
        </div>
        <button type="submit" className="btn btn-primary button">Sign Up</button>
      </form>
      <img className='picture' src="/img/fon3.jpg" alt="" />
    </div>
  );
}

export default SignUp;
