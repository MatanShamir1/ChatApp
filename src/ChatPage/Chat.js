import React, { Component } from "react";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import AddContactPopUp from "./AddContactPopUp.js";
import { Modal } from 'react-bootstrap';
import { Navigate } from "react-router-dom"
import Recognition from "./Recognition";
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

    logOut = () => {
        this.props.setName('');
    }


    render() {
        if (this.props.user === undefined) {
            return (<Navigate to="../" />);
        }
        var theClass = "out-div";
        if (this.state.isAdd === true) {
            theClass += " trans-out-div";
        }
        return (
            <div id="everything">
                <Recognition imgsrc={this.props.user.imgsrc} username={this.props.user.username} logOut={this.logOut} />
                <Modal show={this.state.isAdd} onHide={this.addContact}>
                    <Modal.Header closeButton >Add a contact</Modal.Header>
                    <Modal.Body >
                        <AddContactPopUp setActive={this.addContact}>
                        </AddContactPopUp>
                    </Modal.Body>
                </Modal>
                <div className={theClass}>
                    <div className="leftMenu ">
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