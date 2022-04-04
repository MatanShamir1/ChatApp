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
            console.log('here')
            return (
                <></>
            )
        } else {
            console.log('there')
            return (
                <div className="modal pop-up" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="row mb-3 form">
                                        <label className="col-sm-2 col-form-label" >Username</label>
                                        <div className="col-sm-4">
                                            <input id='username' className="form-control" onChange={this.handleChangeUserName}></input>
                                        </div>
                                    </div>
                                    <div className="row mb-3 form" >
                                        <label className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-4">
                                            <input type="password" className="form-control" id="inputPassword3" onChange={this.handleChangePassword}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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