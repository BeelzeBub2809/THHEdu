import React from "react";
import {link} from '../../../core/constants/link';

export default function RegisterPage(){
    return (
        <>
            <div class="container page-wraper">
                <div class="account-form row justify-content-center">
                    <div class="col-md-6 col-lg-5">
                    <div className="account-head text-center mb-4">
                        <a href="#"><img src="" /></a>
                    </div>
                        <div class="account-container ">
                            <div class="heading-bx text-center left mb-4">
                                <h2 class="title-head">Sign Up <span>Now</span></h2>
                                <p>Login Your Account <a href={link.login}>Click here</a></p>
                            </div>
                            <form class="contact-bx" action="" method="post">
                                <div class="row">
                                    <div class="col-lg-12 mb-4">
                                        <div class="input-group">
                                            <label class= "col-lg-4">Full Name</label>
                                            <input class="form-control" name="fullname" id="fullname" type="text" required=""  value=""/>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 mb-4">
                                        <div class="input-group">
                                            <label class= "col-lg-4">Email Address</label>
                                            <input class="form-control" name="email" id="email" type="email" required=""  value=""/>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 mb-4">
                                        <div class="input-group"> 
                                            <label class= "col-lg-4">Password</label>
                                            <input class="form-control col-lg-8" id="password" name="password" type="password" required="" value=""/>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 mb-4">
                                        <div class="input-group">
                                            <label class= "col-lg-4">Confirm password</label>
                                            <input class="form-control" name="confPassword" type="password" required="" value=""/>
                                        </div>
                                    </div>
                                    <div id="err" className="text-danger mb-3" style = {{display:"none"}}>error</div>
                                    <div class="form-group text-center mb-3">
                                        <button name="submit" type="submit" value="Submit" class="btn btn-primary btn-block ">Sign Up</button>
                                    </div>
                                    <div class="col-lg-12 text-center">
                                        <h6>Login with Social media</h6>
                                        <div className="d-flex justify-content-center">
                                            <a className="btn btn-danger  google-plus" href="">
                                                <i className="fa fa-google-plus mr-2"></i>Google Plus</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}