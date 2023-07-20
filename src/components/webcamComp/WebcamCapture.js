import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Dialog, DialogContent, Grid, IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

const WebcamCapture = ({ openCamera, setOpenCamera }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);

    const capture = useCallback(() => {
        const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc);
        console.log(imgSrc);
    }, []);

    const retake = () => {
        setImgSrc(null);
    };

    const handleClosePopup = () => {
        setOpenCamera(false);
    };

    const handleConfirm = () => {
        // Handle confirm action
        console.log('Confirmed');
    };

    return (
        <Dialog open={openCamera} maxWidth="sm" fullWidth>
            <DialogContent>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton aria-label="close" onClick={handleClosePopup}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="container">
                    {imgSrc ? (
                        <img src={imgSrc} alt="webcam" className="photo" />
                    ) : (
                        <Webcam
                            videoConstraints={{ facingMode: mirrored ? 'user' : 'environment' }}
                            mirrored={mirrored}
                            ref={webcamRef}
                            className="webcam"
                            height={350}
                            width={'100%'}
                        />
                    )}

                    <div className="btn-container">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {imgSrc ? (
                                    <Button onClick={retake} disableElevation fullWidth variant="contained" color="secondary">
                                        Retake Photo
                                    </Button>
                                ) : (
                                    <Button disableElevation fullWidth variant="contained" color="secondary" onClick={capture}>
                                        Capture Photo
                                    </Button>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                {imgSrc ? (
                                    <Button disableElevation fullWidth variant="contained" color="success" onClick={handleConfirm}>
                                        Confirm
                                    </Button>
                                ) : (
                                    <Button
                                        disableElevation
                                        fullWidth
                                        color="secondary"
                                        variant={mirrored ? 'contained' : 'outlined'}
                                        onClick={() => setMirrored(!mirrored)}
                                    >
                                        Switch Camera
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WebcamCapture;
