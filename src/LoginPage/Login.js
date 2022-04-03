import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import React, { Component } from "react";
import './Login.css';
let contactList = [
    { username: "Itamar", Password: 1234 },
    { username: "Coral", Password: 1234 },
    { username: "Amit", Password: 1234 }
]

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
        for (var i = 0; i < contactList.length; i++) {
            if (this.state.userName === contactList[i].username && this.state.password == contactList[i].Password) {
                user = contactList[i]
                break;
            }
        }
        if (user != null) {
            this.props.navigate.navigate("../ChatPage/Chat");
        } else {
            return (<div>Login Please</div>);
        }
    }


    render() {
        return (
            <div>
                <h1 id="uppart"></h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row mb-3 form">
                        <label className="col-sm-2 col-form-label" >Username</label>
                        <div className="col-sm-4">
                            <input id='username' className="form-control" onChange={this.handleChangeUserName}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form" >
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" id="inputPassword3" onChange={this.handleChangePassword}></input>
                        </div>
                    </div>
                    <div className='signButton'>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <span className='register'>Not registered? </span>
                        <Link to='/Register'>Click here</Link>
                        <span> to register.</span>
                    </div>
                </form>
            </div>

        )
    }
}
export default Login;