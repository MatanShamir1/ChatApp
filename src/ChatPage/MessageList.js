import React, { Component } from "react";
import Message from "./Message";
import contactLists from "./contactLists";
import './MessageList.css';
import AddVideoOrImagePopUp from "./AddVideoOrImagePopUp";
import { Modal, ModalFooter } from 'react-bootstrap';
import AddRecord from "./AddRecord";
import AddVideoFromScreen from "./AddVIdeoFromScreen";
import AddPicFromScreen from "./AddPicFromScreen";
import axios from "axios";
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
            popUpImgfromScreen: false,
            record: false,
            doUpdate: true,
            disabled: "disabled",
            showError: false,
            contactMessages: []
        }
        this.startRecording = this.startRecording.bind(this)
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
    startRecording() {
        this.setState({
            record: !this.state.record,
            disabled: ""
        })
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
            popUpImgfromScreen: false,
            record: false,
            disabled: "disabled",
            showError: false
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
        this.sendAllkindOfMessage(undefined, this.sendBox.current.value);
    }

    sendAllkindOfMessage(x, y) {
        //x is undefined if text message, y is the content.
        axios.post(`http://localhost:5243/api/contacts/${this.props.phoneNumber}/messages`, { content:y },{withCredentials:true})
        .then(res => {
            if(res.status === 201){
                this.setState({
                    doUpdate: true
                });
                this.props.addMessage(y)
            }
            else{
                alert('message could not be sent');
            }
        })

        this.sendBox.current.value = '';
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
            popUpRecord: true,
            disabled: "disabled"

        });
    }
    handleClickImgFromScreen() {
        this.setState({
            show: !this.state.show,
            popUpImgfromScreen: true
        });
    }
    handlePopData(x, y) {
        if (x == null) {
            this.setState({
                showError: true,
                popUpImgfromScreen: false
            })
            return;
        }
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
            popUpImgfromScreen: false,
            record: false,
            disabled: "disabled"
        })
        this.sendAllkindOfMessage(x, y);
    }
    componentDidUpdate() {
        if (this.props.phoneNumber === '') {
            return
        }
        if(this.state.doUpdate === false){
            return
        }
        var url = `http://localhost:5243/api/contacts/${this.props.phoneNumber}/messages`
        axios.get(url, { withCredentials: true })
            .then(res => {
                if(res.data === 'empty') {
                    this.setState({
                        contactMessages: [],
                        lastPhoneNumber: this.props.phoneNumber
                  }) 
                  var element = document.getElementById("update");
                  if (element != null) {
                      element.scrollIntoView();
                  }
                } else{
                this.setState({
                    contactMessages: res.data,
                    doUpdate: false
              })   }
            });
    }
    componentDidMount(){
        var element = document.getElementById("update");
        if (element != null) {
            element.scrollIntoView();
        }
        if (this.props.phoneNumber === '') {
            return
        }
        if(this.state.doUpdate === false){
            return
        }
        var url = `http://localhost:5243/api/contacts/${this.props.phoneNumber}/messages`
        axios.get(url, { withCredentials: true })
            .then(res => {
                if(res.data === 'empty') {
                    this.setState({
                        contactMessages: [],
                        lastPhoneNumber: this.props.phoneNumber
                  }) 
                } else{
                this.setState({
                    contactMessages: res.data,
                    doUpdate: false
              })   }
            });
    }
    render() {
        if (this.props.phoneNumber === '') {
            return (
                <div className="conversation bg-successive" />
            )
        } else {
            return (
                <div>
                    <div className="conversation bg-successive your-div">
                        <div className="card-body msg_card_body row">
                            {this.state.contactMessages.map((message, key) => {
                                console.log(message);
                                 return <Message userimg={this.props.imgsrc} content={message} key={key} />
                            })}
                            <span id="update"></span>
                            <Modal show={this.state.show} onHide={this.closeButton} >
                                <Modal.Header closeButton>
                                    {this.state.popUpRecord && (<h3>Send a recording </h3>)}
                                    {this.state.popUpVideoOrImage && (<h3>Send an image</h3>)}
                                    {this.state.popUpImgfromScreen && (<h3>Take a photo</h3>)}
                                </Modal.Header>
                                <Modal.Body>
                                    {this.state.popUpRecord && (<AddRecord disabled={this.state.disabled} startRecord={this.startRecording} closeCamera={this.updateCamera} parentCallback={this.handlePopData} ></AddRecord>)}
                                    {this.state.popUpVideoOrImage && (<AddVideoOrImagePopUp parentCallback={this.handlePopData} ></AddVideoOrImagePopUp>)}
                                    {this.state.popUpImgfromScreen && (<AddPicFromScreen closeCamera={this.updateCamera} parentCallback={this.handlePopData} ></AddPicFromScreen>)}
                                </Modal.Body>
                                <ModalFooter>
                                    {this.state.showError && (<div className="alert-message">
                                        Please close camera first , exit from pop up and try again.
                                    </div>)}
                                </ModalFooter>
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