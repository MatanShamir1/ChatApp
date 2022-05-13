import React, { Component } from "react";
import Contact from "./Contact.js"
import Search from "./Search"
import axios from 'axios'

//you can write rce and it gives you a class template!
//create a constructor using the keyword rconst.
class Contacts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            curr: ''
        }
        this.render = this.render.bind(this)
    }
    setSearchQuery = (q) => {
        this.setState(
            { contacts: this.props.contactList.filter((contact) => contact.name.includes(q)) }
        )
    }

    componentDidMount(){
        axios.get(`https://localhost:7243/api/contacts`, )
        .then(res => {
            console.log('this is ther contacts:');
            console.log(res);
        });
    }

    applyChat = (username, name) => {
        this.props.setChat(username);
        for (var i = 0, iLen = this.props.contactList.length; i < iLen; i++) {
            if (this.props.contactList[i].name === name) {
                this.props.contactList[i].new = 0;
            }
        }
        this.setState({
            curr: name
        })
    }

    addContact = () => {
        this.props.addContact();
    }

    render() {
        return (
            <div>
                <Search setSearchQuery={this.setSearchQuery} addContact={this.addContact} />
                <div id="contacts" className="card">
                    <ul className="list-group list-group-flush"></ul>
                    {this.state.contacts.map((contact, key) => {
                        let styles = "contact btn btn-outline-secondary"
                        if (contact.name === this.state.curr) {
                            styles = "contact bg-successive btn btn-outline-secondary"
                        }
                        const message = contact.messages.length===0?'': (contact.messages.at(-1)[0].indexOf("blob:") !== -1 || contact.messages.at(-1)[0].indexOf("data:") !== -1 || contact.messages.at(-1)[0].indexOf("/static") !== -1) ? "attachment" : contact.messages.at(-1)[0]
                        const oclock = contact.messages.length===0?'': contact.messages.at(-1)[3];
                        return <Contact source={contact.source} name={contact.name} username={contact.phoneNumber} message={message} key={key} applyChat={this.applyChat} styles={styles} news={contact.new} oclock={oclock}/>
                    })}
                </div>
            </div>
        )
    }
}
export default Contacts;