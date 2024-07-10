import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
        <div className="background-container inner"/>
        <div className='tint-overlay inner'/>
        <div className="welcome-content inner">
            <h1>Eko projekti</h1>
            <p>Pronađi i pridruži se ekološkim projektima u Srbiji</p>
            <div className="welcome-buttons">
                <Link to="/register">
                    <button className='register-button' type='button'>Register</button>
                </Link>
                <Link to="/login">
                    <button className='login-button' type='button'>Login</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Welcome