import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from './sharedPages/userSlice';
import './navbar.css'; // Import CSS for styling

const Navbar = () => {
  const dispatch = useDispatch();
  const userName = useSelector(st => st.user.currentUser?.userName);

  const handleLogout = () => {
    dispatch(reset());
    window.location.href = "/login"; // Navigate to login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/userReport"> Status Report</Link>
      </div>
      <div className="navbar-right">
        {userName && <span className="username">Hello, {userName}</span>}
        {userName && <button onClick={handleLogout} className="logout-button">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
