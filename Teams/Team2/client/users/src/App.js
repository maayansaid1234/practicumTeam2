import './App.css';
import Payment from './features/trading/Payment';
import BuyStock from './features/trading/BuyStock';
import SellStock from './features/trading/SellStock';
import Login from "./sharedPages/Login";
import UserReport from './features/trading/UserReport'
import Notifications from './features/notification/Notifications';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

function App() {
  return (
    <div className="App">
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="payment" element={<Payment />} />
        <Route path="userReport" element={<UserReport />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="buyStock/:symbol" element={<BuyStock />} />
        <Route path="sellStock/:symbol" element={<SellStock />} />
      </Routes>
    </div>
  );
}

export default App;
