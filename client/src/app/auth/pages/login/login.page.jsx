import React from "react";
import {link} from '../../../core/constants/link';
import { AuthService } from "../../../core/services/auth.service";
import { useNavigate } from 'react-router-dom';
import { role } from "../../../core/constants/config";

export default function LoginPage() {

    const navigation = useNavigate();

    const onLogin = async (e) => {
        await AuthService.login()
            .then((response) => {
                if (response.success) {
                    const userRole = AuthService.getRole();
                    
                    if ( userRole === role.MANAGER) {
                      navigation(link.managerDashboard);
                    }

                    window.location.reload();
                  } else {
                    alert('Check your username and password. Then try again.');
                  }
            })
    }

    return (
        <div className="container page-wrapper">
            <div className="account-form row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="account-head text-center mb-4">
                        <a href="#"><img src="" /></a>
                    </div>
                    <div className="account-form-inner">
                        <div className="account-container">
                            <div className="heading-bx left text-center mb-4">
                                <h2 className="title-head">Login to your <span>Account</span></h2>
                                <p>Don't have an account? <a href = {link.register} >Create one here</a></p>
                            </div>
                            <form className="contact-bx" action="login" method="post">
                                <div className="form-group mb-3">
                                    <label>Your Email</label>
                                    <input name="email" type="text" required="" className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Your Password</label>
                                    <input name="password" type="password" className="form-control" required="" />
                                </div>
                                <div className="form-group form-forget d-flex justify-content-between mb-3">
                                    <div className="">
                                        <input type="checkbox" className="" id="isRemember" name="remember" />
                                        <label className="custom-control-label" htmlFor="isRemember">Remember me</label>
                                    </div>
                                    <a href="forget-password.jsp">Forgot Password?</a>
                                </div>
                                <div id="err" className="text-danger mb-3" style = {{display:"none"}}>error</div>
                                <div className="form-group text-center mb-3">
                                    <button name="submit" type="submit" onClick={onLogin} className="btn btn-primary btn-block">Login</button>
                                </div>
                                <div className="text-center mb-3">
                                    <h6>Login with Social media</h6>
                                    <div className="d-flex justify-content-center">
                                        <a className="btn btn-danger  google-plus" href="">
                                            <i className="fa fa-google-plus mr-2"></i>Google Plus</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
