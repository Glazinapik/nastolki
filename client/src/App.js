import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddMeeting from './components/forms/addMeeting/AddMeeting';
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

  const user = useSelector(state => state.user)

  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
    dispatch(checkAuth());
    } else {
      console.log(">>>",user)
      // setAuth(!!user)
      setIsLoading(false)
    }

  }, [user]);


if (isLoading) return <div>is loading</div>

  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/user/signup" element={<SignUp />} />
      <Route path="/user/signin" element={<SignIn />} />
      <Route path="/user/signout" element={<PrivateRoute><SignOut /></PrivateRoute>} />
      <Route path="/meetings" element={<PrivateRoute ><Meetings /></PrivateRoute>} />
      {/* <Route path="/addmeeting" element={<PrivateRoute ><AddMeeting /></PrivateRoute>} /> */}
      </Routes>
    </div>
  );
}

export default App;
