import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const MobileVerification = ({ open, onClose }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationCompleted, setVerificationCompleted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSendOtp = () => {
        setLoading(true);

        // Replace the API_ENDPOINT with the actual API endpoint for sending OTP
        const API_ENDPOINT = 'https://your-api-endpoint.com/send-otp';

        // Make a POST request to the API endpoint with the mobile number
        axios
            .post(API_ENDPOINT, { mobileNumber })
            .then((response) => {
                setLoading(false);
                if (response.data.success) {
                    setVerificationCompleted(true);
                } else {
                    alert('Failed to send OTP. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    };

    const handleVerifyOtp = () => {
        setLoading(true);

        // Replace the API_ENDPOINT with the actual API endpoint for verifying OTP
        const API_ENDPOINT = 'https://your-api-endpoint.com/verify-otp';

        // Make a POST request to the API endpoint with the mobile number and OTP
        axios
            .post(API_ENDPOINT, { mobileNumber, otp })
            .then((response) => {
                setLoading(false);
                if (response.data.success) {
                    alert('OTP verification successful!');
                } else {
                    alert('Invalid OTP. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Mobile Verification</DialogTitle>
            <DialogContent>
                {!verificationCompleted ? (
                    <React.Fragment>
                        <TextField
                            label="Mobile Number"
                            variant="outlined"
                            value={mobileNumber}
                            onChange={handleMobileNumberChange}
                            fullWidth
                            margin="normal"
                        />
                        <DialogActions>
                            <Button onClick={onClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleSendOtp} disabled={loading} variant="contained">
                                {loading ? <CircularProgress size={24} /> : 'Send OTP'}
                            </Button>
                        </DialogActions>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <TextField label="OTP" variant="outlined" value={otp} onChange={handleOtpChange} fullWidth margin="normal" />
                        <DialogActions>
                            <Button onClick={onClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleVerifyOtp} disabled={loading} variant="contained">
                                {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
                            </Button>
                        </DialogActions>
                    </React.Fragment>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MobileVerification;
