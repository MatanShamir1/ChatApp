
import React, { Component } from "react";
import contactList from "./contactList";
class AddVideoPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
    this.handleClick = this.handleClick.bind(this)
    this.onImageChange = this.onImageChange.bind(this);
  }
  handleClick() {
    this.props.parentCallback(this.state.image);
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
        <div>
          <div>
            <input type="file" name="myImage" onChange={this.onImageChange} />
            <img src={this.state.image} />
            <button onClick={this.handleClick}> click</button>
          </div>
        </div>
      </div>
    );
  }
}
export default AddVideoPopUp;