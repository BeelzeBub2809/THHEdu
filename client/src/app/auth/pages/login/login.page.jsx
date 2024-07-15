import React, { useState } from "react";
import { link } from '../../../core/constants/link';
import { useNavigate } from 'react-router-dom';
import './login.pages.css'
import { ValidatorsControl } from "../../../core/services/validators-control";
import { Rules } from "../../../core/constants/rules";
import Swal from 'sweetalert2'
export default function LoginPage() {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let formControl = new ValidatorsControl({
        email: {value: email, validators: Rules.email},
        password: {value: password, validators: Rules.password} 
    })
    const rolePriority = ['trainee', 'trainer', 'manager', 'admin'];

    const handleRedirect = (roles) => {
        // Find the highest priority role
        const highestRole = roles.reduce((highest, role) => {
            if (rolePriority.indexOf(role) > rolePriority.indexOf(highest)) {
                return role;
            }
            return highest;
        }, 'trainee');
        
        switch (highestRole) {
            case 'trainee':
                navigation('/trainee');
                break;
            case 'trainer':
                navigation('/trainer');
                break;
            case 'manager':
                navigation('/manager');
                break;
            case 'admin':
                navigation('/admin');
                break;
            default:
                navigation('/');
                break;
        }
    };
    const handleSubmitForm = async (e) => {
        let isSubmit = formControl.submitForm(e)
        console.log(isSubmit,email,password)
        if(isSubmit) {
            try {
                const formData = {
                    email: email,
                    password: password
                }
                let response = await fetch('http://localhost:9999/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    credentials: 'include'
                  })
                if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok')
                }
                const data = await response.json()
                const roles = data.roles
                localStorage.setItem('userRoles', JSON.stringify(roles));
                localStorage.setItem('userId', JSON.stringify(data.id));
                handleRedirect(roles)
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }
        }
    }
    return (
        <section className="container">
            <div className="content-wrapper">
                <div className="column">
                    <div className="form-section">
                        <p className="welcome-text">
                            Welcome back! <br /> Please login/Signup to your account.
                        </p>
                        <form className="input-group" style={{ backgroundColor: 'rgb(236,236,236)' }}>
                            <div className="input-label">
                                <label htmlFor="email" className="input-title">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input-value"
                                    style={{ color: 'black' }}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    style={{ color: 'black' }}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    <button className="login-button" type="button" onClick={(e) => handleSubmitForm(e)}>Login</button>
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
