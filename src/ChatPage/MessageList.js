import React, { Component } from "react";
import Message from "./Message";
import contactList from "./contactList";
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class MessageList extends Component {

    constructor(props) {
        super(props)
        this.render = this.render.bind(this)
    }

    render() {
        if (this.props.name === '') {
            return (
                <div className="conversation bg-successive"/>
            )
        } else {
            const contact = contactList.filter((contact) => contact.name.includes(this.props.name))[0]
            return (
                <div className="conversation bg-successive">
                    {contact.messages.map((message, key) => {
                        return <Message content={message} source={contact.source} key={key}/>
                    })}

                    <span className="input-group mb-3 down-div">
                        <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-paperclip"></i>
                        </span>
                        <input type="text" className="form-control contacts" placeholder="Type your message..." />
                        <span className="input-group-text paperclip" id="basic-addon1">Send</span>
                    </span>
                </div>
            )
        }
    }
}

export default MessageList;