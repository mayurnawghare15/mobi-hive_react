import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import SubCard from './../../ui-component/cards/SubCard';
import MainCard from './../../ui-component/cards/MainCard';
import { gridSpacing } from './../../store/constant';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import MuiPhoneNumber from 'material-ui-phone-number';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

const OTPForm = () => {
    const data = JSON.parse(localStorage.getItem('berry-account'));
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verificationCompleted, setVerificationCompleted] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const { t } = useTranslation();

    const handleMobileNumberChange = (phoneNumber) => {
        setMobileNumber(phoneNumber);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSendOtp = () => {
        if (!mobileNumber) {
            toast.error('Please enter a mobile number');
        } else if (!isValidPhoneNumber(mobileNumber, countryCode)) {
            toast.error('Please enter a valid mobile number');
        } else {
            try {
                console.log('Mob no ' + mobileNumber + 'Country code ' + countryCode);
                const phoneNumber = parsePhoneNumber(mobileNumber, countryCode);

                const body = {
                    recipient: phoneNumber.number,
                    otp_type: 'M',
                    cc_code: phoneNumber.countryCallingCode,
                    debug: false,
                    is_resend: false
                };
                const headers = {
                    headers: {
                        Authorization: 'Token ' + data.token.replace(/"/g, '')
                    }
                };

                axios
                    .post('http://sandbox.credithive.co.uk:8090/webservices/v2/request_otp/', body, headers)
                    .then(function (response) {
                        toast.success('OTP sent successfully');
                        console.log(response.data, 'Data');
                        console.log(response.data.status, 'Success');
                    })
                    .catch(function (error) {
                        toast.error('Error while sending OTP');
                        console.log(error);
                    });
            } catch (err) {
                toast.error('Error while sending OTP');
                console.log(err);
            }
            setTimeout(() => {
                setOtpSent(true);
            }, 1000);
        }
    };

    const handleVerifyOtp = () => {
        setTimeout(() => {
            setVerificationCompleted(true);
        }, 2000);
    };

    return (
        <MainCard title={t('Enter mobile number to continue')}>
            <Grid container spacing={gridSpacing}>
                {/* OTP Form */}
                <Grid item xs={12} sm={6}>
                    <SubCard>
                        {!verificationCompleted ? (
                            <form onSubmit={handleVerifyOtp}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <MuiPhoneNumber
                                            defaultCountry={'in'}
                                            label="Mobile Number"
                                            value={mobileNumber}
                                            onChange={handleMobileNumberChange}
                                            fullWidth
                                            required
                                            countryCodeEditable
                                            onCountryChange={(countryData) => setCountryCode(countryData.dialCode)}
                                        />
                                    </Grid>
                                    {!otpSent ? (
                                        <Grid item>
                                            <Button type="button" onClick={handleSendOtp}>
                                                Send OTP
                                            </Button>
                                        </Grid>
                                    ) : (
                                        <React.Fragment key="otpForm">
                                            <Grid item>
                                                <TextField
                                                    label="OTP"
                                                    value={otp}
                                                    onChange={handleOtpChange}
                                                    fullWidth
                                                    required
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Button type="submit">Verify OTP</Button>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                </Grid>
                            </form>
                        ) : (
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="body1">Mobile number: {mobileNumber}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">OTP verification successful!</Typography>
                                </Grid>
                            </Grid>
                        )}
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default OTPForm;
