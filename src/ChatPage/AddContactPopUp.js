import React, { Component } from "react";
import Message from "./Message";
import contactList from "./contactList";
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
class AddContactPopUp extends Component {
    constructor(props) {
        super(props)
        this.render = this.render.bind(this)
    }

    render() {
        if (this.props.isActive === false) {
            return (
                <></>
            )
        } else {
            return (
                <div className="modal pop-up" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title add-contact">Add Contact</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.props.setActive}></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="row mb-3 form">
                                        <label className="col-sm-2 col-form-label add-contact-text" >Contact name</label>
                                        <div className="col-sm-4">
                                            <input id='contact-name' className="form-control" onChange={this.handleChangeUserName}></input>
                                        </div>
                                    </div>
                                    <div className="row mb-3 form" >
                                        <label className="col-sm-2 col-form-label add-contact-text">Contact phone number</label>
                                        <div className="col-sm-4">
                                            <input id='contact-num' className="form-control" onChange={this.handleChangeUserName}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.props.setActive}>Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AddContactPopUp;