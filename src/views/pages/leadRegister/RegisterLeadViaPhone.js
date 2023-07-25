import React, { useState } from 'react';
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import MuiPhoneNumber from 'material-ui-phone-number';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import VerifyUser from '../../../components/VerifyUser';
import { BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);

const RegisterLeadViaPhone = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    let token = null;
    if (user) {
        token = user.token;
    }

    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const [DOB, setDOB] = useState();
    const [verifyForm, setVerifyForm] = useState(true);
    const [showDobPopup, setShowDobPopup] = useState(false);
    const [verifyPopUp, setVerifyPopUp] = useState(false);
    const [userData, setUserData] = useState('');
    const { t } = useTranslation();

    const handleMobileNumberChange = (phoneNumber) => {
        setMobileNumber(phoneNumber);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };
    const handleDOBChange = (event) => {
        setDOB(event.target.value);
    };

    const handleSendOtp = () => {
        if (!mobileNumber) {
            toast.error(t('please_enter_a_mobile_number'));
        } else if (!isValidPhoneNumber(mobileNumber, countryCode)) {
            toast.error(t('please_enter_a_valid_mobile_number'));
        } else {
            try {
                const phoneNumber = parsePhoneNumber(mobileNumber, countryCode);
                const body = {
                    recipient: phoneNumber.number,
                    otp_type: 'M',
                    cc_code: phoneNumber.country,
                    debug: false,
                    is_resend: false
                };
                const headers = {
                    headers: {
                        Authorization: 'Token ' + token
                    }
                };
                console.log(token);
                axios
                    .post(BASE_URL + 'v2/request_otp/', body, headers)
                    .then(function (response) {
                        toast.success(t('oTP_sent_successfully'));
                        console.log(response.data, 'Data');
                        console.log(response.data.status, 'Success');
                    })
                    .catch(function (error) {
                        toast.error(t('error_while_sending_OTP'));
                        console.log(error);
                    });
            } catch (err) {
                toast.error(t('error_while_sending_OTP'));
                console.log(err);
            }
            setTimeout(() => {
                setOtpSent(true);
            });
        }
    };
    const handleResendOTP = () => {
        try {
            const phoneNumber = parsePhoneNumber(mobileNumber, countryCode);
            console.log(phoneNumber, phoneNumber.country);

            const body = {
                recipient: phoneNumber.number,
                otp_type: 'M',
                cc_code: phoneNumber.country,
                debug: false,
                is_resend: true
            };
            console.log(body);
            const headers = {
                headers: {
                    Authorization: 'Token ' + token
                }
            };

            axios
                .post(BASE_URL + 'v2/request_otp/', body, headers)
                .then(function (response) {
                    toast.success(t('oTP_Resend'));
                    console.log(response.data, 'Data');
                    console.log(response.data.status, 'Success');
                })
                .catch(function (error) {
                    toast.error(t('error_while_sending_OTP'));
                    console.log(error);
                });
        } catch (err) {
            toast.error(t('error_while_sending_OTP'));
            console.log(err);
        }
    };

    const handleVerifyOtp = () => {
        if (!otp) {
            toast.error(t('please_enter_OTP'));
        } else {
            const phoneNumber = parsePhoneNumber(mobileNumber, countryCode);
            const body = {
                otp: otp,
                recipient: phoneNumber.number,
                otp_type: 'M'
            };

            const headers = {
                headers: {
                    Authorization: 'Token ' + token
                }
            };

            try {
                axios.post(BASE_URL + 'v2/otp_verify/', body, headers).then(function (response) {
                    if (response.status) {
                        setMobileNumber(response.data.data.recipient);
                        toast.success('OTP Verified successfully');
                        console.log(response.data.data.user_found);
                        if (response.data.data.user_found === false) {
                            return navigate('/lead/createlead');
                        } else {
                            setShowDobPopup(true);
                        }
                    } else {
                        toast.error(t('invalid_OTP'));
                    }
                });
            } catch (err) {
                toast.error(t('error_while_sending_OTP'));
                console.log(err);
            }
            setTimeout(() => {}, 2000);
        }
    };

    const handleDOBSubmit = () => {
        if (!DOB) {
            toast.error(t('please_enter_DOB'));
        } else {
            const headers = {
                headers: {
                    Authorization: 'Token ' + token
                }
            };
            const body = {
                dob: DOB,
                recipient: mobileNumber
            };
            try {
                axios.post(BASE_URL + 'v2/dob_verify/', body, headers).then((response) => {
                    if (response.data.status) {
                        setShowDobPopup(false);
                        toast.success(response.data.message);
                        setUserData(response.data.data);
                        setVerifyPopUp(true);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            {verifyPopUp && <VerifyUser verifyPopUp={verifyPopUp} setVerifyPopUp={setVerifyPopUp} userData={userData} />}

            <Grid open={verifyForm}>
                {verifyForm ? (
                    <MainCard title={t('Enter_Your_Mobile_Number_to_Continue')}>
                        <Grid container spacing={gridSpacing}>
                            {/* OTP Form */}
                            <Grid item xs={12} sm={6}>
                                <SubCard>
                                    <form>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <MuiPhoneNumber
                                                    defaultCountry={'in'}
                                                    label={t('mobile_Number')}
                                                    value={mobileNumber}
                                                    onChange={handleMobileNumberChange}
                                                    fullWidth
                                                    required
                                                    countryCodeEditable
                                                    onCountryChange={(countryData) => setCountryCode(countryData.dialCode)}
                                                />
                                            </Grid>
                                            {/* Popup Dialog */}
                                            <Dialog open={showDobPopup}>
                                                <DialogTitle sx={{ fontSize: '1.2rem' }}>
                                                    {t('please_Enter_your_Date_of_Birth')}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <TextField
                                                        value={DOB}
                                                        type="date"
                                                        fullWidth
                                                        onChange={handleDOBChange}
                                                        // Add any necessary props and event handlers for capturing the date of birth
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleDOBSubmit} color="primary">
                                                        {t('submit')}
                                                    </Button>
                                                    <Button onClick={() => setShowDobPopup(false)} color="primary">
                                                        {t('close')}
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                            {!otpSent ? (
                                                <Grid item>
                                                    <Button type="button" onClick={handleSendOtp}>
                                                        {t('Send_OTP')}
                                                    </Button>
                                                </Grid>
                                            ) : (
                                                <React.Fragment key="otpForm">
                                                    <Grid item>
                                                        <TextField
                                                            error={otp.length === 0}
                                                            label="OTP"
                                                            value={otp}
                                                            onChange={handleOtpChange}
                                                            fullWidth
                                                            required
                                                            variant="standard"
                                                            inputProps={{ maxLength: 6 }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Button onClick={handleVerifyOtp}>{t('Verify_OTP')}</Button>
                                                        <Button onClick={handleResendOTP}>{t('Resend_OTP')}</Button>
                                                    </Grid>
                                                </React.Fragment>
                                            )}
                                        </Grid>
                                    </form>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </MainCard>
                ) : (
                    ''
                )}
            </Grid>
        </>
    );
};

export default RegisterLeadViaPhone;
