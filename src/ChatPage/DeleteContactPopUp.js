import React from "react";
import { useRef, useState } from 'react';
import axios from "axios";
function DeleteContactPopUp(props) {
    const [error, setError] = useState('');
    const contactBox = useRef(null);
    const phoneBox = useRef(null);
    const serverBox = useRef(null);
    const saveChanges = async () => {
        //try check with other server
        await axios.delete(`http://localhost:5243/api/contacts/${props.id}`,{
        },{withCredentials:true})
        .then(res => {
            if(res.status === 204){
                getOut();
            } else {
                setError("contact doesn't exist where you though it did! check server name, you probably got it wrong...")
                return;
            }
        })

    }
    const getOut = () => {
        props.change(2);
    }
    return (
        <div>
        <div>
            <div className="row mb-3 form">
                <label className="col-sm-2 col-form-label add-contact-text" >Are you sure?</label>
                <div className="col-sm-4">
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



export default DeleteContactPopUp;