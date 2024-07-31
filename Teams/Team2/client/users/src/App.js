import './App.css';
import Login from './features/user/Login';
import { Route,Routes } from 'react-router-dom';
import Notifications from "./features/notification/Notifications"

function App() {
  return (
    <div className="App">
 <Routes> 
 <Route path='/'  element={<Login/>}/>
   <Route path='login'  element={<Login/>}/>
   <Route path='notifications'  element={<Notifications/>}/>
</Routes>
    </div>
  );
}

export default App;
