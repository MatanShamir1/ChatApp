import React, { useState, useRef } from "react";
export default function AddRecord(props) {
    const [stream, setStream] = useState({
        access: false,
        recorder: null,
        error: ""
    });

    const [recording, setRecording] = useState({
        active: false,
        available: false,
        url: ""
    });
    const callBack = props.parentCallback;

    const chunks = useRef([]);

    function getAccess() {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((mic) => {
                let mediaRecorder;
                try {
                    mediaRecorder = new MediaRecorder(mic, {
                        mimeType: "audio/webm"
                    });
                } catch (err) {
                    console.log(err);
                }
                props.closeCamera(mic.getTracks()[0])
                const track = mediaRecorder.stream.getTracks()[0];
                track.onended = () => console.log("ended");
                mediaRecorder.onstart = function () {
                    setRecording({
                        active: true,
                        available: false,
                        url: ""
                    });
                };

                mediaRecorder.ondataavailable = function (e) {
                    chunks.current.push(e.data);
                };

                mediaRecorder.onstop = async function () {
                    const url = URL.createObjectURL(chunks.current[0]);
                    chunks.current = [];

                    setRecording({
                        active: false,
                        available: true,
                        url
                    });
                    mic.getTracks()[0].stop();
                };

                setStream({
                    ...stream,
                    access: true,
                    recorder: mediaRecorder
                });
            })
            .catch((error) => {
                setStream({ ...stream, error });
            });
    }
    function handleClick(callBack) {
        callBack(recording.url, "record");
    }
    return (
        <div>
            {stream.access ? (
                <div className="audio-container">
                    <button
                        className={recording.active ? "active btn btn-secondary modal__btn" : "btn btn-secondary modal__btn"}
                        onClick={() => !recording.active && stream.recorder.start()}
                    >
                        Start Recording
                    </button>
                    <button className="btn btn-secondary modal__btn" onClick={() => stream.recorder.stop()}>Stop Recording</button>
                    {recording.available && <audio controls src={recording.url} />}
                    <button className="btn btn-secondary modal__btn" onClick={() => handleClick(callBack)}>Send</button>
                </div>
            ) : (
                <button className="btn btn-secondary modal__btn" onClick={getAccess}>Get Mic Access</button>
            )}
        </div>
    );
}
