import React, { Component } from "react";
import ChangeContactPopUp from "./ChangeContactPopUp";
import { Modal } from 'react-bootstrap';
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class Contact extends Component {

    constructor(props) {
        super(props)
        this.state={
            isAdd:false
        }
        this.changeState = this.changeState.bind(this)
        this.edit = this.edit.bind(this)  
    }
    //only make it active in this function. the others' functions should make this unselected.
    changeState(x) {
        if(x === 1){
            this.setState({
                isAdd: false
            })
        }
        this.props.applyChat(this.props.realName ,x);
  
    }
    edit(){
        this.setState({
            isAdd : !this.state.isAdd
        })
    }
    render() {
        // setActive={this.addContact} username = {this.props.user}
        let message = this.props.message.length<25 ? this.props.message : this.props.message.substring(0,23)+"..."
        return (
            <div>
                <button style={{"float": "right" ,"height": "100%"}} className="bi bi-pencil-fill" onClick={this.edit}></button>
            <li className={this.props.styles}  style={{"width": "94%"}} >
            <Modal show={this.state.isAdd} onHide={this.edit}>
                    <Modal.Header closeButton >change a contact</Modal.Header>
                    <Modal.Body>
                        <ChangeContactPopUp id={this.props.realName}change={this.changeState} username={this.props.username}>
                        </ChangeContactPopUp>
                    </Modal.Body>
            </Modal>
                <div className="ms-2 me-auto" onClick={this.changeState}>
                    {this.props.news !== 0 && (<span className="badge bg-primary rounded-pill to-right">{this.props.news}</span>)}
                    {this.props.oclock !== '' && (<span className="oclock">{this.props.oclock}</span>)}
                    <div className="position-relative avatar cont-div">
                        <img src={this.props.source} alt="Avatar" className="circular-square"></img>
                    </div>
                    <div className="fw-bold">
                        {this.props.viewName}
                    </div>
                    {message}
                </div>

            </li>
            </div> //do that the onclick will set this to true. it is essential to use () => because the function should know what is the component, "this".
        )

    }
}
export default Contact;