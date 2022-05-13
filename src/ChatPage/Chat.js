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
            username: '',
            isAdd: false,
            nickname: '',
            contactList: []
        }
    }

    setChat = (username) => {
        this.setState({
            username: username
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
    componentDidMount(){
        // axios.post(`https://localhost:7243/api/users/Login`, )
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
        //  
        return (
            <div id="everything">
                <Recognition imgsrc={this.props.user.imgsrc} username={this.props.user.nickname} logOut={this.logOut} />
                <Modal show={this.state.isAdd} onHide={this.addContact}>
                    <Modal.Header closeButton >Add a contact</Modal.Header>
                    <Modal.Body >
                        <AddContactPopUp setActive={this.addContact} username = {this.props.user} contactList={this.props.contactList}>
                        </AddContactPopUp>
                    </Modal.Body>
                </Modal>
                <div className={theClass}>
                    <div className="leftMenu ">
                        <Contacts setChat={this.setChat} addContact={this.addContact} contactList={this.props.contactList}/>
                    </div>
                    <div>
                        <MessageList imgsrc={this.props.user.imgsrc} phoneNumber={this.state.username} username={this.props.user.username} addMessage={this.addMessage} contactList={this.props.contactList}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat;