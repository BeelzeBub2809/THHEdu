import React from "react";
import './css/styleLandingPage.css'
import { link } from "../../../core/constants/link";

export default function LandingPage() {
  return (
    <div className="container-fluid" style={{padding : 0}}>
      <header className="header">
        <div className="nav">
          <div className="logo">
          <span style={{ color: "black" }}>Quiz </span> Grad
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-link">
              How it works?
            </a>
            <a href="#" className="nav-link">
              Features
            </a>
            <a href="#" className="nav-link">
              About us
            </a>
            <a href={link.login} className="login-button" style={{textDecoration: 'none', margin: 0}}>
              Login
            </a>
          </nav>
        </div>
        <div className="separator" style={{ width: '100%' }} />
      </header>
      <main className="main-content">
        <div className="main-wrapper">
          <section className="info-column">
            <div className="info-text-wrapper">
              <div className="text-content">
                <p className="title">
                  Learn <br />{" "}
                  <span style={{ color: "rgba(51, 51, 51, 1)" }}>new concepts</span>{" "}
                  <br /> for each question
                </p>
                <div className="description">
                  <div className="vertical-separator" />
                  <p className="info-text">
                    We help you prepare for exams and quizzes
                  </p>
                </div>
                <button className="cta-button" tabIndex={0}>
                  Start solving
                </button>
              </div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/90f28d1de00522ac220ecf6820d9c546197cdba0b14742f1bb24b4f23ece643c?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
              className="illustration"
              alt="Illustration Image"
            />
          </section>
          <section className="image-column">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f21c3ef31a3262b9f615c037e5cfd690b17cbf745ef559082a1b835a6520f82?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
              className="image-content"
              alt="Content Image"
            />
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-separator" />
        <div className="footer-container">
          <div className="address">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/363999a96ab8b68dbb839b68315e006ffa29c04cebe8ef24af61c2177ee51758?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
              className="location-icon"
              alt="Location Icon"
            />
            <p className="location-text">
              Khu CNC Hoa Lac, Thach That, Ha Noi, Viet Nam
            </p>
          </div>
          <div className="footer-details">
            <div className="logo-footer">
              Quiz <span style={{ color: "rgba(135, 206, 250, 1)" }}>Grad</span>
            </div>
            <div className="contact">
              <div className="contact-item">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f8ad01ff439c368ada723959c6281c2bb38a9ed4c94a00801c1fd330432e21a?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                  className="contact-icon"
                  alt="Contact Icon"
                />
                <p className="contact-text">0827014598</p>
              </div>
              <div className="social-media">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d22006633ec4495d08b56be83665094bb1d438535c716cb658b4dbd78d708c5?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                  className="social-icon social-icon-facebook"
                  alt="Facebook Icon"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8f92f49a08703df5484713fc7744a66634392a47e60a6c21452494a568fd55?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                  className="social-icon social-icon-twitter"
                  alt="Twitter Icon"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/707d8ee9239d82b4783cf8e1b5d1065a4a894329718ae1a1e6f6d6a9ff4a52fa?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                  className="social-icon social-icon-instagram"
                  alt="Instagram Icon"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

  )
}
