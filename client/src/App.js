import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/forms/signIn/SignIn';
import SignOut from './components/forms/signOut/SignOut';
import SignUp from './components/forms/signUp/SignUp';
import Main from './components/main/Main';
import Meetings from './components/meetings/Meetings';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/privateRouter/PrivateRouter';
import { checkAuth } from './redux/actions/userAction';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/user/signup" element={<SignUp />} />
      <Route path="/user/signin" element={<SignIn />} />
      <Route path="/user/signout" element={<PrivateRoute><SignOut /></PrivateRoute>} />
      <Route path="/meetings" element={<PrivateRoute><Meetings /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
