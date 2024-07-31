import './App.css';
import Login from './features/user/Login';
import { Route,Routes } from 'react-router-dom';
import NotificationsForAdmin from './features/notification/NotificationsForAdmin';

function App() {
  return (
    <div className="App">
 <Routes> 
 <Route path='/'  element={<Login/>}/>
   <Route path='login'  element={<Login/>}/>
   <Route path='notifications'  element={<NotificationsForAdmin/>}/>
</Routes>
    </div>
  );
}

export default App;
