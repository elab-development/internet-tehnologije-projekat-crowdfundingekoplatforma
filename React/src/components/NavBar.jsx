import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import AuthContext from '../contexts/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/home">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/cities">Cities</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="navbar-right">
                {user && (
                    <div className="user-menu">
                        <span onClick={toggleDropdown} className="user-name">{user.name}</span>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile">Profile</Link>
                                {user && user.is_admin === 1 && <Link to="/admin">Admin Panel</Link>}
                                <button onClick={logout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;