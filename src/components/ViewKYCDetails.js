import React, { useState } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import { AppBar, Box, Button, Dialog, DialogContent, Grid, IconButton, Slide, TextField, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import WebcamCapture from './webcamComp/WebcamCapture';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import UploadDocs from '../apicalls/UploadDocs';

const ViewKYCDetails = React.memo(({ open, setOpen, frontSide, backSide, documentType = 'nationalId' }) => {
    const { t } = useTranslation();

    const [openCamera, setOpenCamera] = useState(false);
    var [imgType, setImgType] = useState('');
    const [addressProof, setAddressProof] = useState({ utility: null, affidavit: null, bankStatement: null });
    const [proofOfIncome, setProofOfIncome] = useState({ salarySlip: null, employerCertificate: null, bankStatement: null });
    const [loading, setIsLoading] = useState('');
    const [uploadDocs, setUploadDocs] = useState('');

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

    const handleImages = (value) => {
        console.log('Inside handle image -------------->' + imgType);
        if (imgType === 'kyc_front') {
            setKycFormUpload({
                ...kycFormUpload,
                kyc_front: value
            });
        } else if (imgType === 'kyc_back') {
            setKycFormUpload({
                ...kycFormUpload,
                kyc_back: value
            });
        } else {
            toast.error('Error While Uploading photo');
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
    const handleSubmit = () => {
        const data = {
            kyc_front: kyc_front,
            kyc_back: kyc_back,
            kyc_serial_number: kyc_serial_number,
            issued_by: issued_by,
            issued_date: issued_date,
            kyc_valid_till: kyc_valid_till
        };
        console.log(data);
        var form_data = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }

        setIsLoading(true);
        UploadDocs(form_data, token, leadId)
            .then((res) => {
                if (res) {
                    setUploadDocs(res.results);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setUploadDocs([]);
                }
            })
            .catch((error) => {
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} maxWidth="md" TransitionComponent={Slide}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit}>
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
                            {openCamera && (
                                <WebcamCapture handleImages={handleImages} openCamera={openCamera} setOpenCamera={setOpenCamera} />
                            )}
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
                                        <img
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            fullWidth
                                            height={200}
                                            border={2}
                                            borderColor="grey.400"
                                            borderRadius={8}
                                            src={kyc_front}
                                            alt="KYC Front"
                                        />
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
                                {kyc_back ? (
                                    <>
                                        <img
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            fullWidth
                                            height={200}
                                            border={2}
                                            borderColor="grey.400"
                                            borderRadius={8}
                                            src={kyc_front}
                                            alt="KYC Front"
                                        />
                                    </>
                                ) : (
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
                                )}
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
