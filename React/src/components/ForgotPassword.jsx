import { useState } from 'react';
import axios from 'axios';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resetLink, setResetLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
            setMessage('Copy the following link to reset your password:');
            setResetLink(`http://localhost:3000/reset-password/${response.data.token}`);
        } catch (error) {
            setMessage('Failed to generate password reset link.');
        }
    };

    return (
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                {message && <p className="message">{message}</p>}
                {resetLink && <a className="reset-link" href={resetLink}>{resetLink}</a>}
                <div className='form-div'>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Generate Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;