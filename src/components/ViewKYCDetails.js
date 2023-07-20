import React, { useState } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import { AppBar, Box, Button, Dialog, DialogContent, Grid, IconButton, Slide, TextField, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import WebcamCapture from './webcamComp/WebcamCapture';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';

const ViewKYCDetails = React.memo(({ open, setOpen, frontSide, backSide, documentType = 'nationalId' }) => {
    const { t } = useTranslation();
    const [serialNumber, setSerialNumber] = useState('');
    const [issueBy, setIssueBy] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [openCamera, setOpenCamera] = useState(false);
    const [imgType, setImgType] = useState('kyc_front');
    const [addressProof, setAddressProof] = useState({ utility: null, affidavit: null, bankStatement: null });
    const [proofOfIncome, setProofOfIncome] = useState({ salarySlip: null, employerCertificate: null, bankStatement: null });
    const { user } = useAuthContext();
    const query = 10;
    const leadId = '468';
    let token = null;
    if (user) {
        token = user.token;
    }
    const [kycFormUpload, setKycFormUpload] = useState({
        kyc_serial_number: '',
        kyc_valid_till: '',
        kyc_type: '',
        issued_date: '',
        issued_by: '',
        kyc_front: '',
        kyc_back: ''
    });
    const { kyc_serial_number, kyc_valid_till, kyc_type, issued_date, issued_by, kyc_front, kyc_back } = kycFormUpload;

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setKycFormUpload({
            ...kycFormUpload,
            [name]: value
        });
    };
    // setIsLoading(true);
    // setUploadDocs(query, token, leadId)
    //     .then((res) => {
    //         if (res) {
    //             setUploadDocs(res.results);
    //             setIsLoading(false);
    //         } else {
    //             setIsLoading(false);
    //             setUploadDocs([]);
    //         }
    //     })
    //     .catch((error) => {
    //         return toast.error('Something went wrong , Please check your internet connection.');
    //     });

    function base64ToJpg(base64Data) {
        const byteString = atob(base64Data.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // Create a Blob object from the ArrayBuffer
        const blob = new Blob([ab], { type: 'image/jpeg' });

        // Create a File object from the Blob
        const jpgFile = new File([blob], 'output.jpg', { type: 'image/jpeg' });

        return jpgFile;
    }

    const handleImages = (value) => {
        // Convert base64 to JPG file using the base64ToJpg function
        console.log(value);
        const jpgFile = base64ToJpg(value);

        // Assuming kycFormUpload is your current state
        // Update the state based on imgType
        if (imgType === 'kyc_front') {
            setKycFormUpload({
                ...kycFormUpload,
                kyc_front: jpgFile
            });
        } else {
            setKycFormUpload({
                ...kycFormUpload,
                kyc_back: jpgFile
            });
        }
    };
    if (documentType === 'nationalId') {
        backSide = true;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCamera = (imgType) => {
        console.log(imgType);
        setImgType(imgType);
        setOpenCamera(true);
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} maxWidth="md" TransitionComponent={Slide}>
            {openCamera && <WebcamCapture handleImages={handleImages} openCamera={openCamera} setOpenCamera={setOpenCamera} />}
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        {t('save')}
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent dividers>
                <MainCard>
                    {frontSide && (
                        <>
                            <h3>
                                <b> {t('front_Side')}</b>
                            </h3>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                fullWidth
                                height={200}
                                border={2}
                                borderColor="grey.400"
                                borderRadius={8}
                            >
                                {kyc_front ? (
                                    <>
                                        <img src={kyc_front} alt="Hello" />
                                    </>
                                ) : (
                                    <IconButton
                                        onClick={() => handleCamera('kyc_front')}
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{ borderRadius: 100 }}
                                    >
                                        <AddCircleOutlineRoundedIcon fontSize="large" />
                                    </IconButton>
                                )}
                            </Box>
                        </>
                    )}

                    {backSide && (
                        <>
                            <h3>
                                <b> {t('back_Side')}</b>
                            </h3>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                fullWidth
                                height={200}
                                border={2}
                                borderColor="grey.400"
                                borderRadius={8}
                            >
                                <IconButton
                                    required
                                    onClick={() => handleCamera('kyc_back')}
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    style={{ borderRadius: 100 }}
                                >
                                    <AddCircleOutlineRoundedIcon fontSize="large" />
                                </IconButton>
                            </Box>
                        </>
                    )}
                    <h3>
                        <b>{t('serial_No')}</b>
                    </h3>
                    <TextField
                        className="textfield"
                        type="text"
                        id="kyc_serial_number"
                        variant="outlined"
                        value={kyc_serial_number}
                        name="kyc_serial_number"
                        onChange={onInputChange}
                        fullWidth
                        required
                    />
                    <h3>
                        <b>{t('issue_By')}</b>
                    </h3>
                    <TextField
                        className="textfield"
                        type="text"
                        variant="outlined"
                        id="issued_by"
                        value={issued_by}
                        name="issued_by"
                        onChange={onInputChange}
                        fullWidth
                    />
                    <h3>
                        <b>{t('issue_Date')}</b>
                    </h3>
                    <TextField
                        className="textfield"
                        type="date"
                        variant="outlined"
                        id="issued_date"
                        value={issued_date}
                        name="issued_date"
                        onChange={onInputChange}
                        required
                    />
                </MainCard>
            </DialogContent>
        </Dialog>
    );
});

export default ViewKYCDetails;
