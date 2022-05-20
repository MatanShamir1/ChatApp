import React, { Component } from "react";
import Contact from "./Contact.js"
import Search from "./Search"
import axios from 'axios'
import CartIcon from '../images/jon_snow.jpg';
//you can write rce and it gives you a class template!
//create a constructor using the keyword rconst.
class Contacts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            contacts2: [],
            curr: '',
            dontUpdate: false, 
            source : CartIcon
        }
        this.render = this.render.bind(this)
        this.check =  this.check.bind(this)
    }
    setSearchQuery = (q) => {
        this.setState(
        { contacts2: this.state.contacts.filter((contact) => contact.name.includes(q)) })
    }

    check() {
        axios.get(`http://localhost:5243/api/contacts`, { withCredentials: true })
            .then(res => {
                this.setState({
                    contacts: res.data,
                    contacts2: res.data
                })
            });
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.dontUpdate === true) {
            return;
        }
        if (this.state.dontUpdate === true) {
            this.setState({
                dontUpdate: false
            })
            return
        }
        if (prevProps.lastMessage === this.props.lastMessage && !this.props.is_adding) {
            return;
        }
        axios.get(`http://localhost:5243/api/contacts`, { withCredentials: true })
            .then(res => {
                var setter = false;
                if (this.props.is_adding) {
                    setter = true;
                }
                this.setState({
                    contacts: res.data,
                    contacts2:res.data , 
                    dontUpdate: setter
                })
            });
    }

    componentDidMount() {
        axios.get(`http://localhost:5243/api/contacts`, { withCredentials: true })
            .then(res => {
                this.setState({
                    contacts: res.data,
                    contacts2:res.data
                })
            });
    }

    applyChat = (name ,x ) => {
        if (x === 1) {
            this.check()
        }
        if (x === 2) {
            this.check()
        }
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
                    {this.state.contacts2.map((contact, key) => {
                        let styles = "contact btn btn-outline-secondary"
                        if (contact.name === this.state.curr) {
                            styles = "contact bg-successive btn btn-outline-secondary"
                        }
                        // source={contact.source} name={contact.name} , news={contact.new}   oclock={oclock}
                        return <Contact source={this.state.source}  username={this.props.username} viewName={contact.name} realName={contact.id} key={key} applyChat={this.applyChat} styles={styles} message={contact.last} oclock={contact.lastdate} />
                    })}
                </div>
            </div>
        )
    }
}
export default Contacts;