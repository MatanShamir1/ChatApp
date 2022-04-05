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
            isAdd: !this.state.isAdd
        })
    }

    addMessage = (message) => {
        this.setState({
            isAdd: this.state.isAdd
        })
    }

    render() {
        var theClass = "out-div";
        if (this.state.isAdd === true) {
            theClass += " trans-out-div";
        }
        return (
            <div>
                <AddContactPopUp isActive={this.state.isAdd} setActive={this.addContact} />
                <div className={theClass}>
                    <span className="upper-recognition"> Hello, {this.props.username} </span>
                    <div className="leftMenu">
                        <Contacts setChat={this.setChat} addContact={this.addContact} />
                    </div>
                    <div>
                        <MessageList name={this.state.name} addMessage={this.addMessage} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat;