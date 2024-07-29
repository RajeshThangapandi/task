import React from 'react';
import { useHistory } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const history = useHistory(); // Initialize useNavigate

    const handleUserLogin = () => {
        history.push('/userlogin');
        // Use navigate directly with the path
    };

    const handleAdminLogin = () => {
        history.push('/login');
        
    };

    return (
        <div className="landing-page">
            <div className="content">
                <h1>Welcome to Our App</h1>
                <p>Choose your login type to proceed</p>
                <div className="button-container">
                    <button className="login-button user-login" onClick={handleUserLogin}>User Login</button>
                    <button className="login-button admin-login" onClick={handleAdminLogin}>Admin Login</button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
