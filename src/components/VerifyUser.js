import React, { useState } from 'react';
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyUser = ({ verifyPopUp, setVerifyPopUp, userData }) => {
    const navigate = useNavigate();
    const handleConfirm = () => {
        setVerifyPopUp(false);
        navigate(`/lead/createlead/${encodeURIComponent(userData.ph_number)}`, {
            state: userData 
        });
       
    };
    const handleClose = () => {
        toast.error('This mobile number is already registered with customer');
        setVerifyPopUp(false);
        return navigate('/lead/verify-phonenumber');
    };
    return (
        <>
            <Dialog open={verifyPopUp}>
                <DialogTitle sx={{ fontSize: '1.2rem', textAlign: 'center' }}>
                    Are you {userData.first_name + ' ' + userData.last_name}?
                </DialogTitle>

                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleConfirm} variant="contained" color="success" sx={{ mr: 2 }}>
                        Yes
                    </Button>
                    <Button onClick={handleClose} variant="contained" color="error">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VerifyUser;
