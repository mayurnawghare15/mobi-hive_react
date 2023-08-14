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
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    content: {},
    formControl: {
        marginBottom: theme.spacing(1),
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
    proofLabel: {
        fontSize: '14px',
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
    const [paymentReceipt, setPaymentReceipt] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(currentDate());
    const [capturedImage, setCapturedImage] = useState(null);
    const [paymentForm, setPaymentForm] = useState({
        amount: '',
        receipt: paymentReceipt,
        remarks: '',
        dateOfBirth: dateOfBirth
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
        setPaymentReceipt(finalImage);
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
                <CardHeader className={classes.heading} title={t('Payment')} />

                <CardContent className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel className={classes.labels} htmlFor="amount">
                                    {t('amount')} *
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    id="monthly-income"
                                    name="amount"
                                    value={paymentForm.amount}
                                    disabled
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label={t('amount')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className={classes.formControl}>
                                <Typography mt={-2.5} variant="h5" color="black">
                                    Receipt
                                </Typography>
                                <TextField label={t('Receipt')} type="text" variant="outlined" fullWidth name="receipt" required />
                                <Typography mt={2} variant="body1">
                                    Reference/ Transaction ID
                                </Typography>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box alignItems="center">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Typography className={classes.proofLabel}>{t('payment_receipt')}*</Typography>
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
                                    {capturedImage && (
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
                                    ) : (
                                    {openCamera ? (
                                        <>
                                            <Webcam
                                                className="webcam"
                                                ref={webcamRef}
                                                height={350}
                                                width={'100%'}
                                                src={capturedImage}
                                                screenshotFormat="image/jpeg" // You can customize the format if 
                                            />

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
                                    name={'date_of_birth'}
                                    color="secondary"
                                    value={dateOfBirth}
                                    onChange={(event) => setDateOfBirth(event.target.value)}
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
