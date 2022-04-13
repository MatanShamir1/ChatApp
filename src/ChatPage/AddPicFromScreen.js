import React from "react";

class AddPicFromScreen extends React.Component {
  constructor() {
    super();

    this.cameraNumber = 0;
    this.saveImage = this.saveImage.bind(this)
    this.state = {
      imageDataURL: null,
    };
  }

  initializeMedia = async () => {
    this.setState({ imageDataURL: null });

    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia Not Implemented"));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    //Get the details of video inputs of the device
    const videoInputs = await this.getListOfVideoInputs();

    //The device has a camera
    if (videoInputs.length) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: {
              exact: videoInputs[this.cameraNumber].deviceId,
            },
          },
        })
        .then((stream) => {
          this.player.srcObject = stream;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("The device does not have a camera");
    }
  };

  capturePicture = () => {
    var canvas = document.createElement("canvas");
    canvas.width = this.player.videoWidth;
    canvas.height = this.player.videoHeight;
    var contex = canvas.getContext("2d");
    contex.drawImage(this.player, 0, 0, canvas.width, canvas.height);
    this.player.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    console.log(canvas.toDataURL());
    this.setState({ imageDataURL: canvas.toDataURL() });
  };

  switchCamera = async () => {
    const listOfVideoInputs = await this.getListOfVideoInputs();
     if (listOfVideoInputs.length === 1) {
    } else {
      alert("The device does not have a camera");
    }
  };

  getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();

    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
  };
  saveImage(){
    this.props.parentCallback(this.state.imageDataURL,"image")
}

render() {
  const playerORImage = Boolean(this.state.imageDataURL) ? (
    <img className="popUp" src={this.state.imageDataURL} alt="cameraPic" />
  ) : (
    <video className="popUp"
      ref={(refrence) => {
        this.player = refrence;
      }}
      autoPlay
    ></video>
  );

  return (
    <div className="AddPicFromScreen">
      {playerORImage}
      <button className="btn btn-primary" onClick={this.initializeMedia}>Take Photo</button>
      <button className="btn btn-secondary" onClick={this.capturePicture}>Capture</button>
      <button className="btn btn-success bt" onClick={this.saveImage}>save</button>
    </div>
  );
}
}


export default AddPicFromScreen;