
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import React, { Component } from "react";
import './Login.css';
class Login extends Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <h1 id="uppart"></h1>
                <form>
                    <div className="row mb-3 form">
                        <label className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-4">
                            <input id='username' className="form-control"></input>
                        </div>
                    </div>
                    <div className="row mb-3 form">
                        <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" id="inputPassword3"></input>
                        </div>
                    </div>
                    <div className='signButton'>
                        <button type="submit" className="btn btn-primary" onClick={this.handleClick}>Login</button>
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