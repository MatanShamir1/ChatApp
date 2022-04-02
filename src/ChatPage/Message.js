import React, { Component } from "react";
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class Message extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            //we get as a prop, a text message, and an image.
            <div className="card-body p-4" >
                <div className="d-flex align-items-baseline mb-4 ">
                    <div className="position-relative avatar down-div">
                        <img src={this.props.source} alt="Avatar" className="circular-square"></img>
                    </div>
                    <div className="pe-2">
                        <div className="card d-inline-block">{this.props.content}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Message;