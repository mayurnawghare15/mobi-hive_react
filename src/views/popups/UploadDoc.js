import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    button: {
        marginTop: theme.spacing(2)
    },
    preview: {
        maxWidth: '100%',
        maxHeight: 200,
        marginTop: theme.spacing(2)
    }
}));

export default function AlertDialog({ open, handleClose }) {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    const handleUpload = () => {
        // Perform the upload logic here
        console.log('File uploaded:', selectedFile);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'Upload File'}</DialogTitle>
            <DialogContent>
                {!selectedFile && (
                    <>
                        <DialogContentText id="alert-dialog-description">Choose a file to upload.</DialogContentText>
                        <div className={classes.root}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="raised-button-file"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="raised-button-file">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                    className={classes.button}
                                >
                                    Drop file or choose file
                                </Button>
                            </label>
                        </div>
                    </>
                )}
                {selectedFile && !isConfirmed && (
                    <>
                        <DialogContentText id="alert-dialog-description">File preview:</DialogContentText>
                        <img src={previewUrl} alt="File Preview" className={classes.preview} />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleConfirm} autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </>
                )}
                {selectedFile && isConfirmed && (
                    <>
                        <DialogContentText id="alert-dialog-description">You are about to upload:</DialogContentText>
                        <img src={previewUrl} alt="File Preview" className={classes.preview} />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleUpload} autoFocus>
                                Upload
                            </Button>
                        </DialogActions>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
