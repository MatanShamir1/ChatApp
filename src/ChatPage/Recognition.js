import React, { Component } from "react";
import logo from "../images/ChatApp-logos_transparent.png"
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class Recognition extends Component {

    render() {
        return (
            <div id="recognition">
                <div className="position-relative avatar up-div">
                    <img src={this.props.imgsrc} alt="Avatar" className="circular-square"></img>
                </div>
                <span id='hello-user'>Hello, {this.props.username}</span>
                <div className="cent">
                    <img src={logo} className='lit-log' />
                </div>
                <a className="btn btn-outline-dark log-out2" href="http://localhost:5243/">Go to Rating</a>
                <button onClick={this.props.logOut} type="button" className="btn btn-outline-dark log-out">Log out</button>
            </div>
        )

    }
}
export default Recognition;