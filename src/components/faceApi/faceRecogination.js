import { useRef, useEffect } from 'react';
import './style.css';
import * as faceapi from 'face-api.js';

function FaceRecogination() {
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        startVideo();
        videoRef && loadModels();
    }, []);

    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]).then(() => {
            faceDetection();
        });
    };

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

    const faceDetection = async () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());

            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);
            faceapi.matchDimensions(canvasRef.current, {
                width: 940,
                height: 650
            });

            const resizedDetections = faceapi.resizeResults(detections, {
                width: 940,
                height: 650
            });

            canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);

            if (resizedDetections.length > 0) {
                const imageCapture = new ImageCapture(videoRef.current.srcObject.getVideoTracks()[0]);
                const capturedImage = await imageCapture.grabFrame();

                const blob = await imageToBlob(capturedImage);

                const formData = new FormData();
                formData.append('image', blob, 'captured_image.png');

                fetch('/save-image', {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => {
                        // Handle the response from the server
                    })
                    .catch((error) => {
                        // Handle any errors that occurred during the request
                    });
            }
        }, 1000);
    };

    const imageToBlob = async (image) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            canvas.toBlob((blob) => {
                resolve(blob);
            });
        });
    };

    return (
        <div className="app">
            <h1>Profile Photo</h1>
            <div className="app__video">
                <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
            </div>
            <canvas ref={canvasRef} width="940" height="650" className="app__canvas" />
        </div>
    );
}

export default FaceRecogination;
