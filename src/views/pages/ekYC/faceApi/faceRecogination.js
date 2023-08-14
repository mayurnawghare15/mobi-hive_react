import React, { useRef, useEffect, useState } from 'react';
import './style.css';
import * as faceapi from 'face-api.js';

function FaceRecognition() {
    const videoRef = useRef();
    const canvasRef = useRef();
    const [capturedImage, setCapturedImage] = useState('');
    const [cameraOn, setCameraOn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        loadModels();
        startVideo();

        return () => {
            stopVideo();
        };
    }, []);

    const loadModels = async () => {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
    };

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = handleVideoLoaded;
                // videoRef.current.setAttribute('height', '400');
                // videoRef.current.setAttribute('width', '400');
                videoRef.current.play();
                // videoRef.current.videoWidth = 400;
                // videoRef.current.videoHeight = 400;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const stopVideo = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
    };

    const handleVideoLoaded = () => {
        setCameraOn(true);
        faceDetection();
    };

    const faceDetection = async () => {
        let isFaceDetected = false;

        const timerId = setInterval(async () => {
            if (!videoRef.current || !videoRef.current.videoWidth || !videoRef.current.videoHeight) {
                return;
            }

            const detections = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            // console.log(videoRef.current.videoWidth, videoRef.current.videoHeight, '----------------------');
            // const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
            // console.log(displaySize + 'DisplaySize');
            // console.log(canvasRef + 'CanvasRef');
            // faceapi.matchDimensions(videoRef.current, displaySize);
            // const resizedDetections = faceapi.resizeResults(detections, displaySize);

            // canvasRef.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
            // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

            if (detections) {
                if (!isFaceDetected) {
                    captureImage();
                    isFaceDetected = true;
                    setShowConfirmation(true);
                }
            } else {
                isFaceDetected = false;
                setShowConfirmation(false);
            }
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    };

    const captureImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');

        setCapturedImage(dataUrl);
        setCameraOn(false);
        setShowConfirmation(false);
        alert('Image Captured');
    };

    const cancelCapture = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="app-container">
            <div className="app-video">
                {cameraOn && <video style={{ width: '400px', height: '400px' }} crossOrigin="anonymous" ref={videoRef} autoPlay></video>}
                <canvas ref={canvasRef} className={`app-canvas ${cameraOn ? '' : 'hidden'}`} />
                {!cameraOn && capturedImage && <img src={capturedImage} alt="Captured" />}
            </div>
            {cameraOn && (
                <>
                    {!showConfirmation && (
                        <button onClick={captureImage} disabled={!cameraOn}>
                            Capture Image
                        </button>
                    )}
                    {showConfirmation && (
                        <div>
                            <p>Are you sure you want to continue?</p>
                            <button onClick={captureImage}>Yes</button>
                            <button onClick={cancelCapture}>No</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default FaceRecognition;
