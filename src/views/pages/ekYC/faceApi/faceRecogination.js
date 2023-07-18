import { useRef, useEffect, useState } from 'react';
import './style.css';
import * as faceapi from 'face-api.js';

function FaceRecognition() {
    const videoRef = useRef();
    const canvasRef = useRef();
    const [capturedImage, setCapturedImage] = useState('');
    const [cameraOn, setCameraOn] = useState();

    useEffect(() => {
        startVideo();
        videoRef && loadModels();
    }, []);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const loadModels = async () => {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        faceDetection();
    };

    const faceDetection = async () => {
        let isFaceDetected = false;

        setInterval(async () => {
            const detections = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            const displaySize = { width: videoRef.current.offsetWidth, height: videoRef.current.offsetHeight };
            faceapi.matchDimensions(canvasRef.current, displaySize);

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvasRef.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

            if (detections) {
                if (!isFaceDetected) {
                    isFaceDetected = true;
                    captureImage();
                }
            } else {
                isFaceDetected = false;
            }
        }, 1000);
    };

    const captureImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setCapturedImage(dataUrl);
        setCameraOn(false);
    };
    const handleVideoLoaded = () => {
        setCameraOn(true);
    };

    return (
        <div className="app-container">
            <div className="app-video">
                {cameraOn && <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>}
                <canvas ref={canvasRef} className={`app-canvas ${cameraOn ? '' : 'hidden'}`} />
                {!cameraOn && capturedImage && <img src={capturedImage} alt="Captured" />}
            </div>
            {cameraOn && (
                <button onClick={captureImage} disabled={!cameraOn}>
                    Capture Image
                </button>
            )}
        </div>
    );
}

export default FaceRecognition;
