import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import EditProfile from './components/EditProfile/EditProfile';


function App() {


//  const routes = [
//    {path: '/', Component: Main },
//    {path: '/user/signup', Component: SignUp },
//    {path: '/user/signin', Component: SignIn }
//  ]
   

  return (
    <div className="App">
      <Navbar />
      <Routes>

      {/* {routes.map(({path, Component}) => 
        <Route key={path} path ={path}>
           {({match}) =>
           <CSSTransition
           timeout={1000}
           classNames = 'option'
           unmountOnExit
           in ={match !== null}
           >
             <Component/>
           </CSSTransition>
           }
        </Route>
      )} */}
          <Route path="/" element={<Main />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/signout" element={<PrivateRoute el={<SignOut />} />} />
          <Route path="/meetings" element={<PrivateRoute el={<Meetings />} />} />
          <Route path="/addmeeting" element={<PrivateRoute el={<AddMeeting />} />} />
          <Route path="meeting/:id" element={<PrivateRoute el={<Meeting />} />}/>
          <Route path="user/:id" element={<PrivateRoute el={<EditProfile />} />}/>
      </Routes>
    </div>
  );
}

export default App;
