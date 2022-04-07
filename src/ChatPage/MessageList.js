import React, { Component } from "react";
import Message from "./Message";
import contactList from "./contactList";
import './MessageList.css';
import AddVideoPopUp from "./AddVideoPopUp";
import { Modal } from 'react-bootstrap';
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.

class MessageList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onMouseOver: false,
            show: false,
            image: ''
        }
        this.onHoverDisplay = this.onHoverDisplay.bind(this)
        this.handleChildrenData = this.handleChildrenData.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.render = this.render.bind(this)
        this.sendBox = React.createRef();
    }

    sendMessage = () => {
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([this.sendBox.current.value, "value"]);// maybe not correct
        this.sendBox.current.value = '';
        this.props.addMessage();
    }
    onHoverDisplay() {
        this.setState({
            onMouseOver: true
        });
    }
    handleClick() {
        this.setState({
            show: !this.state.show
        });
    }
    handleChildrenData(x) {
        this.setState({
            show: !this.state.show
        })
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([x, "image"]);// maybe not correct
        this.sendBox.current.value = '';
        this.props.addMessage();
    }
    render() {
        if (this.props.name === '') {
            return (
                <div className="conversation bg-successive" />
            )
        } else {
            const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0]
            return (
                <div className="conversation bg-successive">
                    {contact.messages.map((message, key) => {
                        return <Message content={message} source={contact.source} key={key} />
                    })}
                    <Modal show={this.state.show} onHide={this.handleClick} >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <AddVideoPopUp parentCallback={this.handleChildrenData}>
                            </AddVideoPopUp>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                    </Modal>
                    <span className="input-group mb-3 down-div">
                        <div className="dropup">
                            <button className="input-group-text dropbtn" id="basic-addon1" onMouseOver={this.onHoverDisplay}>
                                <i className="bi bi-paperclip"></i>
                                {this.state.onMouseOver && (
                                    <div className="dropup-content" >
                                        <button className="bi bi-camera-reels btn btn-outline-light" onClick={this.handleClick}></button>
                                        <button className="bi bi-card-image btn btn-outline-light" onClick={this.handleClick}></button>
                                        <button className="bi bi-mic-fill btn btn-outline-light"></button>
                                    </div>)}
                            </button>
                        </div>
                        <input type="text" className="form-control contacts" placeholder="Type your message..." ref={this.sendBox} />
                        <span className="input-group-text" id="basic-addon1" onClick={this.sendMessage}>Send</span>
                    </span>
                </div>
            )
        }
    }
}

export default MessageList;