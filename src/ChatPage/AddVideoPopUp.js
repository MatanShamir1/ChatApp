
import React, { Component } from "react";
class AddVideoPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        };
        this.handleClick = this.handleClick.bind(this)
        this.onImageChange = this.onImageChange.bind(this);
    }
    handleClick() {
        this.props.parentCallback(this.state.image, this.props.show);
    }
    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };


    render() {
        return (
            <div>
                <input type="file" name="myImage" onChange={this.onImageChange} />
                <img src={this.state.image} />
                <button onClick={this.handleClick}> click</button>
            </div>
        );
    }
}
export default AddVideoPopUp;