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
import CartIcon from '../images/jon_snow.jpg';
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
            lastMessage: '',
            disabled: "disabled",
            showError: false,
            contactMessages: [],
            doUpdate: true, 
            noMessages:false
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
        this.getSignalr = this.getSignalr.bind(this)
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

    async sendAllkindOfMessage(x, y) {
        //try to send it to the contact's server first, the server will send it to their user.
        console.log("sending from:")
        console.log(this.props.username);
        console.log("sending to:")
        console.log(this.props.phoneNumber);
        console.log("remote server:")
        console.log(this.props.remote_server);
        console.log("whose url is:")
        console.log(`http://${this.props.remote_server}/api/transfer`);
        
        await axios.post(`http://${this.props.remote_server}/api/transfer`,{
         from:this.props.username , to:this.props.phoneNumber, content: y},{withCredentials:true})
        .then(res => {
            if(res.status === 201){
            
            } else {
                alert("cannot send message to contact... maybe he doesn't exist? or his server went down?")
                return;
            }
        })
        //x is undefined if text message, y is the content.
        await axios.post(`http://localhost:5243/api/contacts/${this.props.phoneNumber}/messages`, { content: y }, { withCredentials: true }, axios.defaults.withCredentials = true)
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        doUpdate: true,
                    });
                    this.props.addMessage(y, false)
                }
                else {
                    alert('message could not be sent');
                }
            })
         var s = this.props.phoneNumber;
    
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
    getSignalr(){
        var url = `http://localhost:5243/api/contacts/${this.props.phoneNumber}/messages`
        axios.get(url, { withCredentials: true }, axios.defaults.withCredentials = true)
        .then(res => {
            if (res.data === 'empty') {
                this.setState({
                    contactMessages: [],
                    lastPhoneNumber: this.props.phoneNumber,
                    noMessages:true
                })
            } else {
                this.setState({
                    contactMessages: res.data,
                    lastMessage: res.data[res.data.length - 1].content,
                    doUpdate: true, 
                    noMessages:false
                })
            }
        });
    }
    componentDidUpdate(prevProps, prevState) {

        if(prevState.noMessages === true){
            return;
        }
        if(this.state.noMessages === true){
            this.setState({
                noMessages: false
            })
            return
        }
        if(this.props.is_adding === true){
            return
        }
        
        if  (this.state.contactMessages[this.state.contactMessages.length - 1] === undefined){
            var url = `http://localhost:5243/api/contacts/${this.props.phoneNumber}/messages`
            axios.get(url, { withCredentials: true }, axios.defaults.withCredentials = true)
            .then(res => {
                if (res.data === 'empty') {
                    this.setState({
                        contactMessages: [],
                        lastPhoneNumber: this.props.phoneNumber,
                        noMessages:true
                    })
                } else {
                    this.setState({
                        contactMessages: res.data,
                        lastMessage: res.data[res.data.length - 1].content,
                        doUpdate: true, 
                        noMessages:false
                    })
                }
            });
            return;
        } else if  (this.state.contactMessages[this.state.contactMessages.length - 1] !== undefined && prevState.contactMessages[prevState.contactMessages.length - 1] === undefined){
            return;
        }
        
        if ((this.state.doUpdate === false || this.props.isFirstTime === false) && (prevProps.phoneNumber === this.props.phoneNumber) &&
         ((this.state.contactMessages[this.state.contactMessages.length - 1].created === prevState.contactMessages[prevState.contactMessages.length - 1].created) || (this.state.doUpdate === false || this.props.isFirstTime === false))) {
            if(this.state.doUpdate === true){

            }else{
            var element = document.getElementById("update");
            if (element != null) {
                element.scrollIntoView();
            }
            return
        }
        }
        var url = `http://localhost:5243/api/contacts/${this.props.phoneNumber}/messages`
        axios.get(url, { withCredentials: true }, axios.defaults.withCredentials = true)
            .then(res => {
                if (res.data === 'empty') {
                    this.setState({
                        contactMessages: [],
                        lastPhoneNumber: this.props.phoneNumber,
                        noMessages:true
                    })
                } else {
                    this.setState({
                        contactMessages: res.data,
                        lastMessage: res.data[res.data.length - 1].content,
                        doUpdate: false , 
                        noMessages:false
                    })
                }
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
                                return <Message userimg={CartIcon} content={message} key={key} />
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