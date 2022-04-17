import React, { Component } from "react";
import Message from "./Message";
import contactList from "./contactList";
import './MessageList.css';
import AddVideoOrImagePopUp from "./AddVideoOrImagePopUp";
import { Modal } from 'react-bootstrap';
import AddRecord from "./AddRecord";
import AddVideoFromScreen from "./AddVIdeoFromScreen";
import AddPicFromScreen from "./AddPicFromScreen";

//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.

class MessageList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            onMouseOver: false,
            show: false,
            popUpRecord: false,
            popUpVideoOrImage: false,
            PopUpRecordFromScreen: false,
            popUpImgfromScreen: false
        }
        this.handleClickRecord = this.handleClickRecord.bind(this)
        this.handleClickImgFromScreen = this.handleClickImgFromScreen.bind(this)
        this.onHoverDisplay = this.onHoverDisplay.bind(this)
        this.handlePopData = this.handlePopData.bind(this)
        this.handleClickImage = this.handleClickImage.bind(this)
        this.handleRecordFromScreen = this.handleRecordFromScreen.bind(this)
        this.render = this.render.bind(this)
        this.closeButton = this.closeButton.bind(this)
        this.updateCamera = this.updateCamera.bind(this)
        this.sendBox = React.createRef();
        this.closeCamera = React.createRef();
    }
    componentDidUpdate() {
        var element = document.getElementById("update");
        if (element != null) {
            element.scrollIntoView();
        }
    }
    updateCamera(camera) {
        this.closeCamera = camera;
    }
    closeButton() {
        if (this.closeCamera.current !== null) {
            this.closeCamera.forEach((track) => {
                track.stop();
            });
        }
        this.setState({
            show: false,
            popUpRecord: false,
            popUpVideoOrImage: false,
            PopUpRecordFromScreen: false,
            popUpImgfromScreen: false
        })
    }
    keyDownEvent = (e) => {
        if (e.code === "Enter" && !e.shiftKey) {
            this.sendMessage();
        }
    }
    sendMessage = () => {
        this.sendBox.current.value = this.sendBox.current.value.trim();
        if (this.sendBox.current.value === '' || this.sendBox.current.value === '\n') {
            return;
        }
        var today = new Date();
        var hh = String(today.getHours()).padStart(2, '0');
        var nn = String(today.getMinutes()).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = hh + ":" + nn + ', ' + mm + '/' + dd + '/' + yyyy;
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([this.sendBox.current.value, "text", "snd", today]);
        this.sendBox.current.value = '';
        const index = contactList.indexOf(contact);
        contactList.splice(index, 1);
        contactList.unshift(contact);
        this.props.addMessage();
    }
    onHoverDisplay() {
        this.setState({
            onMouseOver: true
        });
    }
    handleRecordFromScreen() {
        this.setState({
            show: !this.state.show,
            PopUpRecordFromScreen: true
        });
    }
    handleClickImage() {
        this.setState({
            show: !this.state.show,
            popUpVideoOrImage: true
        });
    }
    handleClickRecord() {
        this.setState({
            show: !this.state.show,
            popUpRecord: true
        });
    }
    handleClickImgFromScreen() {
        this.setState({
            show: !this.state.show,
            popUpImgfromScreen: true
        });
    }
    handlePopData(x, y) {
        this.setState({
            show: false,
            popUpRecord: false,
            popUpVideoOrImage: false,
            PopUpRecordFromScreen: false,
            popUpImgfromScreen: false
        })
        const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0];
        contact.messages.push([x, y]);
        this.sendBox.current.value = '';
        this.props.addMessage();
    }


    render() {
        if (this.props.name === '') {
            return (
                <div className="conversation2 bg-successive" />
            )
        } else {
            const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0]
            return (
                <div>
                    <div className="conversation bg-successive your-div container">
                        <div className="card-body msg_card_body row">
                            {contact.messages.map((message, key) => {
                                return <Message userimg={this.props.imgsrc} content={message} source={contact.source} key={key} />
                            })}
                            <span id="update"></span>
                            <Modal show={this.state.show} onHide={this.closeButton} >
                                <Modal.Header closeButton>
                                    {this.state.PopUpRecordFromScreen && (<h3>Send a Video</h3>)}
                                    {this.state.popUpRecord && (<h3>Send a recording</h3>)}
                                    {this.state.popUpVideoOrImage && (<h3>Send an image</h3>)}
                                    {this.state.popUpImgfromScreen && (<h3>Pick an image</h3>)}
                                </Modal.Header>
                                <Modal.Body>
                                    {this.state.PopUpRecordFromScreen && (<AddVideoFromScreen parentCallback={this.handlePopData}></AddVideoFromScreen>)}
                                    {this.state.popUpRecord && (<AddRecord closeCamera={this.updateCamera} parentCallback={this.handlePopData} ></AddRecord>)}
                                    {this.state.popUpVideoOrImage && (<AddVideoOrImagePopUp parentCallback={this.handlePopData} ></AddVideoOrImagePopUp>)}
                                    {this.state.popUpImgfromScreen && (<AddPicFromScreen closeCamera={this.updateCamera} parentCallback={this.handlePopData} ></AddPicFromScreen>)}
                                </Modal.Body>
                            </Modal>
                            <div id="ch"></div>
                        </div>
                    </div>

                    <section className="input-group down box reply msg_cotainer" id="reply">
                        <div className="dropup droppy">
                            <button className="btny" onMouseOver={this.onHoverDisplay}>
                                <i className="bi bi-paperclip bi-size"></i>
                                {this.state.onMouseOver && (
                                    <div className="dropup-content" >
                                        <button className="bi bi-camera-reels btn btn-outline-light" onClick={this.handleRecordFromScreen}></button>
                                        <button className="bi bi-card-image btn btn-outline-light" onClick={this.handleClickImage}></button>
                                        <button className="bi bi-mic-fill btn btn-outline-light" onClick={this.handleClickRecord}></button>
                                        <button className="bi bi-camera-video btn btn-outline-light" onClick={this.handleClickImgFromScreen}></button>
                                    </div>)}
                            </button>
                        </div>
                        <textarea className="form-control rounded-pill droppy resizedTextbox" placeholder="Type your message..." ref={this.sendBox} onKeyDown={this.keyDownEvent} />
                        <span className="input-group-text btny droppy" id="basic-addon1" onClick={this.sendMessage}>
                            <i className="bi bi-arrow-right-circle-fill bi-size-xlarge"></i>
                        </span>
                    </section>
                </div>
            )
        }
    }
}

export default MessageList;