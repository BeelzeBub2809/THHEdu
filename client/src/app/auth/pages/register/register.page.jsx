import React, { useState } from "react";
import { link } from '../../../core/constants/link';
import '../login/login.pages.css'
import { ValidatorsControl } from "../../../core/services/validators-control";
import { Rules } from "../../../core/constants/rules";
import Swal from 'sweetalert2'
import { AuthService } from "../../../core/services/auth.service";

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePass, setRePass] = useState('')
    let formControl = new ValidatorsControl({
        email: {value: email, validators: Rules.email},
        password: {value: password, validators: Rules.password} 
    })
    const handleSubmitForm = async (e) => {
        let isSubmit = formControl.submitForm(e)
        if(isSubmit) {
            try {
                const formData = {
                    email: email,
                    password: password
                }
                let response = await fetch('http://localhost:9999/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                  })
                if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok')
                }
                Swal.fire({
                    title: `Register Success`,
                    text:'We will sent an email to you to verify',
                    icon: 'success',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'Ok',
                })
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
                            Welcome back! <br /> Please Signup to your account.
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
                                    required
                                />
                                <div validation="email" className="error-message" style={{color:'red'}} alias="Email"></div>
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
                                    required
                                />
                                <div validation="password" className="error-message" style={{color:'red'}} alias="Password"></div>
                            </div>
                            <div className="input-label">
                                <label htmlFor="re-password" className="input-title">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="re-password"
                                    className="input-value"
                                    style={{ color: 'black' }}
                                    onChange={(e) => setRePass(e.target.value)}
                                    required
                                />
                                {password !== rePass && <div className="text-danger">Confirm password does not match with password</div>}
                            </div>
                            <section className="action-section">
                                <div className="login-options">
                                    <div className="remember-me-section">
                                        <button type="button" onClick={(e) => handleSubmitForm(e)} className="login-button" disabled={password !== rePass}>Signup</button>
                                    </div>
                                    <div className="additional-options">
                                        <div className="forgot-signup">
                                            <a href={link.login} className="signup-button">Login</a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </form>
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

    )
}