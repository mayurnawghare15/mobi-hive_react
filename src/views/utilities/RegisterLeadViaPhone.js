import React, { useState } from 'react';
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import MuiPhoneNumber from 'material-ui-phone-number';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import VerifyUser from '../popups/VerifyUser';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LeadCreateForm from './leadFormEss/LeadCreateForm';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);

const RegisterLeadViaPhone = () => {
    const data = JSON.parse(localStorage.getItem('berry-account'));
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const [DOB, setDOB] = useState();
    const [verifyForm, setVerifyForm] = useState(false);
    const [showDobPopup, setShowDobPopup] = useState(false);
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
                        Authorization: 'Token ' + data.token.replace(/"/g, '')
                    }
                };
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
            }, 1000);
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
                    Authorization: 'Token ' + data.token.replace(/"/g, '')
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
                    Authorization: 'Token ' + data.token.replace(/"/g, '')
                }
            };

            try {
                axios.post(BASE_URL + 'v2/otp_verify/', body, headers).then(function (response) {
                    if (response.status) {
                        setShowDobPopup(true);
                        setMobileNumber(response.data.data.recipient);
                        toast.success(t('oTP_Verified_successfully'));
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
                    Authorization: 'Token ' + data.token.replace(/"/g, '')
                }
            };

            const body = {
                dob: DOB,
                recipient: mobileNumber
            };
            console.log(body);
            try {
                axios.post(BASE_URL + 'v2/dob_verify/', body, headers).then((response) => {
                    if (response.data.status) {
                        setShowDobPopup(false);
                        setVerifyForm(true);
                        toast.success(response.data.message);
                        return <Redirect to="/lead/verify-phonenumber" />;
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            {/* <VerifyUser showPopup={showDobPopup} setShowPopup={setShowDobPopup} /> */}

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
                    <LeadCreateForm />
                )}
            </Grid>
        </>
    );
};

export default RegisterLeadViaPhone;
