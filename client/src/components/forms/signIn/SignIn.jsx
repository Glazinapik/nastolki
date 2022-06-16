import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../../redux/actions/userAction';

function SignIn() {

  const [userSignIn, setUserSignIn] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const error = useSelector(state => state.error);

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (user && window.location.href === 'http://localhost:3000/user/signin') navigate('/meetings')
  }, [user])

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.entries(userSignIn).filter((el) => (el[1] ? el[1].trim() : el[1]));
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(signIn(payload, navigate));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={submitHandler}
        className="form"
      >
        <legend className="text-center mb-4"><h1>Вход</h1></legend>
        <div className="mb-3">
          {error === 'ошибка' ? <label className='error'>Неправильный логин или пароль</label> : null}
          <input
            onChange={changeHandler}
            value={userSignIn.email}
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            value={userSignIn.password}
            className="form-control"
            type="password"
            name="password"
            placeholder="Pass"
          />
        </div>
        <button type="submit" className="btn btn-primary button">
          Войти
        </button>
      </form>
      <img src="/img/fon2.jpg" alt="" />
    </div>
  );
}

export default SignIn;
