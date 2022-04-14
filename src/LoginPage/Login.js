import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import React, { Component } from "react";
import './Login.css';
import users from './usersList';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
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

    onSubmit(event) {
        var user;
        for (var i = 0; i < users.length; i++) {
            if (this.state.userName === users[i].username && this.state.password == users[i].password) {
                user = users[i]
                break;
            }
        }
        if (user != null) {
            this.props.setName(user.username)
        } else {
            alert('Wrong Username or Password. Please try again')
        }
    }


    render() {
        return (
            <div id='back-div'>
                <form className="login-form" onSubmit={this.onSubmit}>
                    <div className="row mb-3 form">
                        <label className="col-sm-2 col-form-label" >Username</label>
                        <div className="col-sm-4">
                            <input id='username' className="form-control" onChange={this.handleChangeUserName}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form" >
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" id="inputPassword3" onChange={this.handleChangePassword}></input>
                        </div>
                    </div>
                    <div className='signButton form'>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <span className='register'>Not registered? </span>
                        <Link
                            to={{
                                pathname: "./Register",
                                setName: this.props.setName
                            }}><span> to register.</span></Link>
                    </div>
                </form>
            </div>

        )
    }
}
export default Login;