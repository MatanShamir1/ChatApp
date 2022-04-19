import React from "react";
import { useRef, useState } from 'react';
import users from '../LoginPage/usersList';

function AddContactPopUp(props) {
    const [error, setError] = useState('');
    const contactBox = useRef(null);
    const phoneBox = useRef(null);
    var theClass = 'modal pop-up-exist';
    if (props.isActive === false) {
        theClass = 'modal pop-up-not-exist'
    }
    const saveChanges = () => {
        const user = users.find((user) => {
            return user.username === phoneBox;
        })
        if (user === undefined) {
            setError('There\'s no user with this phone number/username.');
        } else {
            this.props.contactList.push({
                name: contactBox.current.value, phoneNumber:user.username, messages: [], new: 0, source: user.imgsrc //this should be the other user's image...
            })
        }
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
                    <div className="alert-message">
                        {error}
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