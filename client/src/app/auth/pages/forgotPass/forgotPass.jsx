import React from "react";
import '../login/login.pages.css'
import {link} from '../../../core/constants/link'

export default function ForgotPassPage() {
  return (
    <section className="container">
      <div className="content-wrapper">
        <div className="column">
          <div className="form-section">
            <p className="welcome-text">
              Welcome back! <br /> Please enter your email.
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
            </form>
            <section className="action-section">
              <div className="login-options">
                <div className="additional-options">
                  <div className="forgot-signup">
                    <a href={link.login} className="signup-button">Back</a>
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

  )
}