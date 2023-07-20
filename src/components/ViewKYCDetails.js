import React, { useState } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import { AppBar, Box, Button, Dialog, DialogContent, Grid, IconButton, Slide, TextField, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import WebcamCapture from './webcamComp/WebcamCapture';
import { useTranslation } from 'react-i18next';

const ViewKYCDetails = React.memo(({ open, setOpen, frontSide, backSide, documentType = 'nationalId' }) => {
    const { t } = useTranslation();
    const [serialNumber, setSerialNumber] = useState('');
    const [issueBy, setIssueBy] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [openCamera, setOpenCamera] = useState(false);
    const [addressProof, setAddressProof] = useState({ utility: null, affidavit: null, bankStatement: null });
    const [proofOfIncome, setProofOfIncome] = useState({ salarySlip: null, employerCertificate: null, bankStatement: null });

    if (documentType === 'nationalId') {
        backSide = true;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCamera = () => {
        setOpenCamera(true);
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} maxWidth="md" TransitionComponent={Slide}>
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
                                <IconButton
                                    onClick={handleCamera}
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
                                    onClick={handleCamera}
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
                        variant="outlined"
                        value={serialNumber}
                        name="employed_since"
                        onChange={(event) => setSerialNumber(event.target.value)}
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
                        value={issueBy}
                        name="employed_since"
                        onChange={(event) => setIssueBy(event.target.value)}
                        fullWidth
                        required
                    />
                    <h3>
                        <b>{t('issue_Date')}</b>
                    </h3>
                    <TextField
                        className="textfield"
                        type="date"
                        variant="outlined"
                        value={issueDate}
                        name="employed_since"
                        onChange={(event) => setIssueDate(event.target.value)}
                        required
                    />
                </MainCard>
            </DialogContent>
            {openCamera && <WebcamCapture openCamera={openCamera} setOpenCamera={setOpenCamera} />}
        </Dialog>
    );
});

export default ViewKYCDetails;
