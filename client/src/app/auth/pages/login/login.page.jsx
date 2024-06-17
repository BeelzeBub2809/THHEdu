import React from "react";
import { link } from '../../../core/constants/link';
import { AuthService } from "../../../core/services/auth.service";
import { useNavigate } from 'react-router-dom';
import { role } from "../../../core/constants/config";
import './login.pages.css'

export default function LoginPage() {
    const navigation = useNavigate();
    const onLogin = async (e) => {
        navigation(link.managerDashboard);

        // TODO: Active when implement call api in backend
        // await AuthService.login()
        //     .then((response) => {
        //         if (response.success) {
        //             const userRole = AuthService.getRole();

        //             if ( userRole === role.MANAGER) {
        //               navigation(link.managerDashboard);
        //             }

        //           } else {
        //             alert('Check your username and password. Then try again.');
        //           }
        //     })
    }
    return (
        <section className="container">
            <div className="content-wrapper">
                <div className="column">
                    <div className="form-section">
                        <p className="welcome-text">
                            Welcome back! <br /> Please login/Signup to your account.
                        </p>
                        <form className="input-group">
                            <div className="input-label">
                                <label htmlFor="email" className="input-title">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input-value"
                                />
                            </div>
                            <div className="input-label">
                                <label htmlFor="password" className="input-title">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="input-value"
                                />
                            </div>
                        </form>
                        <section className="action-section">
                            <div className="login-options">
                                <div className="remember-me-section">
                                    <div className="remember-me">
                                        <input type="checkbox" className="checkbox" id="rememberMe" />
                                        <label htmlFor="rememberMe" className="remember-label">
                                            Remember Me
                                        </label>
                                    </div>
                                    <button className="login-button">Login</button>
                                </div>
                                <div className="additional-options">
                                    <div className="forgot-signup">
                                        <a href={link.forgotPass} className="forgot-password">
                                            Forgot Password?
                                        </a>
                                        <a href= {link.register} className="signup-button">Signup</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="image-column">
                    <div className="image-wrapper">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cb3ad98ec868d7e62dc105cdf1843a3f0a861bd41b9e232e06213bccab9614c?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                            className="login-image"
                            alt="Login Illustration"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
