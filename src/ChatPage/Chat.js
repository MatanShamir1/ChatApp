import React, { Component } from "react";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import AddContactPopUp from "./AddContactPopUp.js";
import { Modal } from 'react-bootstrap';
import { Navigate } from "react-router-dom"
import logo from "../images/ChatApp-logos_transparent.png"
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
                    <div id="recognition">
                        <span>
                            <div className="position-relative avatar up-div">
                                <img src={this.props.user.imgsrc} alt="Avatar" className="circular-square"></img>
                                <span>{this.props.user.username}</span>
                            </div>
                            <div className="cent">
                                <img src={logo} className='lit-log' />
                            </div>
                            <button id="log-out" onClick={this.logOut} type="button" className="btn btn-outline-secondary">Log out</button>
                        </span>
                    </div>
                    <Modal show={this.state.isAdd} onHide={this.addContact} >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <AddContactPopUp setActive={this.addContact}>
                            </AddContactPopUp>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
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