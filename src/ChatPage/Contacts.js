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
            curr: ''
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

    render() {
        return (
            <div>
                <Search setSearchQuery={this.setSearchQuery} />
                <div id="contacts" className="card">
                    <ul className="list-group list-group-flush"></ul>
                    {this.state.contacts.map((contact, key) => {
                        let styles = "contact list-group-item list-group-item-action"
                        if (contact.name === this.state.curr) {
                            styles = "contact list-group-item list-group-item-action bg-successive"
                        }
                        return <Contact name={contact.name} message={contact.lastMessage} key={key} applyChat={this.applyChat} styles={styles} news={contact.new} />
                    })}
                </div>
            </div>
        )
    }
}
export default Contacts;