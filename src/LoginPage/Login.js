import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import React, { Component } from "react";
import './Login.css';
import axios from 'axios'
import logo from "../images/ChatApp-logos.jpeg";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.passwordBox = React.createRef();
        this.usernameBox = React.createRef();
    }

    async componentDidMount() {
        axios.get(`http://localhost:5243/api/users/IsExists`, { withCredentials: true })
            .then(res => {
                if(res.data!==''){
                    this.props.setName(res.data)
                }
                return;
            });
    }

   async onSubmit(event) {
       var username = this.usernameBox.current.value;
       var password = this.passwordBox.current.value;
        event.preventDefault();
        var screenMessage = '';
        if(username === ''){
            screenMessage += "*Please insert a username.\n"
        }
        if(password === ''){
            screenMessage += "*Please insert a password.\n"
        }
        if(screenMessage !== ''){
            this.setState({
                errors: screenMessage
            });
            return;
        }
        axios.post(`http://localhost:5243/api/users/Login`, { username:username , password:password },{withCredentials:true},axios.defaults.withCredentials = true)
        .then(res => {
            if(res.status == 201){
                this.props.setName(this.usernameBox.current.value)
            }
            else{
                screenMessage += '*Wrong username or password.\n'
                this.setState({
                    errors: screenMessage
                });
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
                            <input id='username' className="form-control" ref={this.usernameBox}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form" >
                        <label htmlFor='inputPassword3' className="col-sm col-form-label">Password</label>
                        <div className="col-sm">
                            <input type="password" className="form-control" id="inputPassword3" ref={this.passwordBox}></input>
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