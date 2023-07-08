import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import MuiTypography from '@material-ui/core/Typography';

import SubCard from './../../ui-component/cards/SubCard';
import MainCard from './../../ui-component/cards/MainCard';
import { gridSpacing } from './../../store/constant';

const Typography = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verificationCompleted, setVerificationCompleted] = useState(false);

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSendOtp = () => {
        // Simulate sending OTP
        setTimeout(() => {
            setOtpSent(true);
        }, 2000);
    };

    const handleVerifyOtp = () => {
        // Simulate OTP verification
        setTimeout(() => {
            setVerificationCompleted(true);
        }, 2000);
    };

    return (
        <MainCard title="Verify Mobile Number">
            <Grid container spacing={gridSpacing}>
                {/* OTP Form */}
                <Grid item xs={12} sm={6}>
                    <SubCard title="Enter Your Mobile Number to Continue">
                        {!verificationCompleted ? (
                            <form onSubmit={handleVerifyOtp}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <TextField
                                            label="Mobile Number"
                                            variant="outlined"
                                            value={mobileNumber}
                                            onChange={handleMobileNumberChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    {!otpSent ? (
                                        <Grid item>
                                            <Button type="button" onClick={handleSendOtp}>
                                                Send OTP
                                            </Button>
                                        </Grid>
                                    ) : (
                                        <React.Fragment>
                                            <Grid item>
                                                <TextField
                                                    label="OTP"
                                                    variant="outlined"
                                                    value={otp}
                                                    onChange={handleOtpChange}
                                                    fullWidth
                                                    required
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
                                    <MuiTypography variant="body1">Mobile number: {mobileNumber}</MuiTypography>
                                </Grid>
                                <Grid item>
                                    <MuiTypography variant="body1">OTP verification successful!</MuiTypography>
                                </Grid>
                            </Grid>
                        )}
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Typography;
