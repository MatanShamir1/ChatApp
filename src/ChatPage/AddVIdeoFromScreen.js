export default function AddVideoFromScreen(props) {
    let constraintObj = { 
        audio: false, 
        video: { 
            facingMode: "user", 
            width: { min: 300, ideal: 450, max: 1920 },
            height: { min: 420, ideal: 500, max: 1080 } 
        } 
    }; 
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function(mediaStreamObj) {
        //connect the media stream to the first video element
        let video = document.querySelector('video');
        if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
        } else {
            //old version
            video.src = window.URL.createObjectURL(mediaStreamObj);
        }
        
        video.onloadedmetadata = function(ev) {
            //show in the video element what is being captured by the webcam
            video.play();
        };
        
        //add listeners for saving video/audio
        let start = document.getElementById('btnStart');
        let stop = document.getElementById('btnStop');
        let vidSave = document.getElementById('vid2');
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];
        
        start.addEventListener('click', (ev)=>{
            mediaRecorder.start();
            console.log(mediaRecorder.state);
        })
        stop.addEventListener('click', (ev)=>{
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
        });
        mediaRecorder.ondataavailable = function(ev) {
            chunks.push(ev.data);
        }
        mediaRecorder.onstop = (ev)=>{
            let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            vidSave.src = videoURL;
        }
    })
    .catch(function(err) { 
        console.log(err.name, err.message); 
    });

        return (
            <div>  
            <button id="btnStart">START RECORDING</button>
            <button id="btnStop">STOP RECORDING</button>
            <video controls></video>
            <video id="vid2" controls></video>
            </div>
        );


}