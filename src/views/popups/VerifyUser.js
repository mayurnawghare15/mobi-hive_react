import React, { useState } from 'react';
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const VerifyUser = ({ recipent, verifyPopUp, setVerifyPopUp }) => {
    return (
        <>
            <Dialog open={verifyPopUp}>
                <DialogTitle sx={{ fontSize: '1.2rem' }}>Are you {recipent} </DialogTitle>

                <DialogActions>
                    <Button onClick={''} color="primary">
                        Yes
                    </Button>
                    <Button onClick={() => setVerifyPopUp(false)} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VerifyUser;
