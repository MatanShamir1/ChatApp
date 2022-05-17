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

    componentDidUpdate(prevProps){
        if(prevProps.lastMessage === this.props.lastMessage){
            return;
        }
        axios.get(`http://localhost:5243/api/contacts`,{withCredentials:true})
        .then(res => {
                  this.setState({
                        contacts: res.data,
                  })   
        });
    }
    componentDidMount(){
        axios.get(`http://localhost:5243/api/contacts`,{withCredentials:true})
        .then(res => {
                  this.setState({
                        contacts: res.data
                  })   
        });
    }

    applyChat = (name) => {
        this.props.setChat(name);
        // for (var i = 0, iLen = this.props.contactList.length; i < iLen; i++) {
        //     if (this.props.contacts[i].name === name) {
        //         this.props.contacts[i].new = 0;
        //     }
        // }
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
                        // source={contact.source} name={contact.name} , news={contact.new}   oclock={oclock}
                        return <Contact viewName={contact.name} realName={contact.id} key={key} applyChat={this.applyChat} styles={styles}  message={contact.last} oclock={contact.lastdate}/>
                    })}
                </div>
            </div>
        )
    }
}
export default Contacts;