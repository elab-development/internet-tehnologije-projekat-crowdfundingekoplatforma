import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';
import AuthContext from '../contexts/AuthContext';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [accountCreationDate, setAccountCreationDate] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.name);
            setEmail(user.email);
            setAccountCreationDate(new Date(user.created_at).toLocaleDateString());
            fetchSubscriptionStatus();
        }
    }, []);

    const fetchSubscriptionStatus = async () => {
        try {
            console.log(user, email);
            const response = await axios.get(`http://127.0.0.1:8000/api/stripe/subscription-status?email=${email}`);
            setSubscriptionStatus(response.data.status);
        } catch (error) {
            setSubscriptionStatus('Error fetching subscription status.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/change-password', { email, oldPassword, newPassword });
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError('Failed to change password. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="profile-container">
            <NavBar />
            <div className="profile-content">
                <h2>Profile</h2>
                <div className="profile-details">
                    <div className="profile-avatar">
                        <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="Profile Avatar" />
                    </div>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Account Created:</strong> {accountCreationDate}</p>
                </div>
                <div className="subscription-section">
                    <h3>Subscription</h3>
                    <p><strong>Status:</strong> {subscriptionStatus}</p>
                    {subscriptionStatus === "Not subscribed." && <Link to="/subscribe"><button type='button'>Manage Subscription</button></Link>}
                </div>
                <form className="change-password-form" onSubmit={handlePasswordChange}>
                    <h3>Change Password</h3>
                    <div className="form-div">
                        <label>Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-div">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-div">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Change Password</button>
                    {message && <p className="message">{message}</p>}
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;