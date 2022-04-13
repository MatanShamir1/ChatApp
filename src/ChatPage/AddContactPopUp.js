import React, { Component } from "react";
import { useRef } from 'react';
import Message from "./Message";
import contactList from "./contactList";
import friend_img from "../images/default_friend_img.jpg"
//you can write rce and it gives you a className template!
//create a constructor using the keyword rconst.
function AddContactPopUp(props) {
    const contactBox = useRef(null);
    const phoneBox = useRef(null);
    var theClass = 'modal pop-up-exist';
    if (props.isActive === false) {
        theClass = 'modal pop-up-not-exist'
    }
    const saveChanges = () => {
        contactList.push({
            name: contactBox.current.value, messages: [], new: 0, source: friend_img
        })
        getOut();
    }
    const getOut = () => {
        props.setActive();
    }
    return (
        <div>
            <div>
                <div className="row mb-3 form">
                    <label className="col-sm-2 col-form-label add-contact-text" >Contact name</label>
                    <div className="col-sm-4">
                        <input id='contact-name' ref={contactBox} className="form-control"></input>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary modal__btn" data-bs-dismiss="modal" onClick={getOut}>Close</button>
                <button type="button" className="btn btn-primary modal__btn" onClick={saveChanges}>Save changes</button>
            </div>
        </div>
    )
}



export default AddContactPopUp;