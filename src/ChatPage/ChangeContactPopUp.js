import React from "react";
import { useRef, useState } from 'react';
import axios from "axios";
function ChangeContactPopUp(props) {
    const [error, setError] = useState('');
    const contactBox = useRef(null);
    const phoneBox = useRef(null);
    const serverBox = useRef(null);
    const saveChanges = async () => {
        //try check with other server
        try {
            await axios.put(`http://${serverBox.current.value}/api/contacts/${props.id}`,{
         name:contactBox.current.value, server:serverBox.current.value
        },{withCredentials:true})
        .then(res => {
            if(res.status === 204){
                getOut();
            } else {
                setError("server couldn't change contact name.")
                return;
            }
        })
        } catch (error) {
            setError("check server name, you probably got it wrong...")
                return;
        }
    }
    const getOut = () => {
        props.change(1);
    }
    return (
        <div>
            <div>
                <div className="row mb-3 form">
                    <label className="col-sm-2 col-form-label add-contact-text" >Contact's new nickname</label>
                    <div className="col-sm-4">
                        <input id='contact-name' ref={contactBox} className="form-control"></input>
                    </div>
                    <label className="col-sm-2 col-form-label add-contact-text" >Contact's current server</label>
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



export default ChangeContactPopUp;