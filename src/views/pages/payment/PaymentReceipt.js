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
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { b64toBlob } from '../../../helper';
import WebcamCapture from '../../../components/webcamComp/WebcamCapture';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOrderAPI from '../../../apicalls/DeleteOrderAPI';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../../hooks/useAuthContext';

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
        marginTop: theme.spacing(2),
        alignItems: 'center',
        display: 'flex',
        fontSize: '1.2rem'
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
    const classes = useStyles();
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [paymentReceipt, setPaymentReceipt] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(currentDate());
    const { user } = useAuthContext();
    const orderId = saleData.order_id;
    const leadId = saleData.prospect_id.id;
    let token = null;
    if (user) {
        token = user.token;
    }

    console.log(saleData);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleButtonClick = () => {
        setOpenCamera(true);
        // fileInputRef.current.click();
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
                    .catch((error) => {});
            } catch (error) {}
        }
    };
    return (
        <>
            {openCamera && <WebcamCapture openCamera={openCamera} setOpenCamera={setOpenCamera} handleImages={handleImages} />}

            <Card className={classes.card}>
                <CardHeader className={classes.heading} title={t('Payment')} />

                <CardContent className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel className={classes.labels} htmlFor="monthly-income">
                                    {t('amount')} *
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    id="monthly-income"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label={t('amount')}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    label={t('Receipt')}
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    name="customer_locality"
                                    required
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box alignItems="center" mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography mt={2} className={classes.proofLabel}>
                                    {t('payment_receipt')}*
                                </Typography>
                            </Grid>
                        </Grid>

                        <Button
                            variant="contained"
                            color="secondary"
                            component="span"
                            className={classes.button}
                            onClick={handleButtonClick}
                        >
                            <b style={{ color: 'white' }}> {t('upload')}</b>
                        </Button>
                        {selectedFile ? (
                            <Typography variant="body2" className={classes.fileName}>
                                {selectedFile.name}
                            </Typography>
                        ) : (
                            <Button
                                className={classes.verifybutton}
                                size="large"
                                color="primary"
                                startIcon={
                                    <CheckCircleOutlineTwoToneIcon
                                        style={{ fontSize: 35 }}
                                        htmlColor={paymentReceipt ? 'green' : 'inherit'}
                                    />
                                }
                                title={paymentReceipt ? 'Verified' : 'Verify'}
                            />
                        )}

                        <Grid mt={3} item xs={12} sm={8}>
                            <Typography mt={2} gutterBottom className={classes.proofLabel}>
                                {t('remarks')}
                            </Typography>

                            <FormControl fullWidth>
                                <TextField
                                    // error={formError.customer_address}
                                    // inputRef={customer_addressInputRef}
                                    // disabled={state ? (state.customer_address ? true : false) : false}
                                    // required
                                    // className="label"
                                    // value={customer_address}
                                    // name="customer_address"
                                    // onChange={onInputChange}
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
