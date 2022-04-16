import React, { Component } from "react";
import Contact from "./Contact.js"
import Search from "./Search"
import contactList from "./contactList";
//you can write rce and it gives you a class template!
//create a constructor using the keyword rconst.
class Contacts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: contactList,
            curr: '',
        }
        this.render = this.render.bind(this)
    }
    setSearchQuery = (q) => {
        this.setState(
            { contacts: contactList.filter((contact) => contact.name.includes(q)) }
        )
    }

    applyChat = (name) => {
        this.props.setChat(name);
        for (var i = 0, iLen = contactList.length; i < iLen; i++) {
            if (contactList[i].name == name) {
                contactList[i].new = 0;
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
                        console.log(contact.messages.at(-1)[0]);
                        const message = contact.messages.length===0?'': contact.messages.at(-1)[0].indexOf("blob:") !== -1 ? "attachment" : contact.messages.at(-1)[0]
                        const oclock = contact.messages.length===0?'': contact.messages.at(-1)[3];
                        return <Contact source={contact.source} name={contact.name} message={message} key={key} applyChat={this.applyChat} styles={styles} news={contact.new} oclock={oclock}/>
                    })}
                </div>
            </div>
        )
    }
}
export default Contacts;