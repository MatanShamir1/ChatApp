import React, { Component } from "react";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import AddContactPopUp from "./AddContactPopUp.js";
import { Modal } from 'react-bootstrap';
import { Navigate } from "react-router-dom"
import Recognition from "./Recognition";
import axios from "axios";
import CartIcon from '../images/jon_snow.jpg';
import { HubConnectionBuilder , LogLevel } from '@microsoft/signalr';
//you can write rce and it gives you a class template!
//create a construnnctor using the keyword rconst.
//shift+alt+f formatting!
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            remote_server:'',
            isAdd: false,
            nickname: '',
            lastMessage: '' , 
            firstTime : true , 
            is_adding: false, 
            source: CartIcon , 
            connection : ''
        }
        this.handlerMessage = this.handlerMessage.bind(this);
        this.child = React.createRef();
        this.getContact = React.createRef();
    }
    setChat = (username, remote_server, x) => {
        var new_username = username;
        //we deleted a contact
        if(x===2){
            if(username === this.state.username){
                new_username = '';
            }
        }
        
        this.setState({
            remote_server:remote_server,
            username: new_username,
            is_adding:false
        })
    }
    async handlerMessage(user , server){
        // if(user !== undefined ){
        //     if(!this.state.contacts.includes(user)){
        //        await axios.post(`http://localhost:5243/api/contacts`,{
        //         id:user , name: "", server:server
        //         },{withCredentials:true})
        //         .then(res => {
        //             if(res.status === 201){
        //                 return
        //             } else {
        //                 alert("unexcpected behaviour: the contact exists, but your server had a bad response...")
        //                 return;
        //             }
        //         })
        // }
        //     }
        this.forceUpdate()
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

    async componentDidMount(){
    var username = this.props.user;
        // need to  get oonly message so the on is work on contact
    const connection2 = new HubConnectionBuilder().withUrl("http://localhost:5243/ChatHub").configureLogging(LogLevel.Information).build();
    connection2.on("RecieveMessage" , (user , server) => {
        this.handlerMessage(user , server);
        this.getContact.current.check( );
        this.child.current.getSignalr();

    })
    await connection2.start().then(()=>{
        connection2.serverTimeoutInMilliseconds = 100000000000000; 
        this.setState({connection: connection2})
         connection2.invoke("JoinRoom" , username)
    })


}
    logOut = () => {
        this.props.setName('');
        var username = this.props.user;
        this.state.connection.invoke("Remove" , username)
    }
        
    render() {
        if (this.props.user === undefined || this.props.user === '' ) {
            return (<Navigate to="../" />);
        }
        var theClass = "out-div";
        if (this.state.isAdd === true) {
            theClass += " trans-out-div";
        }
        // user.nickname need to get from the server , img current need to remove , contact list need to get from th server,
        return (
            <div id="everything">
                <Recognition imgsrc={CartIcon} username={this.props.user} logOut={this.logOut} />
                <Modal show={this.state.isAdd} onHide={this.addContact}>
                    <Modal.Header closeButton >Add a contact</Modal.Header>
                    <Modal.Body >
                        <AddContactPopUp setActive={this.addContact} username = {this.props.user}>
                        </AddContactPopUp>
                    </Modal.Body>
                </Modal>
                <div className={theClass}>
                    <div className="leftMenu ">
                        <Contacts username = {this.props.user} setChat={this.setChat} addContact={this.addContact} is_adding={this.state.is_adding} lastMessage={this.state.lastMessage} ref={this.getContact}/>
                    </div>
                    <div>
                        <MessageList imgsrc={this.props.user.imgsrc} phoneNumber={this.state.username} username={this.props.user}
                         remote_server={this.state.remote_server} isFirstTime={this.state.firstTime} is_adding={this.state.is_adding} addMessage={this.addMessage} connection={this.state.connection} ref={this.child}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Chat; 