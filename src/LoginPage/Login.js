import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import React, { Component } from "react";
import './Login.css';
import axios from 'axios'
import users from './usersList';
import logo from "../images/ChatApp-logos.jpeg";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errors: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChangeUserName(event) {
        this.setState({ userName: event.target.value, password: this.state.password });
    }
    handleChangePassword(event) {
        this.setState({ userName: this.state.userName, password: event.target.value });
    }

   async onSubmit(event) {
        var check;
        var username = this.state.userName;
        var password = this.state.password;
        axios.post(`https://localhost:7243/api/users/Login`, { username:username , password:password })
        .then(res => {
                console.log(res.data)
                if(res.data === 'yes'){
                    this.props.setName(this.state.userName)
                }
                else{
                    alert("there is problem")
                    event.preventDefault();
                }
        })
    }


    render() {
        return (
            <div className="everything">
                <form className="login-form" onSubmit={this.onSubmit}>
                    <div className="row mb-3 form">
                        <label htmlFor='username' className="col-sm col-form-label" >Username</label>
                        <div className="col-sm">
                            <input id='username' className="form-control" onChange={this.handleChangeUserName}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form" >
                        <label htmlFor='inputPassword3' className="col-sm col-form-label">Password</label>
                        <div className="col-sm">
                            <input type="password" className="form-control" id="inputPassword3" onChange={this.handleChangePassword}></input>
                        </div>
                    </div>
                    <div className='signButton form'>
                        <button type="submit" id='refresh' className="btn btn-primary modal__btn">Login</button>
                        <span className='register'>Not registered? </span>
                        <Link
                            to={{
                                pathname: "./Register",
                                setName: this.props.setName
                            }}><span> to register.</span></Link>
                    </div>
                    <div className="alert-message">
                        {this.state.errors}
                    </div>
                </form>
                <img src={logo} className="logo-div"></img>
            </div>
        )
    }
}
export default Login;