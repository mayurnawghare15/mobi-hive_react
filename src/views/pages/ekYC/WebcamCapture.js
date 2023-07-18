import React, { useRef, useEffect } from 'react';
import Webcam from 'webcam-easy';
import * as faceapi from 'face-api.js';

function FaceCapture() {
    const webcamRef = useRef(null);

    useEffect(() => {
        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models')
            ]);
        };

        const startCapture = async () => {
            await loadModels();

            const webcam = new Webcam(webcamRef.current.video, 'user');

            webcam
                .start()
                .then(() => {
                    console.log('Webcam started');
                    captureWhenFaceDetected(webcam);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        const captureWhenFaceDetected = (webcam) => {
            const canvas = faceapi.createCanvasFromMedia(webcamRef.current.video);
            document.body.appendChild(canvas);

            const displaySize = { width: webcam.width, height: webcam.height };
            faceapi.matchDimensions(canvas, displaySize);

            setInterval(async () => {
                const detections = await faceapi
                    .detectSingleFace(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks();

                if (detections) {
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                    faceapi.draw.drawDetections(canvas, resizedDetections);

                    const picture = webcam.snap();
                    const downloadLink = document.createElement('a');
                    downloadLink.href = picture;
                    downloadLink.download = 'snapshot.jpg';
                    downloadLink.click();
                }
            }, 1000); // Capture every second
        };

        startCapture();

        return () => {
            Webcam.stop();
        };
    }, []);

    return <video ref={webcamRef} autoPlay playsInline width="640" height="480" />;
}

export default FaceCapture;
