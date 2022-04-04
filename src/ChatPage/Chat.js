import React, { Component } from "react";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
//you can write rce and it gives you a class template!
//create a constructor using the keyword rconst.
//shift+alt+f formatting!
class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name:''
        }
    }

    setChat = (name) => {
        this.setState ({
            name:name
        })
    }

    render() {
        return (
            <div className="out-div">
                <span className="upper-recognition"> Hello, {this.props.username} </span>
                <div className="leftMenu">
                    <Contacts setChat={this.setChat} />
                </div>
                <div>
                    <MessageList name={this.state.name}/>
                </div>
            </div>
        )
    }
}
export default Chat;