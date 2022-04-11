import React, { Component } from "react";
import Message from "./Message";
import contactList from "./contactList";
import './MessageList.css';
import AddVideoPopUp from "./AddVideoPopUp";
import { Modal } from 'react-bootstrap';
import AddRecord from "./AddRecord";
import AddVideoFromScreen from "./AddVIdeoFromScreen";

//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.

class MessageList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onMouseOver: false,
            show: false,
            showSomething: "",
            showRecord: "",
            popUpRecord: false,
            popUpVideoOrImage: false
        }
        this.handleClickRecord = this.handleClickRecord.bind(this)
        this.onHoverDisplay = this.onHoverDisplay.bind(this)
        this.handlePopData = this.handlePopData.bind(this)
        this.handleClickImage = this.handleClickImage.bind(this)
        this.render = this.render.bind(this)
        this.closeButton = this.closeButton.bind(this)
        this.sendBox = React.createRef();
    }
    closeButton() {
        this.setState({
            show: !this.state.show,
            showSomething: "",
            showRecord: "",
            popUpRecord: false,
            popUpVideoOrImage: false
        })
    }
    keyDownEvent = (e) => {
        if (e.code === "Enter" && !e.shiftKey) {
            this.sendMessage();
        }
        this.sendBox.style.height = "auto";
        let scHeight = e.target.scrollHeight;
        this.sendBox.style.height = `${scHeight}px`;
    }
    sendMessage = () => {
        if (this.sendBox.current.value === '') {
            return;
        }
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([this.sendBox.current.value, "text"]);
        this.sendBox.current.value = '';
        this.props.addMessage();
    }
    onHoverDisplay() {
        this.setState({
            onMouseOver: true
        });
    }
    handleClickImage() {
        this.setState({
            show: !this.state.show,
            showSomething: "video",
            popUpVideoOrImage: true
        });
    }
    handleClickRecord() {
        this.setState({
            show: !this.state.show,
            showRecord: "record",
            popUpRecord: true
        });
    }
    handlePopData(x, y) {
        this.setState({
            show: !this.state.show,
            showSomething: "",
            showRecord: "",
            popUpVideoOrImage: false,
            popUpRecord: false
        })
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([x, y]);
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
                <div className="conversation bg-successive overflow-auto your-div">
                    <div>
                        {contact.messages.map((message, key) => {
                            return <Message content={message} source={contact.source} key={key} />
                        })}
                        <Modal show={this.state.show} onHide={this.closeButton} >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                {this.state.popUpVideoOrImage && (<AddVideoFromScreen show={this.state.showRecord} parentCallback={this.handlePopData}></AddVideoFromScreen>)}
                                {this.state.popUpRecord && (<AddRecord show={this.state.showRecord} parentCallback={this.handlePopData} ></AddRecord>)}
                                {this.state.popUpVideoOrImage && (<AddVideoPopUp show={this.state.showSomething} parentCallback={this.handlePopData}></AddVideoPopUp>)}
                            </Modal.Body>
                            <Modal.Footer></Modal.Footer>
                        </Modal>
                        <span className="input-group mb-2 down rounded-pill">
                            <div className="dropup droppy">
                                <button className="input-group-text dropbtn rounded-pill" id="basic-addon1" onMouseOver={this.onHoverDisplay}>
                                    <i className="bi bi-paperclip bi-size"></i>
                                    {this.state.onMouseOver && (
                                        <div className="dropup-content" >
                                            <button className="bi bi-camera-reels btn btn-outline-light" onClick={this.handleClickImage}></button>
                                            <button className="bi bi-card-image btn btn-outline-light" onClick={this.handleClickImage}></button>
                                            <button className="bi bi-mic-fill btn btn-outline-light" onClick={this.handleClickRecord}></button>
                                        </div>)}
                                </button>
                            </div>
                            <textarea className="form-control rounded-pill droppy resizedTextbox" placeholder="Type your message..." ref={this.sendBox} onKeyDown={this.keyDownEvent} />
                            <span className="input-group-text rounded-pill droppy" id="basic-addon1" onClick={this.sendMessage}>
                                <i className="bi bi-arrow-right-short bi-size-xlarge"></i>
                            </span>
                        </span>
                    </div>

                </div>
            )
        }
    }
}

export default MessageList;