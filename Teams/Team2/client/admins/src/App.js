import './App.css';
// import Login from './features/user/Login';
import Login from './sharedPages/Login';
import { Route,Routes, useNavigate } from 'react-router-dom';
import NotificationsForAdmin from './features/notification/NotificationsForAdmin';
import { useDispatch, useSelector } from 'react-redux';
// import {reset} from "./features/user/userSlice"
import {reset} from "./sharedPages/userSlice"

function App() {
 const dispatch=useDispatch();
 const navigate=useNavigate()
 const userName = useSelector(st => st.user.currentUser?.userName);
  return (
    <div className="App">
      {userName&&<h1>hello, {userName}</h1>}
      {userName&&<button onClick={()=>{dispatch(reset());navigate ("/login")}}>logout</button>}
 <Routes> 
 <Route path='/'  element={<Login/>}/>
   <Route path='login'  element={<Login/>}/>
   <Route path='notifications'  element={<NotificationsForAdmin/>}/>
</Routes>
    </div>
  );
}

export default App;
