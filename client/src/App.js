import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddMeeting from './components/forms/addMeeting/AddMeeting';
import SignIn from './components/forms/signIn/SignIn';
import SignOut from './components/forms/signOut/SignOut';
import SignUp from './components/forms/signUp/SignUp';
import Main from './components/main/Main';
import Meeting from './components/meeting/Meeting';
import Meetings from './components/meetings/Meetings';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/privateRouter/PrivateRouter';


function App() {

  const[flag, setFlag] = useState(true)

  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/user/signup" element={<SignUp />} />
      <Route path="/user/signin" element={<SignIn />} />
      <Route path="/user/signout" element={<PrivateRoute el={<SignOut />} />} />
      <Route path="/meetings" element={<PrivateRoute el={<Meetings flag={flag} setFlag={setFlag}/>} />} />
      <Route path="/addmeeting" element={<PrivateRoute el={<AddMeeting flag={flag} setFlag={setFlag}/>} />}/>
      <Route path="meeting/:id" element={<PrivateRoute el={<Meeting />} />}/>
      </Routes>
    </div>
  );
}

export default App;
