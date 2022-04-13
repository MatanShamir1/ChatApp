
import React, { Component } from "react";
class AddVideoOrImagePopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            flagForImage: false
        };
        this.handleClick = this.handleClick.bind(this)
        this.onImageChange = this.onImageChange.bind(this);
    }
    handleClick() {
        if (this.state.flagForImage) {
            this.props.parentCallback(this.state.image, "image");
        }
        else {
            this.props.parentCallback(this.state.image, "video");
        }

    }
    onImageChange = event => {
        const file = event.target.files[0];
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (validImageTypes.includes(fileType)) {
            if (event.target.files && event.target.files[0]) {
                let img = event.target.files[0];
                this.setState({
                    image: URL.createObjectURL(img),
                    flagForImage: true
                });
            }
        }
        else {
            if (event.target.files && event.target.files[0]) {
                let img = event.target.files[0];
                this.setState({
                    image: URL.createObjectURL(img),
                    flagForImage: false
                });
            }
        }

    };


    render() {
        return (
            <div>
                <input type="file" name="myImage" onChange={this.onImageChange} accept="video/* , image/*" />
                <button className="btn btn-secondary modal__btn" onClick={this.handleClick}> Send</button>
            </div>
        );
    }
}
export default AddVideoOrImagePopUp;