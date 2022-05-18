import React from "react";
import { useRef, useState } from 'react';
import users from '../LoginPage/usersList';
import axios from "axios";
function AddContactPopUp(props) {
    const [error, setError] = useState('');
    const contactBox = useRef(null);
    const phoneBox = useRef(null);
    const serverBox = useRef(null);
    const saveChanges = () => {
        //try check with other server
        axios.post(`http://${serverBox}/api/invitations`,{
         from:this.props.username , to:phoneBox.current.value, server:serverBox.current.value
        },{withCredentials:true})
        .then(res => {
            if(res.status === 201){
            } else {
                setError("contact doesn't exist where you though it did! check server name, you probably got it wrong...")
                return;
            }
        })

        //add contact in our server
        axios.post(`http://localhost:5243/api/contacts`,{
         id:phoneBox.current.value , name:contactBox.current.value, server:serverBox.current.value
        },{withCredentials:true})
        .then(res => {
            if(res.status === 201){
                getOut();
            } else {
                setError("unexcpected behaviour: the contact exists, but your server had a bad response...")
                return;
            }
        })
    }
    const getOut = () => {
        console.log('what the hell')
        props.setActive();
    }
    return (
        <div>
            <div>
                <div className="row mb-3 form">
                    <label className="col-sm-2 col-form-label add-contact-text" >Contact's id</label>
                    <div className="col-sm-4">
                        <input id='contact-name' ref={contactBox} className="form-control"></input>
                    </div>
                    <label className="col-sm-2 col-form-label add-contact-text" >Contact's nickname</label>
                    <div className="col-sm-4">
                        <input id='contact-name' ref={phoneBox} className="form-control"></input>
                    </div>
                    <label className="col-sm-2 col-form-label add-contact-text" >Contact's server</label>
                    <div className="col-sm-4">
                        <input id='contact-name' ref={serverBox} className="form-control"></input>
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