import React, { Component } from "react";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import AddContactPopUp from "./AddContactPopUp.js";
import { Modal } from 'react-bootstrap';
import { Navigate } from "react-router-dom"
import Recognition from "./Recognition";
import axios from "axios";

//you can write rce and it gives you a class template!
//create a constructor using the keyword rconst.
//shift+alt+f formatting!
class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            isAdd: false,
            nickname: '',
            lastMessage: '' , 
            firstTime : true , 
            is_adding: false
        }
    }

    setChat = (username) => {
        this.setState({
            username: username,
            is_adding:false
        })
    }

    addContact = () => {
        this.setState({
            isAdd: !this.state.isAdd , 
            is_adding: true
        })
    }

    addMessage = (message , first) => {
        this.setState({
            isAdd: this.state.isAdd,
            lastMessage: message , 
            firstTime : first, 
            is_adding:false
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
        // user.nickname need to get from the server , img current need to remove , contact list need to get from th server,
        return (
            
            <div id="everything">
                <Recognition imgsrc={this.props.user.imgsrc} username={this.props.user} logOut={this.logOut} />
            
                <Modal show={this.state.isAdd} onHide={this.addContact}>
                    <Modal.Header closeButton >Add a contact</Modal.Header>
                    <Modal.Body >
                        <AddContactPopUp setActive={this.addContact} username = {this.props.user}>
                        </AddContactPopUp>
                    </Modal.Body>
                </Modal>
                <div className={theClass}>
                    <div className="leftMenu ">
                        <Contacts setChat={this.setChat} addContact={this.addContact} is_adding={this.state.is_adding} lastMessage={this.state.lastMessage}/>
                    </div>
                    <div>
                        <MessageList imgsrc={this.props.user.imgsrc} phoneNumber={this.state.username} username={this.props.user} isFirstTime={this.state.firstTime} is_adding={this.state.is_adding} addMessage={this.addMessage}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat; 