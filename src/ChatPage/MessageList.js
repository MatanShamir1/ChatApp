import React, { Component } from "react";
import Message from "./Message";
import contactLists from "./contactLists";
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
        this.sendAllkindOfMessage = this.sendAllkindOfMessage.bind(this)
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
            if (this.closeCamera.kind === "audio") {
                this.closeCamera.stop();
            }
            else {
                this.closeCamera.forEach((track) => {
                    track.stop();
                });
            }
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
        this.sendAllkindOfMessage(undefined,this.sendBox.current.value);
    }
    sendAllkindOfMessage(x, y) {
        var today = new Date();
        var hh = String(today.getHours()).padStart(2, '0');
        var nn = String(today.getMinutes()).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = hh + ":" + nn + ', ' + mm + '/' + dd + '/' + yyyy;
        const contact = this.props.contactList.find((contact) => contact.phoneNumber.includes(this.props.phoneNumber));
        //update my conversation
        if (typeof x !== 'undefined') {
            contact.messages.push([x, y, "snd", today]);
        }
        else {
            contact.messages.push([y, "text", "snd", today]);
        }

        //update everyone else's conversations with me
        for (var i = 0; i < contactLists.length; i++) {
            if (contactLists[i][0] === this.props.phoneNumber) {
                var contact1 = contactLists[i][1].find((contact1) => {
                    return contact1.phoneNumber === this.props.username;
                })  
                //in this case, i write to someone and he doesn't have me in his contact. need to add me as a phone number contact.
                if(contact1 === undefined){
                    contactLists[i][1].push({name:this.props.username,phoneNumber:this.props.username,messages:[],new:0,source:this.props.imgsrc});
                    contact1 = contactLists[i][1].find((contact1) => {
                        return contact1.phoneNumber === this.props.username;
                    })  
                }
                if (typeof x !== 'undefined') {
                    contact1.messages.push([x, y, "rcv", today]);
                    contact1.new++;
                    const index = contactLists[i][1].indexOf(contact1);
                    contactLists[i][1].splice(index, 1);
                    contactLists[i][1].unshift(contact1);
                }
                else {
                    contact1.messages.push([y, "text", "rcv", today]);
                    contact1.new++;
                    const index = contactLists[i][1].indexOf(contact1);
                    contactLists[i][1].splice(index, 1);
                    contactLists[i][1].unshift(contact1);
                }

            }
            this.sendBox.current.value = '';
            const index = this.props.contactList.indexOf(contact);
            this.props.contactList.splice(index, 1);
            this.props.contactList.unshift(contact);
            this.props.addMessage();
        }
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
        this.sendAllkindOfMessage(x, y);
    }


    render() {
        if (this.props.phoneNumber === '') {
            return (
                <div className="conversation2 bg-successive" />
            )
        } else {
            console.log(this.props.contactList);
            const contact = this.props.contactList.filter((contact) => contact.phoneNumber.includes(this.props.phoneNumber))[0]
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
                                    {this.state.popUpImgfromScreen && (<h3>Take a photo</h3>)}
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