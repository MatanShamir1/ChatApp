
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import React, { Component } from "react";
import users from './usersList';
import { Navigate } from "react-router-dom"
import './Login.css';
import AddVideoPopUp from '../ChatPage/AddVideoPopUp';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            cpassword: '',
            nickname: '',
            img: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChangeUserName(event) {
        this.setState({ userName: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleChangeCPassword(event) {
        this.setState({ cpassword: event.target.value });
    }
    handleChangeNickname(event) {
        this.setState({ nickname: event.target.value });
    }
    handleImageChange(event) {
        this.setState({ img: URL.createObjectURL(event.target.value) });
    }
    usernameIsValid(username) {
        return /^[A-Za-z0-9_.]+$/.test(username);
    }
    passwordIsValid(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    onSubmit(event) {
        var screenMessage = '';
        console.log(this.state.userName);
        if (!this.usernameIsValid(this.state.userName)) {
            console.log(this.state.userName);
            screenMessage += 'Please use only letters, numbers, and \'_\' or \'.\' for your username.\n';
        }
        if (!this.passwordIsValid(this.state.password)) {
            screenMessage += 'Please use a password that has Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.\n'
        }
        if (!this.state.cpassword === this.state.password) {
            screenMessage += 'Password and confirmation dont match.'
        }
        if (screenMessage != '') {
            alert(screenMessage);
        } else {
            users.push({ username: this.state.userName, password: this.state.password, nickname: this.state.nickname, imgsrc: this.state.img })
            console.log('in onsubmit in register');
            this.props.setName('GO_TO_LOGIN');
        }
    }
    render() {
        return (
            <div id='back-div'>
                <form onSubmit={this.onSubmit}>
                    <div className="row mb-3 form">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-4">
                            <input id='username' className="form-control" onChange={this.handleChangeUserName}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" id="inputPassword3" onChange={this.handleChangePassword}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Confirm password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" id="inputPassword3" onChange={this.handleChangeCPassword}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form">
                        <label className="col-sm-2 col-form-label">Display name</label>
                        <div className="col-sm-4">
                            <input id='username' className="form-control" onChange={this.handleChangeNickname}></input>
                        </div>
                    </div>
                    <div className="row mb-3 form">
                        <label className="col-sm-2 col-form-label">Profile image</label>
                        <div className="col-sm-4">
                            <input type="file" name="myImage" onChange={this.handleImageChange} />
                        </div>
                    </div>
                    <div className='signButton'>
                        <button type="submit" className="btn btn-primary">Register</button>
                        <span className='register'>Already registered? </span>
                        <Link to='../'>Click here</Link>
                        <span> to login.</span>
                    </div>
                </form>
            </div>

        )
    }
}
export default Register;
