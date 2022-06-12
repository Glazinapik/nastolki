import { Route, Routes,} from 'react-router-dom';
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
import Games from './components/Games/Games';
import EditProfile from './components/EditProfile/EditProfile';
import MyMeetings from './components/mymeetings/MyMeetings';




function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/signout" element={<PrivateRoute el={<SignOut />} />} />
          <Route path="/meetings" element={<PrivateRoute el={<Meetings />} />} />
          <Route path="/addmeeting" element={<PrivateRoute el={<AddMeeting />} />} />
          <Route path="meeting/:id" element={<PrivateRoute el={<Meeting />} />}/>
          <Route path="/games" element={<PrivateRoute el={<Games />} />}/>
          <Route path="/user/:id" element={<PrivateRoute el={<EditProfile />} />}/>
          <Route path="/mymeetings/:id" element={<PrivateRoute el={<MyMeetings />} />}/>
          <Route path="/meeting/:id" element={<PrivateRoute el={<Meeting />} />}/>
      </Routes>
    </div>
  );
}

export default App;
