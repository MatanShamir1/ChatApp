export default function AddVideoFromScreen(props) {
    const callBack = props.parentCallback;
    let constraintObj = {
        audio: false,
        video: {
            facingMode: "user",
            width: { min: 300, ideal: 450, max: 1920 },
            height: { min: 420, ideal: 500, max: 1080 }
        }
    };


    navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function (mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                video.srcObject = mediaStreamObj;
            }
            video.onloadedmetadata = function (ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };

            //add listeners for saving video/audio
            let start = document.getElementById('btnStart');
            let stop = document.getElementById('btnStop');
            let vidSave = document.getElementById('vid2');
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];

            start.addEventListener('click', (ev) => {
                mediaRecorder.start();
                console.log(mediaRecorder.state);
            })
            stop.addEventListener('click', (ev) => {
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
            });
            mediaRecorder.ondataavailable = function (ev) {
                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev) => {
                let blob = new Blob(chunks, { 'type': 'video/mp4;' });
                chunks = [];
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
                mediaStreamObj.getTracks()[0].stop();
            }
        })
        .catch(function (err) {
            console.log(err.name, err.message);
        });
    function handleClick(callBack) {
        let vidSave = document.getElementById('vid2');
        callBack(vidSave.src, "video");
    }
    return (
        <div>
            <div class="btn-group">
                <button  id="btnStart" class="btn btn-success" aria-current="page">start record</button>
                <button id="btnStop" class="btn btn-danger">stop record</button>
            </div>
            <video controls></video>
            <video id="vid2" controls></video>
            <button onClick={() => handleClick(callBack)}>send</button>
        </div>
    );


}