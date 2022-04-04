import React, { Component } from "react";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import AddContactPopUp from "./AddContactPopUp.js";
//you can write rce and it gives you a class template!
//create a constructor using the keyword rconst.
//shift+alt+f formatting!
class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            isAdd: false
        }
    }

    setChat = (name) => {
        this.setState({
            name: name
        })
    }

    addContact = () => {
        this.setState({
            isAdd: true
        })
    }

    render() {
        return (
            <div>
                <AddContactPopUp isActive={this.state.isAdd} />
                <div className="out-div">
                    <span className="upper-recognition"> Hello, {this.props.username} </span>
                    <div className="leftMenu">
                        <Contacts setChat={this.setChat} addContact={this.addContact} />
                    </div>
                    <div>
                        <MessageList name={this.state.name} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat;