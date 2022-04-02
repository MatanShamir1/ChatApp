import React, { Component } from "react";
import Contact from "./Contact";
import Contacts from "./Contacts";
import Search from "./Search.js"
import contactList from "./contactList";
import Message from "./Message";
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
        this.render = this.render.bind(this)
    }

    setChat = (name) => {
        this.setState ({
            name:name
        })
    }

    render() {
        return (
            <div className="container">
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