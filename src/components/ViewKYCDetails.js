import React, { useState, useRef, useEffect } from 'react';
import MainCard from '../ui-component/cards/MainCard';
import { AppBar, Box, Button, Dialog, DialogContent, Grid, IconButton, Slide, TextField, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import WebcamCapture from './webcamComp/WebcamCapture';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import UploadDocs from '../apicalls/UploadDocs';
import { useLocation } from 'react-router';
import { b64toBlob } from '../helper';
const REACT_APP_IMAGE_URL = process.env.REACT_APP_IMAGE_URL;


const ViewKYCDetails = ({ docsItemData, lead_id, open, setOpen, setDataFunc, dataDocuments }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const { state } = location;
    const [openCamera, setOpenCamera] = useState(false);
    const [imgType, setImgType] = useState('kyc_front');
    const [isLoading, setIsLoading] = useState(false);
    const kyc_serial_numberInputRef = useRef(null);
    const kyc_valid_tillInputRef = useRef(null);
    const issued_dateInputRef = useRef(null);
    const issued_byInputRef = useRef(null);

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
        setDataFunc({
            ...dataDocuments,
            [name]: value
        });
    };

    const handleImages = (value) => {
        if (imgType === 'kyc_front') {
            setDataFunc({
                ...dataDocuments,
                kyc_front: value
            });
        } else {
            setDataFunc({
                ...dataDocuments,
                kyc_back: value
            });
        }
    };


    const handleClose = () => {
        setDataFunc({ issued_date: "", issued_by: "", kyc_front: "", kyc_back: "", kyc_serial_number: "", kyc_valid_till: "" })
        setOpen(false);
    };

    const handleCamera = (imgType) => {
        setImgType(imgType);
        setOpenCamera(true);
    };


    const handleSubmit = () => {
        if (docsItemData.req_front) {
            if (!kyc_front) {
                return toast.error("Image requried")
            }
        }

        if (docsItemData.req_back) {
            if (!kyc_back) {
                return toast.error("Image requried")
            }
        }

        if (docsItemData.req_serial_number) {
            if (!kyc_serial_number) {
                return toast.error("Serial number requried")
            }

        }

        if (docsItemData.req_valid_till) {
            if (!kyc_valid_till) {
                return toast.error("Valid till date requried")
            }
        }

        const kyc_front_temp = kyc_front ? kyc_front.split(",") : "";
        const kyc_back_temp = kyc_back ? kyc_back.split(",") : "";
        const content_type_front = kyc_front_temp[0].split(":")[1]
        const content_type_back = kyc_back_temp ? kyc_back_temp[0].split(":")[1] : ""

        let blob_kyc_front = kyc_front ? b64toBlob(kyc_front_temp[1], content_type_front) : ""
        let blob_kyc_back = kyc_back ? b64toBlob(kyc_back_temp[1], content_type_back) : ""

        const data = {
            kyc_front: blob_kyc_front,
            kyc_back: blob_kyc_back,
            kyc_type: docsItemData.document_slug,
            kyc_serial_number: kyc_serial_number,
            issued_by: issued_by,
            issued_date: issued_date,
            kyc_valid_till: kyc_valid_till
        };

        let form_data = new FormData();
        if (kyc_front)
            form_data.append("kyc_front", data.kyc_front, "kyc_front.png");
        if (kyc_back)
            form_data.append("kyc_back", data.kyc_back, "kyc_back.png");

        form_data.append("kyc_type", docsItemData.document_slug);
        form_data.append("kyc_serial_number", data.kyc_serial_number);
        form_data.append("issued_by", data.issued_by);
        form_data.append("issued_date", data.issued_date);
        form_data.append("kyc_valid_till", data.kyc_valid_till);


        UploadDocs(form_data, token, leadID)
            .then((res) => {
                if (res) {
                    setIsLoading(false);

                    handleClose()

                    return toast.success("Document uploaded successfully");
                } else {
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                return toast.error('Something went wrong , Please check your internet connection.');
            });
    };

    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose} maxWidth="md" TransitionComponent={Slide}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
                        {docsItemData.kyc_front ? '' :
                            <Button autoFocus color="inherit" onClick={handleSubmit}>
                                {t('save')}
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
                <DialogContent dividers>
                    <MainCard>
                        {docsItemData.req_front && (
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
                                    {docsItemData.kyc_front || kyc_front ? (
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
                                                src={docsItemData.kyc_front ? REACT_APP_IMAGE_URL + docsItemData.kyc_front : kyc_front}
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

                        {docsItemData.req_back && (
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
                                    {docsItemData.kyc_back || kyc_back ? (
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
                                                src={docsItemData.kyc_back ? REACT_APP_IMAGE_URL + docsItemData.kyc_back : kyc_back}
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
                        {docsItemData.req_serial_number &&
                            <>
                                <h3>
                                    <b>{t('serial_No')}</b>
                                </h3>
                                <TextField
                                    className="textfield"
                                    type="text"
                                    id="kyc_serial_number"
                                    variant="outlined"
                                    value={docsItemData.kyc_serial_number ? docsItemData.kyc_serial_number : kyc_serial_number}
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
                            value={docsItemData.issued_by ? docsItemData.issued_by : issued_by}
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
                            value={docsItemData.issued_date ? docsItemData.issued_date : issued_date}
                            name="issued_date"
                            onChange={onInputChange}
                            required
                        />
                        {docsItemData.req_valid_till &&
                            <>
                                <h3>
                                    <b>Valid Till</b>
                                </h3>
                                <TextField
                                    className="textfield"
                                    type="date"
                                    variant="outlined"
                                    id="issued_date"
                                    value={docsItemData.kyc_valid_till ? docsItemData.kyc_valid_till : kyc_valid_till}
                                    name="kyc_valid_till"
                                    onChange={onInputChange}
                                    required
                                />
                            </>
                        }
                    </MainCard>
                </DialogContent>
            </Dialog>


        </>



    );
};

export default ViewKYCDetails;
