import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { b64toBlob } from '../../../helper';
import WebcamCapture from '../../../components/webcamComp/WebcamCapture';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOrderAPI from '../../../apicalls/DeleteOrderAPI';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLocation } from 'react-router';
import SubCard from '../../../ui-component/cards/SubCard';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Webcam from 'react-webcam';
import { useCallback } from 'react';


const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        marginTop: theme.spacing(1),
        height: 'auto',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: theme.spacing(1)
    },
    heading: {
        marginTop: theme.spacing(1),
        alignItems: 'center',
        display: 'flex',
        fontWeight: 'bold'
    },
    formControl: {
        marginBottom: theme.spacing(1),
        color: 'black',
        width: '100%'
    },
    labels: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'black'
    },
    input: {
        display: 'none'
    },
    button: {
        marginTop: theme.spacing(2),
        width: '50%'
    },
    fileName: {
        marginLeft: theme.spacing(2),
        color: theme.palette.text.secondary
    },
    title: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
        marginRight: theme.spacing(2)
    },
    subHeading: {
        fontSize: '16px',
        color: 'black',
        fontWeight: 'bold'
    },
    verifybutton: {
        marginLeft: theme.spacing(10),
        marginTop: theme.spacing(2)
    }
}));

const PaymentReceipt = ({ saleData }) => {
    const location = useLocation();
    const { state } = location;
    const classes = useStyles();
    const { t } = useTranslation();
    const webcamRef = useRef(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [paymentReceipt, setPaymentReceiptImg] = useState('');
    const [receivedOn, setReceivedOn] = useState(currentDate());
    const [capturedImage, setCapturedImage] = useState(null);
    const [paymentForm, setPaymentForm] = useState({
        amount: '130',
        receiptId: '',
        receipt: paymentReceipt,
        remarks: '',
        receivedOn: receivedOn
    });
    const { user } = useAuthContext();
    const orderId = null;
    const leadId = state.leadid;
    let token = null;
    if (user) {
        token = user.token;
    }
    const onInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value, 'name , Value');
        setPaymentForm({
            ...paymentForm,
            [name]: value
        });
    };

    const handleImages = (value) => {
        const img = value ? value.split(',') : '';
        const content_type = img[0].split(':')[1];
        let finalImage = value ? b64toBlob(img[1], content_type) : '';
        setPaymentReceiptImg(finalImage);
    };
    function currentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const buttonStyle = {
        backgroundColor: '#ffeb3b',
        color: 'black'
    };
    const handleDelete = () => {
        const input = window.confirm('Are you sure , You want to delete the order');
        if (input) {
            try {
                DeleteOrderAPI(token, orderId, leadId)
                    .then((res) => {
                        toast.success('Order Deleted Successfully');
                    })
                    .catch((error) => { });
            } catch (error) { }
        }
    };


    const handleCamera = () => {
        setOpenCamera(true);
    };
    const retake = () => {
        setCapturedImage(null);
    };
    const handleConfirm = () => {
        toast.success('Image Captured');
        // setOpenCamera(false);
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setCapturedImage(imageSrc);
        setOpenCamera(false);

    };
    return (
        <>


            <Card className={classes.card}>
                <CardHeader title={t('Payment')} />

                <CardContent className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel className={classes.labels} htmlFor="amount">
                                    {t('amount')} *
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={paymentForm.amount}
                                    disabled
                                    onChange={onInputChange}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label={t('amount')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth className={classes.formControl}>
                                <Typography mt={2} variant="h5" color="black" gutterBottom>
                                    Receipt
                                </Typography>
                                <TextField type="text" variant="outlined" fullWidth name="receiptId" onChange={onInputChange} value={paymentForm.receiptId} required />
                                <Typography mt={2} variant="body1">
                                    Reference/ Transaction ID
                                </Typography>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box alignItems="center">
                        <Grid mt={2} container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Typography className={classes.subHeading}>{t('payment_receipt')}*</Typography>
                            </Grid>
                        </Grid>
                        <SubCard>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                fullWidth
                                height={200}
                                border={2}
                                borderColor="grey.400"
                                borderRadius={8}
                                position="relative"
                                overflow="hidden"
                            >
                                <div style={{ position: 'relative', width: '100%', height: 350 }}>
                                    {openCamera ? (
                                        <>
                                            <Webcam
                                                className="webcam"
                                                ref={webcamRef}
                                                height={350}
                                                width={'100%'}
                                                screenshotFormat="image/jpeg"
                                            />
                                            <IconButton
                                                onClick={handleConfirm}
                                                color="primary"
                                                style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}
                                            >
                                                Capture
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton
                                            onClick={handleCamera}
                                            variant="contained"
                                            color="primary"
                                            disableElevation
                                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                        >
                                            <AddCircleOutlineRoundedIcon fontSize="large" />
                                        </IconButton>
                                    )}
                                    {capturedImage && (
                                        <div style={{ position: 'relative', width: '100%', height: 350 }}>
                                            <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </div>
                                    )}
                                </div>
                            </Box>
                            {openCamera &&
                                <>
                                    <Grid container mt={0.5} xs={12} spacing={2}>
                                        <>
                                            <Grid item xs={12} sm={6} >
                                                <Button onClick={retake} disableElevation fullWidth variant="contained" color="secondary">
                                                    {t('retake_Photo')}
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={6} >
                                                <Button disableElevation fullWidth variant="contained" color="success" onClick={handleConfirm}>
                                                    {t('confirm')}
                                                </Button>
                                            </Grid>

                                        </>
                                    </Grid>
                                </>
                            }
                        </SubCard>

                        <Grid mt={3} item xs={12} sm={12}>
                            <Typography mt={2} gutterBottom className={classes.proofLabel}>
                                {t('remarks')}
                            </Typography>

                            <FormControl fullWidth>
                                <TextField
                                    className="label"
                                    value={paymentForm.remarks}
                                    name="remarks"
                                    onChange={onInputChange}
                                    minRows={5}
                                />
                            </FormControl>
                        </Grid>
                        <Grid mt={3} item xs={12} sm={8}>
                            <Typography mt={2} gutterBottom className={classes.proofLabel}>
                                {t('received_on')}*
                            </Typography>

                            <FormControl fullWidth>
                                <TextField
                                    // error={formError.date_of_birth}
                                    // inputRef={date_of_birthInputRef}
                                    // disabled={state ? (state.date_of_birth ? true : false) : false}
                                    className="textfield"
                                    type="date"
                                    variant="outlined"
                                    name='receivedOn'
                                    color="secondary"
                                    value={receivedOn}
                                    onChange={(event) => setReceivedOn(event.target.value)}
                                // required
                                />
                            </FormControl>
                        </Grid>
                        <Grid container spacing={2} mt={3}>
                            <Grid item xs={12} sm={6} md={3}>
                                <AnimateButton>
                                    <Button disableElevation fullWidth size="small" type="submit" variant="contained" color="success">
                                        {t('add_Payment')}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <AnimateButton>
                                    <Button disableElevation fullWidth size="small" type="submit" variant="contained" style={buttonStyle}>
                                        {t('request_extension')}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                        onClick={handleDelete}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default PaymentReceipt;
