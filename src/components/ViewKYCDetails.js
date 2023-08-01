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
import img_tem from "../assets/images/samsungA03.png"
import { useLocation } from 'react-router';
import { b64toBlob } from '../helper';


const ViewKYCDetails = ({ lead_id, open, setOpen, showFrontSide, showBackSide, slug,
    showValidTill, showSerialNumber, dataDocuments, updateDataFunc }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { state } = location;
    const [openCamera, setOpenCamera] = useState(false);
    const [imgType, setImgType] = useState('kyc_front');
    const [isLoading, setIsLoading] = useState(false);
    const leadID = lead_id;

    const { user } = useAuthContext();

    let token = null;
    if (user) {
        token = user.token;
    }

    const { kyc_serial_number, kyc_valid_till, issued_date, issued_by, kyc_front, kyc_back } = dataDocuments;

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        updateDataFunc({
            ...dataDocuments,
            [name]: value
        });
    };

    const handleImages = (value) => {
        if (imgType === 'kyc_front') {
            updateDataFunc({
                ...dataDocuments,
                kyc_front: value
            });
        } else {
            updateDataFunc({
                ...dataDocuments,
                kyc_back: value
            });
        }
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleCamera = (imgType) => {
        setImgType(imgType);
        setOpenCamera(true);
    };

    const handleSubmit = () => {
        var kyc_front_temp = kyc_front.split(",");
        var kyc_back_temp = kyc_back.split(",");
        const content_type_front =kyc_front_temp[0].split(":")[1]
        const content_type_back =kyc_back_temp[0].split(":")[1]
    
        let blob_kyc_front = b64toBlob(kyc_front_temp[1],content_type_front)
        let blob_kyc_back = b64toBlob(kyc_back_temp[1],content_type_back)

        const data = {
            kyc_front: blob_kyc_front,
            kyc_back: blob_kyc_back,
            kyc_type: slug,
            kyc_serial_number: kyc_serial_number,
            issued_by: issued_by,
            issued_date: issued_date,
            kyc_valid_till: kyc_valid_till
        };
        var form_data = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }

        UploadDocs(form_data, token, leadID)
            .then((res) => {
                if (res) {
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
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
                    {showFrontSide && (
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

                    {showBackSide && (
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
                                            src={kyc_back}
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
                    {showSerialNumber &&
                        <>
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
                        </>
                    }

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
                    {showValidTill &&
                        <>
                            <h3>
                                <b>Valid Till</b>
                            </h3>
                            <TextField
                                className="textfield"
                                type="date"
                                variant="outlined"
                                id="issued_date"
                                value={kyc_valid_till}
                                name="kyc_valid_till"
                                onChange={onInputChange}
                                required
                            />
                        </>
                    }
                </MainCard>
            </DialogContent>
        </Dialog>
    );
};

export default ViewKYCDetails;
